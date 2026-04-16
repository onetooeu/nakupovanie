import crypto from 'node:crypto';


export type TfwsArtifact = {
  path: string;
  sha256: string;
  size: number;
};

export function stableJson(value: unknown) {
  return JSON.stringify(value, null, 2) + '\n';
}

export function sha256(data: string | Uint8Array) {
  const buffer = typeof data === 'string' ? Buffer.from(data, 'utf8') : Buffer.from(data);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

export function buildInventory(items: Array<{ path: string; content: string }>) {
  const artifacts: TfwsArtifact[] = items.map((item) => ({
    path: item.path,
    sha256: sha256(item.content),
    size: Buffer.byteLength(item.content, 'utf8'),
  }));
  return {
    generated_at: new Date().toISOString(),
    count: artifacts.length,
    artifacts,
  };
}

export async function signWithEd25519(privateKeyPem: string, data: string) {
  return crypto.sign(null, Buffer.from(data, 'utf8'), privateKeyPem).toString('base64');
}

export async function generateEd25519KeyPair() {
  return crypto.generateKeyPairSync('ed25519', {
    privateKeyEncoding: { format: 'pem', type: 'pkcs8' },
    publicKeyEncoding: { format: 'pem', type: 'spki' },
  });
}

export function publicKeyToDisplay(publicKeyPem: string) {
  return publicKeyPem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/\s+/g, '')
    .trim();
}
