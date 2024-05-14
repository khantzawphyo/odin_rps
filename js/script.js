document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons button');
    const playerScoreElement = document.querySelector('.player-score span');
    const computerScoreElement = document.querySelector('.computer-score span');
    const gameMessageElement = document.querySelector('.game-message');
    const playerChoiceElement = document.querySelector('.player-choice');
    const computerChoiceElement = document.querySelector('.computer-choice');
    const audio = new Audio("../click.wav");

    if (!buttons.length || !playerScoreElement || !computerScoreElement || !gameMessageElement || !playerChoiceElement || !computerChoiceElement) {
        console.error('One or more elements are missing in the DOM.');
        return;
    }

    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const icons = {
        ROCK: '✊🏻',
        PAPER: '🖐🏻',
        SCISSORS: '✌🏻'
    };

    let playerScore = 0;
    let computerScore = 0;

    const getComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

    const playRound = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return "It's a tie!";
        }
        else if (
            (playerChoice === "ROCK" && computerChoice === "SCISSORS") ||
            (playerChoice === "PAPER" && computerChoice === "ROCK") ||
            (playerChoice === "SCISSORS" && computerChoice === "PAPER")
        ) {
            playerScore++;
            return `${icons[playerChoice]} beats ${icons[computerChoice]}. You Win!`;
        }
        else {
            computerScore++;
            return `${icons[computerChoice]} beats ${icons[playerChoice]}. You Lose!`;
        }
    }

    const updateScore = (result) => {
        gameMessageElement.textContent = result;
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;

        if (playerScore === 5 || computerScore === 5) {
            const winner = playerScore === 5 ? 'You' : 'Computer';
            alert(`${winner} win the game!`);
            resetGame();
        }
    }

    const resetGame = () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreElement.textContent = 0;
        computerScoreElement.textContent = 0;
        playerChoiceElement.textContent = '';
        computerChoiceElement.textContent = '';
        gameMessageElement.textContent = 'The first to score 5 points win!';
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            audio.play();
            const playerChoice = button.id.toUpperCase();
            if (!choices.includes(playerChoice)) {
                console.error(`Invalid player choice: ${playerChoice}`);
                return;
            }
            playerChoiceElement.textContent = icons[playerChoice];
            const computerChoice = getComputerChoice();
            computerChoiceElement.textContent = icons[computerChoice];
            const result = playRound(playerChoice, computerChoice);
            updateScore(result);
        });
    });
});
