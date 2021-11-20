//buat object calculator default awal
//untuk menyimpan data
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
}; //angka yg muncul pd layar calculator selalu dari data calculator.displayNumber
// Properti operator dan firstNumber akan diberikan nilai ketika pengguna melakukan aksi.
//properti waitingForSecondNumber merupakan kondisi di mana kalkulator sedang menunggu pengguna menentukkan angka kedua dalam melakukan perhitungan.

//===========================================================
//UPDATE LAYAR CALCULATOR

//buat fungsi mengubah angka yg ada di layar dari data #displayNumber
function updateDisplay() {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

//===========================================================
//FUNCTION TIAP TOMBOL

//fungsi AC menghapus calculator ke tampilan default awal
function clearCalculator() {
  (calculator.displayNumber = '0'), (calculator.operator = null), (calculator.firstNumber = null), (calculator.waitingForSecondNumber = false);
} //setelah ini kondisi layar akan kembali dg angka 0

//fungsi memasukan angka ke nilai displayNumber
function inputDigit(digit) {
  //agar angka 0 pd awal tidak muncul
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

//fungsi +/- untuk mengubah number jadi negative
function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

//fungsi %
function percentNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = (calculator.displayNumber * 1) / 100;
}

//fungsi tiap operator
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    //mengatur ulang nilai displayNumber '0' untuk secondNumber
    calculator.displayNumber = '0';
  } else {
    alert('Operator sudah ditetapkkan!');
  }
}

function performCalculation() {
  //pengecekan nilai-nilai awal
  if (calculator.firstNumber == 'null' || calculator.operator == 'null') {
    alert('Anda belum menetapkan operator!');
    return;
  }

  //parseInt: untuk mengubah string ke integer
  //parseFloat agar hasilnya desimal
  let result = 0;
  if (calculator.operator === '+') {
    result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
  } else if (calculator.operator === '-') {
    result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
  } else if (calculator.operator === 'x') {
    result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
  } else if (calculator.operator === ':') {
    result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
  }

  //data local storage
  //object yg akan dikirimkan sbg argumen
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

//===========================================================
//BUAT SEMUA FUNGSI SEMUA ELEMEN BUTTON KETIKA DI CLICK

//dapatkan elemen class button
const buttons = document.querySelectorAll('.button');
//looping tiap item
for (let button of buttons) {
  //beri event click dg fungsi inputDigit lalu updateDisplay di layar
  button.addEventListener('click', function (event) {
    //mendapatkan objek yg di click
    const target = event.target;

    //ac sbg clear berfungsi
    //jika class 'clear' terjadi event/di klik maka panggil fungsi clearCalculator
    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return; //agar event handler terhenti, dan fungsi di bawahnya tidak ikut berjalan
    } //event.classList utk melihat nilai class apa saja dalam bentuk array

    //fungsi negative
    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    //fungsi percent
    if (target.classList.contains('percent')) {
      percentNumber();
      updateDisplay();
      return;
    }

    //fungsi sama dengan (equal)
    if (target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    //fungsi operator
    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }

    //setelah di klik, angka masuk ke layar
    inputDigit(target.innerText);
    //panggil fungsi update
    updateDisplay();
  });
}
