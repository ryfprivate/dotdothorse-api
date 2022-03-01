const express = require('express'); 
const cors = require('cors');
const app = express(); 
const port = process.env.PORT || 5000;

const youtubeStream = require('youtube-audio-stream');

app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`)); 


app.get('/youtube/:videoId', (req, res) => { 
  try {
      youtubeStream(req.params.videoId).pipe(res);
  } catch (exception) {
      res.status(500).send(exception);
  }
}); 