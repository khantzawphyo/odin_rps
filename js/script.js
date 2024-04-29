choices = ["rock", "paper", "scissors"];
const getComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

function getHumanChoice() {
    const userChoice = prompt("Enter your choice (rock, paper, scissors): ").toLowerCase();
    if (userChoice === "rock" || userChoice === "paper" || userChoice === "scissors") {
        return userChoice;
    }
    else {
        alert("Invalid choice!");
        return getHumanChoice();
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;


    function playRound(humanChoice, computerChoice) {
        humanChoice = humanChoice.toLowerCase();

        let result;
        let explanation;

        if (humanChoice === computerChoice) {
            result = "It's a tie!";
            explanation = "";
        }
        else if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            result = "You Win!";
            explanation = `${humanChoice} beats ${computerChoice}`;
            humanScore++;
        }
        else {
            result = "You Lose!";
            explanation = `${computerChoice} beats ${humanChoice}`;
            computerScore++;
        }

        console.log(`${result} ${explanation}`);
    }

    for (let i = 0; i < 5; i++) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
    }

    if (humanScore > computerScore) {
        console.log("Congratulations! You win the game!");
    } else if (humanScore < computerScore) {
        console.log("Sorry, you lose the game. Better luck next time!");
    } else {
        console.log("It's a tie! The game ends in a draw.");
    }

    
}

playGame();