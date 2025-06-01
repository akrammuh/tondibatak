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
let count = 11;
let countdown;
let answerSelected = false;

// Array pertanyaan dan opsi
const quizArray = [
    {
        id: "0",
        question: "Bahasa apa yang paling banyak digunakan di dunia?",
        options: ["Spanyol", "Mandarin", "Inggris", "Jerman"],
        correct: "Mandarin",
    },
    {
        id: "1",
        question: "Benua apa yang tidak memiliki gurun?",
        options: ["Amerika Utara", "Asia", "Afrika", "Eropa"],
        correct: "Eropa",
    },
    {
        id: "2",
        question: "Siapa penemu komputer?",
        options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Charles Babbage",
    },
    {
        id: "3",
        question: "Komputer yang meminta file dari komputer lain disebut?",
        options: ["Client", "Host", "Router", "Web server"],
        correct: "Client",
    },
    {
        id: "4",
        question: "Perangkat keras yang bukan bagian utama dari sistem komputer disebut?",
        options: ["Peripheral", "Clip art", "Highlight", "Execute"],
        correct: "Peripheral",
    },
    {
        id: "5",
        question: "Komputer utama yang menyimpan file di jaringan disebut?",
        options: ["Clip art", "Mother board", "Peripheral", "File server"],
        correct: "File server",
    },
    {
        id: "6",
        question: "Bagaimana virus komputer menyebar?",
        options: ["Mengirim email", "Menggunakan laptop saat musim dingin", "Membuka lampiran email", "Belanja online"],
        correct: "Membuka lampiran email",
    },
    {
        id: "7",
        question: "Google (www.google.com) adalah?",
        options: ["Mesin pencari", "Angka dalam matematika", "Direktori gambar", "Layanan chatting"],
        correct: "Mesin pencari",
    },
    {
        id: "8",
        question: "Manakah yang bukan protokol internet?",
        options: ["HTTP", "FTP", "STP", "IP"],
        correct: "STP",
    },
    {
        id: "9",
        question: "Manakah yang bukan nama domain valid?",
        options: ["www.yahoo.com", "www.yahoo.co.uk", "www.com.yahoo", "www.yahoo.co.in"],
        correct: "www.com.yahoo",
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
            count = 11;
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
        question_DIV.classList.add("question");
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
    count = 11;
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


document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';  // atau path ke halaman utama kamu
  });