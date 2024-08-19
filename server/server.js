import express from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';

const app = express();

app.get('/images', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = []
    const directory = join(process.cwd(), 'images');
    const files = readdirSync(directory, async (err, file) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading directory.' });
        }
    });

    files.forEach(async (file) => {
        result.push(file)
    })

    result.sort()

    res.json({ result })
})

app.listen(8000, () => {
    console.log('listening 8000');
})

app.use(express.static(join(process.cwd(), 'images')));