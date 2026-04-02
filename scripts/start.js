import { execSync, spawn } from 'child_process';

function runCommand(command) {
  try {
    console.log(`✅ Running: ${command}`);
    // Keep execSync for short-lived tasks like linting/compiling
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Error running command: ${command}`);
    return false;
  }
}

function main() {
  console.log('🔧 Starting project setup...');
  if (!runCommand('npm run format') || !runCommand('npm run lint')  || !runCommand('npm run test') || !runCommand('npm run compile')) {
    process.exit(1);
  }

  console.log('\n🚀 Starting development server...');

  // Use spawn so it doesn't block the rest of the script
  const server = spawn('node', ['dist/server.js'], { stdio: 'inherit' });

  // Give the server a second to boot, then open the browser
  setTimeout(() => {
    console.log('🌐 Opening browser...');
    const startCmd = process.platform === 'win32' ? 'start' : 'open';
    execSync(`${startCmd} https://localhost:3000`);
  }, 2000); 

  // Ensure the script stays alive as long as the server is running
  server.on('exit', (code) => {
    process.exit(code);
  });
}

main();
