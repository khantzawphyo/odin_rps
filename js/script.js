
const getComputerChoice = () => {
    choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

console.log(getComputerChoice());