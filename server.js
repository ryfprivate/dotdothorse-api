const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const youtubeStream = require('youtube-audio-stream');

const corsOptions = {
    origin: ['https://dotdothorse.com', 'https://games.dotdothorse.com'],
    optionsSuccessStatus: 200
}

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send("dotdothorse youtube audio api");
})

app.get('/youtube/:videoId', cors(corsOptions), (req, res) => {
    try {
        youtubeStream(req.params.videoId).pipe(res);
    } catch (exception) {
        res.status(500).send(exception);
    }
});

module.exports = app;