import https from 'https';
import fs from 'fs';
import app from './app.js';
import config from './config/config.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  key: fs.readFileSync('certs/localhost.key'),
  cert: fs.readFileSync('certs/localhost.crt'),
};

const server = https.createServer(options, app);

server.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running on port ${config.port}: https://localhost:${config.port}`
  );
});
