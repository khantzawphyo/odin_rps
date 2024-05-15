document.addEventListener('DOMContentLoaded', () => {
    const gameMessageElement = document.querySelector('.game-message');
    const playerChoiceElement = document.querySelector('.player-choice');
    const computerChoiceElement = document.querySelector('.computer-choice');
    const playerScoreElement = document.querySelector('.player-score span');
    const computerScoreElement = document.querySelector('.computer-score span');
    const choices = document.querySelectorAll('.choices button');
    const clickAudio = new Audio('/assets/click.mp3');
    const winAudio = new Audio('./assets/win.mp3');
    const loseAudio = new Audio('./assets/lose.mp3');
    const modal = document.querySelector('.modal');
    const modalMessage = document.querySelector('.modal-message');
    const modalEmoji = document.querySelector('.modal-emoji');
    const btnRestart = document.querySelector('.btn-restart');

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

    const showModal = (winner) => {
        modalMessage.textContent = `${winner} win the game!`;
        modalEmoji.src = winner === 'You' ? './assets/win.png' : './assets/lose.png';
        modal.classList.add('show');
    };

    const hideModal = () => {
        modal.classList.remove('show');
    };

    const updateInfos = (result) => {
        gameMessageElement.textContent = result;
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;

        requestAnimationFrame(() => {
            if (playerScore === 5 || computerScore === 5) {
                setTimeout(() => {
                    const winner = playerScore === 5 ? 'You' : 'Computer';
                    if (playerScore === 5) {
                        winAudio.play();
                    } else {
                        loseAudio.play();
                    }
                    showModal(winner);
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
        hideModal();
    };

    btnRestart.addEventListener('click', resetGame);

    choices.forEach((choice) => {
        choice.addEventListener('click', () => {
            clickAudio.play();
            const playerChoice = choice.id;
            playerChoiceElement.textContent = icons[playerChoice];
            const computerChoice = generateComputerChoice();
            computerChoiceElement.textContent = icons[computerChoice];
            const result = playRound(playerChoice, computerChoice);
            updateInfos(result);
        });
    });
});
