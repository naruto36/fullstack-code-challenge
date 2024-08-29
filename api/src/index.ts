import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Chittranjan, data coming from API!');
});

app.listen(port, () => {
    console.log(`API at http://localhost:${port}`);
});
