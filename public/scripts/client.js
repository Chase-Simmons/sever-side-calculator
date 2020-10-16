$(document).ready(readyNow);

function readyNow() {
  console.log('init');
  $('.button-box').on('click', '.B', onClick);
}
let equationObject = { number1: 0, mathType: '', number2: 0 };

function onClick() {
  let button = $(this);

  // filter out math type
  if (button.hasClass('+')) {
    equationObject.mathType = '+';
  } else if (button.hasClass('-')) {
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

    // send data to server
    $.ajax({
      type: 'POST',
      url: '/calculate',
      data: equationObject,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
        alert('could not send item data to server');
      });
    ///
  }
  if (button.hasClass('C')) {
    clear();
    equationObject = { number1: 0, mathType: '', number2: 0 };
    $('.number1').val('');
    $('.number2').val('');
  }
}

function clear() {
  console.log('cleared');
}
