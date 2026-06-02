import express from 'express';
import dotenv from 'dotenv';
import generateHandler from './api/generate.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Route for the serverless function
app.all('/api/generate', async (req, res) => {
    try {
        await generateHandler(req, res);
    } catch (error) {
        console.error('Error executing handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Open http://localhost:${port} in your browser to view the app.`);
});
