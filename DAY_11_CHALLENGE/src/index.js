// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
import "./sanfrancisco-font.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const resultNumber = document.querySelector(".result-number");
const acButton = document.querySelector("#ac");
const pmButton = document.querySelector("#pm");
const commaButton = document.querySelector("#com");
const modButton = document.querySelector("#mod");
const divButton = document.querySelector("#div");
const mulButton = document.querySelector("#mul");
const addButton = document.querySelector("#add");
const subButton = document.querySelector("#sub");
const equButton = document.querySelector("#equ");
const operators = {
    mod: (a, b) => Number(a) % Number(b),
    div: (a, b) => Number(a) / Number(b),
    mul: (a, b) => Number(a) * Number(b),
    sub: (a, b) => Number(a) - Number(b),
    add: (a, b) => Number(a) + Number(b),
};

let selectedOperator = null;
let beforeNumber = null;

function onClickCommaButton() {
    let tempNumber = resultNumber.innerText;

    if (tempNumber.includes(".")) {
        return;
    }

    resultNumber.innerText += ".";
}

function onClickNumberButton(event) {
    if (event.target.classList.value.includes("number-button")) {
        let tempNumber = resultNumber.innerText;
        let newNumber = event.target.innerText;

        if (selectedOperator && !beforeNumber) {
            beforeNumber = tempNumber;
            tempNumber = newNumber;
        } else if (tempNumber === "0") {
            tempNumber = newNumber;
        } else {
            tempNumber += newNumber;
        }

        resultNumber.innerText = tempNumber;
    }
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
    const calculateWrapper = document.querySelector(".calculate-pad-wrapper");

    calculateWrapper.addEventListener("click", onClickNumberButton);
}

function onClickOperatorButton(event) {
    let tempNumber = resultNumber.innerText;

    if (selectedOperator) {
        resultNumber.innerText = operators[selectedOperator](
            beforeNumber,
            tempNumber
        );
        beforeNumber = null;
    }

    selectedOperator = event.target.id;
}

function onClickEqualButton() {
    const afterNumber = resultNumber.innerText;

    resultNumber.innerText = operators[selectedOperator](
        beforeNumber,
        afterNumber
    );

    beforeNumber = null;
    selectedOperator = null;
}

function init() {
    initNumberButtons();
    acButton.addEventListener("click", onClickResetNumberButton);
    pmButton.addEventListener("click", onClickChangeSignButton);
    commaButton.addEventListener("click", onClickCommaButton);
    modButton.addEventListener("click", onClickOperatorButton);
    divButton.addEventListener("click", onClickOperatorButton);
    mulButton.addEventListener("click", onClickOperatorButton);
    addButton.addEventListener("click", onClickOperatorButton);
    subButton.addEventListener("click", onClickOperatorButton);
    equButton.addEventListener("click", onClickEqualButton);
}

init();
