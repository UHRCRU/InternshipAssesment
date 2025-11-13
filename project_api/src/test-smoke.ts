import { start } from './index';
import http from 'http';

async function request(path: string) {
  return new Promise<string>((resolve, reject) => {
    http.get(path, res => {
      const chunks: Buffer[] = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

async function main() {
  const server = start(3001);
  await new Promise(r => setTimeout(r, 300));
  const list = await request('http://localhost:3001/products');
  console.log('GET /products ->', list.slice(0, 120) + '...');
  server.close();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
