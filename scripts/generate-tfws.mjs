import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const inventoryPath = path.join(publicDir, 'dumps', 'sha256.json');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...await walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

const files = (await walk(publicDir))
  .filter((file) => !file.endsWith(path.join('dumps', 'sha256.json')))
  .filter((file) => !file.endsWith(path.join('dumps', 'sigs', 'sha256.json.minisig')));

const artifacts = [];
for (const file of files) {
  const rel = path.relative(publicDir, file).replaceAll(path.sep, '/');
  const content = await fs.readFile(file);
  artifacts.push({
    path: `/${rel}`,
    sha256: sha256(content),
    size: content.length,
  });
}

const inventory = {
  generated_at: new Date().toISOString(),
  count: artifacts.length,
  artifacts,
};

await fs.mkdir(path.dirname(inventoryPath), { recursive: true });
await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + '\n', 'utf8');

console.log(`Wrote ${inventoryPath} with ${artifacts.length} artifacts.`);
