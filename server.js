const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const ytdl = require('ytdl-core');

// origins: ['https://dotdothorse.com', 'https://games.dotdothorse.com']
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200
}

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send("dotdothorse youtube audio api");
})

// app.get('/youtube/:videoId', cors(corsOptions), (req, res) => {
//     try {
//         youtubeStream(req.params.videoId).pipe(res);
//     } catch (exception) {
//         res.status(500).send(exception);
//     }
// });

app.get('/:videoId', cors(), (req, res) => {
    const videoId = req.params.videoId;
    try {
        ytdl(`https://www.youtube.com/watch?v=${videoId}`, { quality: 'lowestaudio' })
            .pipe(res);
    } catch (exception) {
        res.status(500).send(exception);
    }
})

module.exports = app;