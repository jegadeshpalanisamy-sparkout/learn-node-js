import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// When running this file directly, __dirname is /utils, so go up one level.
const rootDir = path.resolve(__dirname, '..');

// 1) Read a file (async)
const dataPath = path.join(rootDir, 'message.txt');
fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) return console.error('Read error:', err);
  console.log('File content:', data);
});

// 2) Write a file (async) - creates or overwrites
const logsDir = path.join(rootDir, 'logs');
const outPath = path.join(logsDir, 'output.txt');
fs.mkdir(logsDir, { recursive: true }, (err) => {
  if (err) return console.error('Mkdir error:', err);

  fs.writeFile(outPath, 'Hello from fs!\n', (err) => {
    if (err) return console.error('Write error:', err);
    console.log('File written!');

    // 3) Append to the same file (async)
    fs.appendFile(outPath, 'Appended line\n', (err) => {
      if (err) return console.error('Append error:', err);
      console.log('File appended!');
    });
  });
});

// 4) Check if a file exists
fs.access(dataPath, fs.constants.F_OK, (err) => {
  console.log(err ? 'File missing' : 'File exists');
});

// 5) Read directory
const viewsDir = path.join(rootDir, 'views');
fs.readdir(viewsDir, (err, files) => {
  if (err) return console.error('Dir read error:', err);
  console.log('Views:', files);
});
