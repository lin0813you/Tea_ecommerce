const { spawn } = require('child_process');
const path = require('path');

// Helper function to start a process in a specific directory
function startProcess(command, args, cwd) {
  console.log(`Starting process: ${command} ${args.join(' ')} in ${cwd}`);
  const process = spawn(command, args, { cwd, stdio: 'inherit', shell: true });

  process.on('error', (err) => {
    console.error(`Failed to start process in ${cwd}: ${err}`);
  });

  process.on('close', (code) => {
    console.log(`Process in ${cwd} exited with code ${code}`);
  });

  return process;
}

// Start the backend server in the 'server' directory
console.log('--- Starting backend server ---');
const serverProcess = startProcess('npm', ['start'], path.join(__dirname, 'server'));

// Start the frontend development server in the 'client' directory
console.log('--- Starting frontend development server ---');
const clientProcess = startProcess('npm', ['run', 'dev'], path.join(__dirname, 'client'));

// Keep the main process alive and handle graceful shutdown
const shutdown = () => {
  console.log('--- Shutting down processes ---');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

serverProcess.on('close', shutdown);
clientProcess.on('close', shutdown);