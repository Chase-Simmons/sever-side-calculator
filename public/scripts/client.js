$(document).ready(readyNow);

function readyNow() {
  console.log('init');
  $('.button-box').on('click', '.calc-button', onClick);
}
let equationObject = { number1: '', mathType: '', number2: '' };

function onClick() {
  let button = $(this);
  console.log('clicked');

  // check for number clicked
  if (button.hasClass('0')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 0);
  } else if (button.hasClass('1')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 1);
  } else if (button.hasClass('2')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 2);
  } else if (button.hasClass('3')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 3);
  } else if (button.hasClass('4')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 4);
  } else if (button.hasClass('5')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 5);
  } else if (button.hasClass('6')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 6);
  } else if (button.hasClass('7')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 7);
  } else if (button.hasClass('8')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 8);
  } else if (button.hasClass('9')) {
    const placeholder = $('.number1').val();
    $('.number1').val(placeholder + 9);
  }
  ///
  // filter out math type
  if (button.hasClass('+')) {
    const placeholder = $('.number1').val();
    if (equationObject.number1 != '') {
      equationObject.number1 = parseInt(placeholder);
      $('.number1').val(placeholder + '+');
    } else {
      placeholder.replaceAll('+', '1');
      placeholder.replaceAll('-', '');
      placeholder.replaceAll('*', '');
      placeholder.replaceAll('/', '');
      $('.number1').val(placeholder + '+');
    }
    equationObject.mathType = '+';
  } else if (button.hasClass('-')) {
    const placeholder = $('.number1').val();
    if (equationObject.number1 != '') {
      equationObject.number1 = parseInt(placeholder);
    }
    $('.number1').val(placeholder + '-');
    equationObject.mathType = '-';
  } else if (button.hasClass('*')) {
    equationObject.mathType = '*';
  } else if (button.hasClass('/')) {
    equationObject.mathType = '/';
  }
  ///

  if (button.hasClass('=')) {
    equationObject.number1 = $('.number1').val();
    equationObject.number2 = $('.number2').val();
    $('.number1').val('');
    $('.number2').val('');

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
    clear();
    equationObject = { number1: 0, mathType: '', number2: 0 };
    $('.number1').val('');
    $('.number2').val('');
  }
  ///
}

function clear() {
  console.log('cleared');
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
