import fs from 'fs';
import { execSync } from 'child_process';

// 1. Create directory
if (!fs.existsSync('certs')) {
  fs.mkdirSync('certs', { recursive: true });
}

try {
  // 2. Use OpenSSL to generate a self-signed certificate
  execSync(
    'openssl req -x509 -newkey rsa:2048 -keyout certs/localhost.key -out certs/localhost.crt -days 365 -nodes -subj "/CN=localhost"',
    { stdio: 'inherit' }
  );
  console.log('✅ Certificate generated successfully using OpenSSL');
} catch (err) {
  console.error('❌ OpenSSL not found. Try: npm install selfsigned');
}
