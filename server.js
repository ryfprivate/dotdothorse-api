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

const ytdlOptions = {
    quality: 'lowestaudio'
}

app.get('/youtube/:videoId', cors(), (req, res) => {
    const videoId = req.params.videoId;
    // ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
    //     quality: 'lowestaudio'
    // }).on('error', (err) => res.status(500).send(err))
    //     .pipe(res);
    try {
        ytdl(`https://www.youtube.com/watch?v=${videoId}`, ytdlOptions)
            .on('error', (err) => {
                //console.log('error: ', err)
                throw err
            })
            .pipe(res);
    } catch (exception) {
        res.status(500).send(exception);
    }
})

module.exports = app;