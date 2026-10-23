import 'dotenv/config';

import express, { Request, Response } from 'express'; //import express from package

import { connectDB } from './config/db.js';
const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    message: 'API is running',
  });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

//error route: error route doesn't use any url path and is always defined after the server
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'ERROR 404, ROUTE NOT FOUND',
  });
});
