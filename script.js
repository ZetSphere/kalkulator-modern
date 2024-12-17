// Ambil elemen DOM yang dibutuhkan
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggleBtn = document.getElementById("theme-toggle");

// Variabel untuk menyimpan input dan hasil
let currentInput = ""; // Menyimpan angka yang sedang dimasukkan
let previousInput = ""; // Menyimpan angka sebelumnya
let operator = ""; // Menyimpan operator
let isDecimal = false; // Flag untuk memeriksa apakah desimal sudah ada

// Menangani event klik pada tombol kalkulator
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.textContent;

    if (value === "C") {
      // Clear input
      currentInput = "";
      previousInput = "";
      operator = "";
      isDecimal = false;
      display.textContent = "0";
    } else if (value === "=") {
      // Hitung hasil
      if (previousInput !== "" && currentInput !== "") {
        currentInput = operate(previousInput, operator, currentInput);
        display.textContent = currentInput; // Menampilkan hasil akhir
        previousInput = "";
        operator = "";
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Set operator dan tampilkan ekspresi yang sedang diketik
      if (previousInput === "") {
        previousInput = currentInput;
        currentInput = "";
        operator = value;
        display.textContent = previousInput + " " + operator; // Menampilkan ekspresi
      } else {
        // Jika sudah ada angka sebelumnya, lakukan perhitungan dengan operator sebelumnya
        previousInput = operate(previousInput, operator, currentInput);
        currentInput = "";
        operator = value;
        display.textContent = previousInput + " " + operator; // Menampilkan ekspresi dengan operator baru
      }
    } else if (value === ".") {
      // Menambahkan desimal jika belum ada
      if (!isDecimal) {
        currentInput += value;
        display.textContent = currentInput;
        isDecimal = true;
      }
    } else {
      // Menambahkan angka ke input dan update tampilan ekspresi
      currentInput += value;
      display.textContent = previousInput + " " + operator + " " + currentInput; // Menampilkan ekspresi
    }
  });
});

// Fungsi untuk menghitung hasil operasi
function operate(a, operator, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (operator) {
    case "+":
      return numA + numB;
    case "-":
      return numA - numB;
    case "*":
      return numA * numB;
    case "/":
      if (numB !== 0) return numA / numB;
      else return "Error"; // Tidak bisa dibagi dengan 0
    default:
      return 0;
  }
}

// Fungsi untuk mengganti tema antara gelap dan terang
themeToggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "🌞";
  } else {
    themeToggleBtn.textContent = "🌙";
  }
});
