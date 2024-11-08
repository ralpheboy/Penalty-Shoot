let currentCircle = 0;
let myScore = 0;
let computerScore = 0;
const myScoreEl = document.querySelector(".my-score");
const computerScoreEl = document.querySelector(".computer-score");
myScoreEl.textContent = myScore;
computerScoreEl.textContent = computerScore;

const userCircles = document.querySelectorAll(".user-circle");
const computerCircles = document.querySelectorAll(".computer-circle");
const gameWinnerEl = document.querySelector(".game-winner");
const shotSelector = document.querySelector(".shot-selector");
const shootBtn = document.querySelector(".shot-btn");
const resetBtn = document.querySelector(".reset-btn");
const goalSound = new Audio("/audio/goal.mp3");
const missSound = new Audio("/audio/miss.mp3");

shootBtn.addEventListener("click", () => {
    handlePlayGame();
    checkForWinner();
});

resetBtn.addEventListener("click", resetGame);

function handlePlayGame() {
    if (shotSelector.value === "") {
        alert("Please pick a goal area");
    } else {
        playGame();
    }
};

function playGame() {
    const myMove = shotSelector.value;
    const computerMoves = ["left", "center", "right"];
    const computerMove = computerMoves[Math.floor(Math.random() * computerMoves.length)];
    
    if (myMove === computerMove) {
        missSound.play();
        userCircles[currentCircle].style.backgroundColor = "#FF0000";
        computerCircles[currentCircle].style.backgroundColor = "#03C03C";
        currentCircle++;
        computerScore += 1;
        computerScoreEl.textContent = computerScore;
        document.querySelector(`.${myMove}-area`).style.backgroundColor = "#FF0000";
        document.querySelector(`.${myMove}-area`).textContent = "SAVE";
        
        setTimeout(() => {
            document.querySelector(`.${myMove}-area`).style.backgroundColor = "transparent";
            document.querySelector(`.${myMove}-area`).textContent = "";
        }, 2000);
    } else {
        goalSound.play();
        userCircles[currentCircle].style.backgroundColor = "#03C03C";
        computerCircles[currentCircle].style.backgroundColor = "#FF0000";
        currentCircle++;
        myScore += 1;
        myScoreEl.textContent = myScore;
        document.querySelector(`.${myMove}-area`).style.backgroundColor = "#03C03C";
        document.querySelector(`.${myMove}-area`).textContent = "GOAL";
        setTimeout(() => {
            document.querySelector(`.${myMove}-area`).style.backgroundColor = "transparent";
            document.querySelector(`.${myMove}-area`).textContent = "";
        }, 2000);
    };

};

function checkForWinner() {
        if (myScore === 3) {
            gameWinnerEl.textContent = "YOU WIN!";
            gameWinnerEl.style.color = "#03C03C";
        } else if (computerScore === 3) {
            gameWinnerEl.textContent = "You LOSE!";
            gameWinnerEl.style.color = "#FF0000";
        }

        if (myScore === 3 || computerScore === 3) {
            shotSelector.disabled = true;
            shootBtn.disabled = true;
            shootBtn.style.opacity = 0.1;
        }
};

function resetGame() {
    currentCircle = 0;
    myScore = 0;
    computerScore = 0;

    myScoreEl.textContent = myScore;
    computerScoreEl.textContent = computerScore;
    gameWinnerEl.textContent = "";

    userCircles.forEach((circle) => {
        circle.style.backgroundColor = "transparent";
    })

    computerCircles.forEach((circle) => {
        circle.style.backgroundColor = "transparent";
    })

    shotSelector.disabled = false;
    shootBtn.disabled = false;
    shootBtn.style.opacity = 1;
};