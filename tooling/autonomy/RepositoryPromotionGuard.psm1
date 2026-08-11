Set-StrictMode -Version 2.0

function Invoke-PromotionGitText {
    param(
        [Parameter(Mandatory=$true)][string]$Repository,
        [Parameter(Mandatory=$true)][string[]]$Arguments
    )

    $output = @(& git -C $Repository @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
    $text = (($output | ForEach-Object { $_.ToString() }) -join "`n").Trim()

    if ($exitCode -ne 0) {
        throw ("git {0} failed with exit code {1}: {2}" -f ($Arguments -join ' '),$exitCode,$text)
    }

    return $text
}

function Get-RepositoryPromotionSnapshot {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)][string]$Repository,
        [Parameter(Mandatory=$true)][string]$ScratchDirectory
    )

    $repositoryPath = [System.IO.Path]::GetFullPath($Repository)
    $scratchPath = [System.IO.Path]::GetFullPath($ScratchDirectory)

    if (-not (Test-Path -LiteralPath $repositoryPath -PathType Container)) {
        throw "Promotion repository is missing: $repositoryPath"
    }

    if (-not (Test-Path -LiteralPath $scratchPath -PathType Container)) {
        throw "Promotion scratch directory is missing: $scratchPath"
    }

    $head = Invoke-PromotionGitText -Repository $repositoryPath -Arguments @('rev-parse','HEAD')
    $headTree = Invoke-PromotionGitText -Repository $repositoryPath -Arguments @('rev-parse',"$head^{tree}")
    $status = Invoke-PromotionGitText -Repository $repositoryPath -Arguments @(
        'status',
        '--porcelain=v1',
        '--untracked-files=all'
    )

    $indexPath = Invoke-PromotionGitText -Repository $repositoryPath -Arguments @(
        'rev-parse',
        '--path-format=absolute',
        '--git-path',
        'index'
    )

    if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
        throw "Git index is missing: $indexPath"
    }

    $temporaryIndex = Join-Path $scratchPath ("promotion-index-{0}.tmp" -f [guid]::NewGuid().ToString('N'))
    $oldIndexEnvironment = [Environment]::GetEnvironmentVariable('GIT_INDEX_FILE','Process')

    try {
        [System.IO.File]::Copy($indexPath,$temporaryIndex,$false)
        [Environment]::SetEnvironmentVariable('GIT_INDEX_FILE',$temporaryIndex,'Process')

        Invoke-PromotionGitText -Repository $repositoryPath -Arguments @('add','-A','--','.') | Out-Null
        $targetTree = Invoke-PromotionGitText -Repository $repositoryPath -Arguments @('write-tree')
    }
    finally {
        [Environment]::SetEnvironmentVariable('GIT_INDEX_FILE',$oldIndexEnvironment,'Process')

        if (Test-Path -LiteralPath $temporaryIndex -PathType Leaf) {
            Remove-Item -LiteralPath $temporaryIndex -Force
        }
    }

    return [pscustomobject][ordered]@{
        head = $head
        head_tree = $headTree
        target_tree = $targetTree
        has_changes = ($targetTree -ne $headTree)
        fingerprint = "${head}:${targetTree}"
        status = $status
    }
}

function Test-RepositoryPromotionSnapshot {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]$Expected,
        [Parameter(Mandatory=$true)][string]$Repository,
        [Parameter(Mandatory=$true)][string]$ScratchDirectory
    )

    $actual = Get-RepositoryPromotionSnapshot `
        -Repository $Repository `
        -ScratchDirectory $ScratchDirectory
    $findings = @()

    if (-not [bool]$Expected.has_changes) {
        $findings += 'Reviewer approval cannot target an empty repository diff.'
    }

    if (-not $actual.has_changes) {
        $findings += 'The repository has no current change to promote.'
    }

    if ([string]$actual.head -ne [string]$Expected.head) {
        $findings += ("HEAD changed after the reviewed snapshot: expected {0}; actual {1}." -f $Expected.head,$actual.head)
    }

    if ([string]$actual.target_tree -ne [string]$Expected.target_tree) {
        $findings += ("The promotable Git tree changed after review: expected {0}; actual {1}." -f $Expected.target_tree,$actual.target_tree)
    }

    return [pscustomobject][ordered]@{
        pass = ($findings.Count -eq 0)
        findings = $findings
        expected = $Expected
        actual = $actual
    }
}

Export-ModuleMember -Function @(
    'Get-RepositoryPromotionSnapshot',
    'Test-RepositoryPromotionSnapshot'
)
