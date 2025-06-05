import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const PORT = 8001;

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/run-puppeteer', (req, res) => {
  const scriptPath = path.resolve('./puppeteer.js');

  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка запуска: ${error.message}`);
      return res.status(500).json({ error: 'Ошибка запуска puppeteer' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    res.json({ message: 'Puppeteer выполнен', output: stdout.trim() });
  });
});

app.listen(PORT, () => {
  console.log(`Server запущен на http://localhost:${PORT}`);
});
