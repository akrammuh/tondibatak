// Referensi elemen-elemen HTML
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21;  // diubah dari 11 ke 21 untuk 20 detik
let countdown;
let answerSelected = false;

// Array pertanyaan dan opsi
const quizArray = [
    {
        id: "0",
        question: "Huruf Batak Toba untuk bunyi “h” adalah?",
        options: ["ᯂ", "ᯠ", "ᯋ", "ᯇ"],
        correct: "ᯂ",
    },
    {
        id: "1",
        question: "Manakah di bawah ini yang merupakan lambang vokal “O” dalam aksara Batak?",
        options: ["ᯪ", "ᯐ", "ᯮ", "ᯬ"],
        correct: "ᯬ",
    },
    {
        id: "2",
        question: "Manakah di bawah ini yang merupakan penulisan aksara Batak yang benar untuk bunyi “hu”?",
        options: ["ᯂᯪ", "ᯂᯮ", "ᯂᯩ", "ᯂᯬ"],
        correct: "ᯂᯮ",
    },
    {
        id: "3",
        question: "Berapa sub-suku Batak yang dikenal menggunakan Aksara Batak dalam sejarahnya?",
        options: ["2", "3", "6", "1"],
        correct: "6",
    },
    {
        id: "4",
        question: "Apa salah satu perbedaan utama antara Aksara Batak Toba dan Aksara Batak Karo?",
        options: ["Aksara Karo tidak memiliki simbol vokal", "Aksara Toba lebih banyak digunakan untuk menulis doa Kristen saja", "Aksara Karo memiliki beberapa bentuk huruf yang berbeda dari Toba dan pelafalan khas", "Aksara Toba ditulis dari kanan ke kiri"],
        correct: "Aksara Karo memiliki beberapa bentuk huruf yang berbeda dari Toba dan pelafalan khas",
    },
    {
        id: "5",
        question: "Dalam Aksara Batak Karo, huruf untuk bunyi “ba” adalah?",
        options: ["ᯅ", "ᯇ", "ᯆ", "ᯄ"],
        correct: "ᯆ",
    },
    {
        id: "6",
        question: "Aksara Batak digunakan terutama oleh masyarakat di provinsi?",
        options: ["Sumatera Barat", "Sumatera Utara", "Jambi", "Aceh"],
        correct: "Sumatera Utara",
    },
    {
        id: "7",
        question: "Aksara Batak termasuk dalam rumpun aksara...?",
        options: ["Latin", "Brahmi", "Arab", "Romawi"],
        correct: "Brahmi",
    },
    {
        id: "8",
        question: "Aksara Batak pada masa lalu banyak digunakan untuk...?",
        options: ["Surat cinta", "Tulisan suci dan hukum adat", "Iklan dan majalah", "Administrasi kolonial"],
        correct: "Tulisan suci dan hukum adat",
    },
    {
        id: "9",
        question: "Apa nama naskah kuno Batak yang ditulis menggunakan kulit kayu?",
        options: ["Ulos", "Pustaha", "Lontar", "Mandala"],
        correct: "Pustaha",
    },
];

// Tombol Ulangi
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Tombol Selanjutnya
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        if (!answerSelected) {
            showPopup();
            return;
        }

        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Jawaban benar " + scoreCount + " dari " + questionCount + " pertanyaan";
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " dari " + quizArray.length + " Pertanyaan";
            quizDisplay(questionCount);
            count = 21;  // reset timer ke 21 untuk 20 detik
            clearInterval(countdown);
            timerDisplay();
            answerSelected = false;
        }
    })
);

// Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

// Tampilkan kuis
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

// Buat kuis
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " dari " + quizArray.length + " Pertanyaan";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question", "batak");  // <--- tambah class 'batak' di sini
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Fungsi cek jawaban
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
    answerSelected = true;
}

// Setup awal
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 21;  // reset ke 21 saat mulai
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
    answerSelected = false;
}

// Saat tombol mulai ditekan
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Tampilkan popup peringatan jika belum memilih jawaban
function showPopup() {
    const popup = document.getElementById("popup-warning");
    popup.classList.remove("hide");
    setTimeout(() => {
        popup.classList.add("hide");
    }, 2500);
}

// Saat halaman dimuat
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

// Tombol kembali ke index.html
document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';  // atau ganti dengan path halaman utama kamu
});
