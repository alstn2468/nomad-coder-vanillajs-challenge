// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const numberRangeText = document.querySelector(".number-range-text");
const rangeInput = document.querySelector("input[name=range-input]");
const gameForm = document.querySelector("form[name=game-form]");
const numberResult = document.querySelector(".number-result");
const gameResult = document.querySelector(".game-result");

const minValue = rangeInput.min;
let nowValue = rangeInput.value;

function createRangeText(value) {
    return `Generate a number between 0 and ${value}`;
}

function setRangeText(value) {
    numberRangeText.innerText = createRangeText(value);
}

function onCahngeRangeInput(rangeInput) {
    nowValue = rangeInput.value;
    setRangeText(nowValue);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addNumberResultText(userNumber, randomNumber) {
    numberResult.innerText = `You chose : ${userNumber}, the machine choose : ${randomNumber}`;
}

function addGameResultText(isWin) {
    const resultTag =
        `<strong style="color:${isWin ? "blue" : "red"};">` +
        (isWin ? "You won!" : "You lost!") +
        "</strong>";

    gameResult.innerHTML = resultTag;
}

function onSubmitForm(event) {
    event.preventDefault();
    const numberInputValue = parseInt(gameForm["number-input"].value, 10);

    if (!numberInputValue) {
        return alert("Please write any number.");
    }

    const randomNumber = generateRandomNumber(minValue, nowValue);

    addNumberResultText(numberInputValue, randomNumber);
    addGameResultText(numberInputValue === randomNumber);
}

function init() {
    setRangeText(nowValue);
    rangeInput.addEventListener("change", () => onCahngeRangeInput(rangeInput));
    gameForm.addEventListener("submit", onSubmitForm);
}

init();
