// init
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
///
// app use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
///

// app.post
app.post('/calculate', (req, res) => {
  console.log('initPOST');
  res.sendStatus(200);
});
app.get('/calculate', (req, res) => {
  console.log('initGET');
});
///

// connection listener
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
// end of connection listener
