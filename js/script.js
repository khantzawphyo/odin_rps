document.addEventListener('DOMContentLoaded', () => {
    const gameMessageElement = document.querySelector('.game-message');
    const playerChoiceElement = document.querySelector('.player-choice');
    const computerChoiceElement = document.querySelector('.computer-choice');
    const playerScoreElement = document.querySelector('.player-score span');
    const computerScoreElement = document.querySelector('.computer-score span');
    const choices = document.querySelectorAll('.choices button');
    const audio = new Audio('./assets/click.wav');

    const icons = {
        ROCK: '✊🏻',
        PAPER: '🖐🏻',
        SCISSORS: '✌🏻'
    };

    const choicesList = ['ROCK', 'PAPER', 'SCISSORS'];

    let playerScore = 0;
    let computerScore = 0;

    const generateComputerChoice = () => choicesList[Math.floor(Math.random() * choicesList.length)];

    const playRound = (playerChoice, computerChoice) => {
        const winConditions = {
            ROCK: 'SCISSORS',
            PAPER: 'ROCK',
            SCISSORS: 'PAPER'
        };

        if (playerChoice === computerChoice) {
            return "It is a tie.";
        } else if (winConditions[playerChoice] === computerChoice) {
            playerScore++;
            return `${icons[playerChoice]} beats ${icons[computerChoice]}`;
        } else {
            computerScore++;
            return `${icons[computerChoice]} beats ${icons[playerChoice]}`;
        }
    };

    const updateInfos = (result) => {
        gameMessageElement.textContent = result;
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;

         // Ensure the DOM updates before triggering the alert
         requestAnimationFrame(() => {
            if (playerScore === 5 || computerScore === 5) {
                setTimeout(() => {
                    const winner = playerScore === 5 ? 'You' : 'Computer';
                    alert(`${winner} win the game!`);
                    resetGame();
                }, 0);
            }
        });
    };

    const resetGame = () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreElement.textContent = 0;
        computerScoreElement.textContent = 0;
        playerChoiceElement.textContent = '❔';
        computerChoiceElement.textContent = '❔';
        gameMessageElement.textContent = 'First to score 5 points wins.';
    }

    choices.forEach((choice) => {
        choice.addEventListener('click', () => {
            audio.play();
            const playerChoice = choice.id;
            playerChoiceElement.textContent = icons[playerChoice];
            const computerChoice = generateComputerChoice();
            computerChoiceElement.textContent = icons[computerChoice];
            const result = playRound(playerChoice, computerChoice);
            updateInfos(result);
        });
    });
});