const CACHE_KEY = 'calculation_history';
//fungsi pengecekan
function checkForStorage() {
  return typeof Storage !== 'undefined';
}

//menyimpan data history
function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    //menambahkan nilai array baru di awal index
    historyData.unshift(data);

    //hapus index terakhir agar array selalu berisi 7 data saja
    if (historyData.length > 7) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

//fungsi mendapatan data localStorage
function showHistory() {
  if (checkForStorage) {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || []);
  } else {
    return [];
  }
}

//fungsi render data histori kalkulasi ke tabel HTML
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector('#historyList');

  //selalu hapus konten html elemen historyList
  historyList.innerHTML = '';

  for (let history of historyData) {
    //buat element baru
    let row = document.createElement('tr');
    //tampilkan isi tabel data sesuai atasnya
    row.innerHTML = '<td>' + history.firstNumber + '</td>';
    row.innerHTML += '<td>' + history.operator + '</td>';
    row.innerHTML += '<td>' + history.secondNumber + '</td>';
    row.innerHTML += '<td>' + history.result + '</td>';

    historyList.appendChild(row);
  }
}

//panggil
renderHistory();
