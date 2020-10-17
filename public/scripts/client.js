$(document).ready(readyNow);

function readyNow() {
  console.log('init');
  $('.button-box').on('click', '.calc-button', onClick);
}
// placeholder vars for calc
let switcher = false;
let number1 = '';
let mathType = '';
let number2 = '';
let tempString = '';
///

let equationObject = { number1: '', mathType: '', number2: '' };

function onClick() {
  let button = $(this);
  console.log('clicked');

  function renderCalc(input) {
    if (switcher == false) {
      tempString += input;
      $('.number1').val(tempString);
    } else {
      $('.number1').val('');
      tempString += input;
      $('.number1').val(number1 + mathType + tempString);
    }
  }
  // check for number clicked
  if (button.hasClass('0')) {
    renderCalc('0');
  } else if (button.hasClass('1')) {
    renderCalc('1');
  } else if (button.hasClass('2')) {
    renderCalc('2');
  } else if (button.hasClass('3')) {
    renderCalc('3');
  } else if (button.hasClass('4')) {
    renderCalc('4');
  } else if (button.hasClass('5')) {
    renderCalc('5');
  } else if (button.hasClass('6')) {
    renderCalc('6');
  } else if (button.hasClass('7')) {
    renderCalc('7');
  } else if (button.hasClass('8')) {
    renderCalc('8');
  } else if (button.hasClass('9')) {
    renderCalc('9');
  }
  ///

  // filter out math type
  if (button.hasClass('+')) {
    if (switcher == false) {
      const placeholder = $('.number1').val();
      number1 = placeholder;
      mathType = '+';
      tempString = '';
      switcher = true;
      renderCalc('');
    } else {
      mathType = '+';
      renderCalc('');
    }
    equationObject.mathType = '+';
  } else if (button.hasClass('-')) {
    if (switcher == false) {
      const placeholder = $('.number1').val();
      number1 = placeholder;
      mathType = '-';
      tempString = '';
      switcher = true;
      renderCalc('');
    } else {
      mathType = '-';
      renderCalc('');
    }
    equationObject.mathType = '-';
  } else if (button.hasClass('*')) {
    if (switcher == false) {
      const placeholder = $('.number1').val();
      number1 = placeholder;
      mathType = '*';
      tempString = '';
      switcher = true;
      renderCalc('');
    } else {
      mathType = '*';
      renderCalc('');
    }
    equationObject.mathType = '*';
  } else if (button.hasClass('/')) {
    if (switcher == false) {
      const placeholder = $('.number1').val();
      number1 = placeholder;
      mathType = '/';
      tempString = '';
      switcher = true;
      renderCalc('');
    } else {
      mathType = '/';
      renderCalc('');
    }
    equationObject.mathType = '/';
  }
  ///
  if (button.hasClass('=')) {
    number2 = tempString;
    equationObject.number1 = number1;
    equationObject.number2 = number2;
    $('.number1').val('');
    switcher = false;
    number1 = '';
    mathType = '';
    number2 = '';
    tempString = '';

    // send data to server
    $.ajax({
      type: 'POST',
      url: '/calculate',
      data: equationObject,
    })
      .then(function (response) {
        getResponse();
      })
      .catch(function (err) {
        console.log(err);
        alert('could not send item data to server');
      });
    ///
  }

  // clear
  if (button.hasClass('C')) {
    equationObject = { number1: 0, mathType: '', number2: 0 };
    $('.number1').val('');
    switcher = false;
    number1 = '';
    mathType = '';
    number2 = '';
    tempString = '';
  }
  ///
}

function getResponse() {
  // get data from server
  $.ajax({
    type: 'GET',
    url: '/calculate',
  })
    .then(function (response) {
      renderValue(response);
      getHistory();
    })
    .catch(function (err) {
      console.log(err);
      alert('could not get item data to server');
    });
  ///
}

function getHistory() {
  // get data from server
  $.ajax({
    type: 'GET',
    url: '/history',
  })
    .then(function (response) {
      renderHistory(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('could not get item data to server');
    });
  ///
}

// update DOM
function renderValue(response) {
  $('.output-math').empty();
  $('.output-math').append(response.value);
}
function renderHistory(response) {
  $('.history').empty();
  for (let i = 0; i < response.array.length; i++) {
    let obj = response.array[i];
    $('.history').append(
      `<li> ${obj.number1} ${obj.mathType} ${obj.number2} = ${obj.value} </li>`
    );
  }
}
///
