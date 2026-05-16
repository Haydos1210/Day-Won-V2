import express from 'express';
import cors from 'cors';

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running"); // For Debug purposes
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});