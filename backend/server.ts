import express from 'express';
import cors from 'cors';
import { loadDataFile } from './dataStore';

loadDataFile();
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running"); // For Debug purposes
});

const liveServer = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// liveServer.on('close')