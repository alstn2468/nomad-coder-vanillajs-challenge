// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
import "./sanfrancisco-font.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const resultNumber = document.querySelector(".result-number");
const acButton = document.querySelector("#ac");
const pmButton = document.querySelector("#pm");
const commaButton = document.querySelector("#com");

let selectedOperator = null;

function onClickCommaButton() {
    let tempNumber = resultNumber.innerText;

    if (tempNumber.includes(".")) {
        return;
    }

    resultNumber.innerText += ".0";
}

function onClickNumberButton(num) {
    let tempNumber = resultNumber.innerText;

    if (tempNumber === "0") {
        tempNumber = num;
    } else {
        tempNumber += num;
    }

    resultNumber.innerText = tempNumber;
}

function onClickResetNumberButton() {
    resultNumber.innerText = "0";
}

function onClickChangeSignButton() {
    let tempNumber = resultNumber.innerText;

    if (tempNumber === "0") {
        return;
    }

    tempNumber = tempNumber.split(".");

    if (tempNumber.length === 1) {
        tempNumber = -parseInt(tempNumber[0], 10);
    } else {
        tempNumber = -parseInt(tempNumber[0], 10) + `.${tempNumber[1]}`;
    }

    resultNumber.innerText = tempNumber;
}

function initNumberButtons() {
    for (let i = 0; i < 10; i++) {
        const button = document.querySelector(`#number-${i}`);
        button.addEventListener("click", () => onClickNumberButton(i));
    }
}

function init() {
    initNumberButtons();
    acButton.addEventListener("click", onClickResetNumberButton);
    pmButton.addEventListener("click", onClickChangeSignButton);
    commaButton.addEventListener("click", onClickCommaButton);
}

init();
