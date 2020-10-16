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

// variables
mathOutput = { value: 0 };
///

// '/calculate'
app.post('/calculate', (req, res) => {
  console.log(req.body);
  const mathObject = req.body;

  // function for breaking up object into parts to make a new number from the values
  if (mathObject.mathType === '+') {
    mathOutput.value = Number(mathObject.number1) + Number(mathObject.number2);
  } else if (mathObject.mathType === '-') {
    mathOutput.value = Number(mathObject.number1) - Number(mathObject.number2);
  } else if (mathObject.mathType === '*') {
    mathOutput.value = Number(mathObject.number1) * Number(mathObject.number2);
  } else {
    mathOutput.value = Number(mathObject.number1) / Number(mathObject.number2);
  }
  ///
  res.sendStatus(201); // created
});

app.get('/calculate', (req, res) => {
  res.send(mathOutput);
  console.log(mathOutput);
});
///

// connection listener
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
///
