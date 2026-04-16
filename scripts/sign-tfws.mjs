import crypto from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inventoryPath = path.join(root, 'public', 'dumps', 'sha256.json');
const signaturePath = path.join(root, 'public', 'dumps', 'sigs', 'sha256.json.minisig');
const privateKeyPath = process.env.TFWS_PRIVATE_KEY_PATH || path.join(root, '.secrets', 'tfws-private.pem');

async function main() {
  const inventory = await fs.readFile(inventoryPath, 'utf8');
  let privateKey;
  try {
    privateKey = await fs.readFile(privateKeyPath, 'utf8');
  } catch {
    console.warn(`No private key found at ${privateKeyPath}. Keeping placeholder signature file.`);
    await fs.writeFile(signaturePath, 'placeholder-signature\n', 'utf8');
    return;
  }

  const signature = crypto.sign(null, Buffer.from(inventory, 'utf8'), privateKey).toString('base64');
  const content = [
    'TFWS-SIGNATURE-PAYLOAD',
    'scheme=ed25519',
    'format=custom-base64-detached',
    `signed_at=${new Date().toISOString()}`,
    signature,
    '',
  ].join('\n');

  await fs.mkdir(path.dirname(signaturePath), { recursive: true });
  await fs.writeFile(signaturePath, content, 'utf8');
  console.log(`Wrote signature ${signaturePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
