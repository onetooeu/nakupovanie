#requires -version 5.1
[CmdletBinding()]
param(
    [string]$ScratchRoot = 'C:\NAKUPOVANIE\Temp'
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

function Assert-GuardCondition {
    param(
        [Parameter(Mandatory=$true)][bool]$Condition,
        [Parameter(Mandatory=$true)][string]$Message
    )

    if (-not $Condition) {
        throw $Message
    }
}

function Get-GuardIndexState {
    param(
        [Parameter(Mandatory=$true)][string]$Repository
    )

    $indexOutput = @(& git -C $Repository rev-parse --path-format=absolute --git-path index)
    if ($LASTEXITCODE -ne 0) { throw 'Fixture index lookup failed.' }

    $indexPath = (($indexOutput | ForEach-Object { $_.ToString() }) -join "`n").Trim()
    if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
        throw "Fixture index is missing: $indexPath"
    }

    $stagedOutput = @(& git -C $Repository diff --cached --name-status)
    if ($LASTEXITCODE -ne 0) { throw 'Fixture staged-state lookup failed.' }

    return [pscustomobject]@{
        hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $indexPath).Hash
        staged = (($stagedOutput | ForEach-Object { $_.ToString() }) -join "`n").Trim()
    }
}

function Assert-GuardIndexUnchanged {
    param(
        [Parameter(Mandatory=$true)]$Before,
        [Parameter(Mandatory=$true)]$After,
        [Parameter(Mandatory=$true)][string]$Context
    )

    Assert-GuardCondition `
        ([string]$Before.hash -eq [string]$After.hash) `
        "$Context changed the real Git index file."
    Assert-GuardCondition `
        ([string]$Before.staged -eq [string]$After.staged) `
        "$Context changed the real staged state."
}

$resolvedScratch = [System.IO.Path]::GetFullPath($ScratchRoot)
if (-not (Test-Path -LiteralPath $resolvedScratch -PathType Container)) {
    throw "Scratch root is missing: $resolvedScratch"
}

$fixture = Join-Path $resolvedScratch ("promotion-guard-test-{0}" -f [guid]::NewGuid().ToString('N'))
$fixturePath = [System.IO.Path]::GetFullPath($fixture)
$scratchPrefix = $resolvedScratch.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar

if (-not $fixturePath.StartsWith($scratchPrefix,[System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to create fixture outside the scratch root: $fixturePath"
}

$modulePath = Join-Path $PSScriptRoot 'RepositoryPromotionGuard.psm1'

try {
    New-Item -ItemType Directory -Path $fixturePath | Out-Null
    & git -C $fixturePath init --initial-branch=main --quiet
    if ($LASTEXITCODE -ne 0) { throw 'Fixture git init failed.' }

    & git -C $fixturePath config user.name 'Nakupovanie Guard Test'
    & git -C $fixturePath config user.email 'guard-test@invalid.example'

    [System.IO.File]::WriteAllText(
        (Join-Path $fixturePath 'reviewed.txt'),
        "baseline`n",
        (New-Object System.Text.UTF8Encoding($false))
    )
    & git -C $fixturePath add reviewed.txt
    & git -C $fixturePath commit --quiet -m 'test: establish baseline'
    if ($LASTEXITCODE -ne 0) { throw 'Fixture baseline commit failed.' }

    Import-Module $modulePath -Force

    $cleanIndexBefore = Get-GuardIndexState -Repository $fixturePath
    $clean = Get-RepositoryPromotionSnapshot -Repository $fixturePath -ScratchDirectory $resolvedScratch
    $cleanIndexAfter = Get-GuardIndexState -Repository $fixturePath
    Assert-GuardIndexUnchanged `
        -Before $cleanIndexBefore `
        -After $cleanIndexAfter `
        -Context 'Clean snapshot generation'
    Assert-GuardCondition (-not $clean.has_changes) 'A clean repository was incorrectly classified as changed.'

    $untrackedPath = Join-Path $fixturePath 'untracked-only.txt'
    [System.IO.File]::WriteAllText(
        $untrackedPath,
        "untracked review candidate`n",
        (New-Object System.Text.UTF8Encoding($false))
    )
    $untrackedIndexBefore = Get-GuardIndexState -Repository $fixturePath
    $untracked = Get-RepositoryPromotionSnapshot -Repository $fixturePath -ScratchDirectory $resolvedScratch
    $untrackedIndexAfter = Get-GuardIndexState -Repository $fixturePath
    Assert-GuardIndexUnchanged `
        -Before $untrackedIndexBefore `
        -After $untrackedIndexAfter `
        -Context 'Untracked-only snapshot generation'
    Assert-GuardCondition $untracked.has_changes 'An untracked-only change was not captured.'
    Assert-GuardCondition `
        ([string]$untracked.status -match '(?m)^\?\? untracked-only\.txt$') `
        'The untracked-only change was absent from snapshot status.'

    $untrackedTreeFiles = @(& git -C $fixturePath ls-tree -r --name-only $untracked.target_tree)
    if ($LASTEXITCODE -ne 0) { throw 'Fixture untracked target-tree lookup failed.' }
    Assert-GuardCondition `
        (@($untrackedTreeFiles -eq 'untracked-only.txt').Count -eq 1) `
        'The untracked-only file was absent from the promotable target tree.'

    $untrackedUnchanged = Test-RepositoryPromotionSnapshot `
        -Expected $untracked `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition $untrackedUnchanged.pass 'An unchanged untracked-only snapshot was rejected.'

    [System.IO.File]::WriteAllText(
        $untrackedPath,
        "untracked change after review`n",
        (New-Object System.Text.UTF8Encoding($false))
    )
    $changedUntracked = Test-RepositoryPromotionSnapshot `
        -Expected $untracked `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition (-not $changedUntracked.pass) 'A post-review untracked-only tree change was not rejected.'
    Assert-GuardCondition `
        (@($changedUntracked.findings -match 'promotable Git tree changed after review').Count -gt 0) `
        'The untracked-only tree-change rejection did not report its reason.'

    [System.IO.File]::Delete($untrackedPath)

    [System.IO.File]::WriteAllText(
        (Join-Path $fixturePath 'reviewed.txt'),
        "reviewed change`n",
        (New-Object System.Text.UTF8Encoding($false))
    )
    $reviewedIndexBefore = Get-GuardIndexState -Repository $fixturePath
    $reviewed = Get-RepositoryPromotionSnapshot -Repository $fixturePath -ScratchDirectory $resolvedScratch
    $reviewedIndexAfter = Get-GuardIndexState -Repository $fixturePath
    Assert-GuardIndexUnchanged `
        -Before $reviewedIndexBefore `
        -After $reviewedIndexAfter `
        -Context 'Tracked-change snapshot generation'
    Assert-GuardCondition $reviewed.has_changes 'A real working-tree change was not captured.'

    $unchanged = Test-RepositoryPromotionSnapshot `
        -Expected $reviewed `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition $unchanged.pass 'An unchanged reviewed snapshot was rejected.'

    & git -C $fixturePath add -A
    if ($LASTEXITCODE -ne 0) { throw 'Fixture staging failed.' }
    $staged = Test-RepositoryPromotionSnapshot `
        -Expected $reviewed `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition $staged.pass 'Staging the reviewed tree changed its promotion fingerprint.'

    [System.IO.File]::WriteAllText(
        (Join-Path $fixturePath 'reviewed.txt'),
        "changed after review`n",
        (New-Object System.Text.UTF8Encoding($false))
    )
    $changedTree = Test-RepositoryPromotionSnapshot `
        -Expected $reviewed `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition (-not $changedTree.pass) 'A post-review tree change was not rejected.'

    & git -C $fixturePath add -A
    & git -C $fixturePath commit --quiet -m 'test: move head'
    if ($LASTEXITCODE -ne 0) { throw 'Fixture HEAD-change commit failed.' }

    [System.IO.File]::WriteAllText(
        (Join-Path $fixturePath 'after-head.txt'),
        "new diff`n",
        (New-Object System.Text.UTF8Encoding($false))
    )
    $changedHead = Test-RepositoryPromotionSnapshot `
        -Expected $reviewed `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition (-not $changedHead.pass) 'A post-review HEAD change was not rejected.'
    Assert-GuardCondition `
        (@($changedHead.findings -match 'HEAD changed after the reviewed snapshot').Count -gt 0) `
        'The HEAD-change rejection did not report its reason.'

    $emptyApproval = Test-RepositoryPromotionSnapshot `
        -Expected $clean `
        -Repository $fixturePath `
        -ScratchDirectory $resolvedScratch
    Assert-GuardCondition (-not $emptyApproval.pass) 'An approval bound to an empty diff was not rejected.'

    Write-Output 'CONTROLLER_PROMOTION_GUARD_TEST_PASS'
}
finally {
    if (Test-Path -LiteralPath $fixturePath -PathType Container) {
        if (-not $fixturePath.StartsWith($scratchPrefix,[System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Refusing to remove fixture outside the scratch root: $fixturePath"
        }

        Remove-Item -LiteralPath $fixturePath -Recurse -Force
    }
}
