import "./styles.css";

// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;

function calculateDiff(diff) {
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((diff % (1000 * 60)) / 1000);

    return { day, hour, minute, second };
}

function getTime(now) {
    const xmasDay = new Date("2020-12-24:00:00:00+0900");
    const dayDiff = xmasDay - now;

    return dayDiff;
}

function formattingNumber(number) {
    return number > 9 ? number : "0" + number;
}

function createDateObject(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };
}

function createNowDateData(date) {
    return (
        " Now : " +
        `${date.year}년 ` +
        `${formattingNumber(date.month)}월 ` +
        `${formattingNumber(date.day)}일 ` +
        `${formattingNumber(date.hour)}시 ` +
        `${formattingNumber(date.minute)}분 ` +
        `${formattingNumber(date.second)}초`
    );
}

function createDiffDateDate(date) {
    return (
        " To Christmas : " +
        `${formattingNumber(date.day)}일 ` +
        `${formattingNumber(date.hour)}시 ` +
        `${formattingNumber(date.minute)}분 ` +
        `${formattingNumber(date.second)}초`
    );
}

function utcTimeToKstTime() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;

    return new Date(utc + NINE_HOURS_MILLISECONDS);
}

function createElement() {
    const now = utcTimeToKstTime();
    const dateObj = createDateObject(now);
    const nowDateElement = createNowDateData(dateObj);
    const dayDiff = calculateDiff(getTime(now));
    const dayDiffElement = createDiffDateDate(dayDiff);

    return { nowDateElement, dayDiffElement };
}

function syncElement() {
    const { nowDateElement, dayDiffElement } = createElement();
    const nowElement = document.querySelector("#now");
    const diffElement = document.querySelector("#diff");

    nowElement.innerHTML = nowDateElement;
    diffElement.innerHTML = dayDiffElement;
}

function init() {
    const { nowDateElement, dayDiffElement } = createElement();
    const body = document.querySelector("body");
    utcTimeToKstTime();
    body.innerHTML = "<h1>Time Until Christmas</h1>";
    body.innerHTML += "<h2 id='now'>" + nowDateElement + "</h2>";
    body.innerHTML += "<h2 id='diff'>" + dayDiffElement + "</h2>";
}

init();

setInterval(() => syncElement(), 1000);
