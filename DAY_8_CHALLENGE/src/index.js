// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const TODO_DATA = {
    PENDING: JSON.parse(localStorage.getItem("PENDING")) || [],
    FINISHED: JSON.parse(localStorage.getItem("FINISHED")) || [],
};
const todoInput = document.querySelector("input[name=todoInput]");
const pendingList = document.querySelector(".pending-list");
const finishedList = document.querySelector(".finished-list");

function setLocalStorage(name, item = null) {
    item && TODO_DATA[name].push(item);
    localStorage.setItem(name, JSON.stringify(TODO_DATA[name]));
}

function createTodoItem(text) {
    return { id: Date.now(), text: text };
}

function onClickRemoveButton(id, name = "PENDING") {
    TODO_DATA[name] = TODO_DATA[name].filter((item) => item.id != id);
    setLocalStorage(name);
}

function createPendingTodoElement(item) {
    const element = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    const finishedButton = document.createElement("button");

    deleteButton.innerText = "❌";
    finishedButton.innerText = "✅";
    span.innerText = item.text;
    deleteButton.addEventListener("click", () => {
        onClickRemoveButton(item.id);
        pendingList.removeChild(element);
    });
    finishedButton.addEventListener("click", () => {
        onClickRemoveButton(item.id);
        swapTask(element, "FINISHED");
    });

    element.id = item.id;
    element.appendChild(span);
    element.appendChild(deleteButton);
    element.appendChild(finishedButton);

    return element;
}

function createFinishedTodoElement(item) {
    const element = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    const undoButton = document.createElement("button");

    deleteButton.innerText = "❌";
    undoButton.innerText = "🔙";
    span.innerText = item.text;

    deleteButton.addEventListener("click", () => {
        onClickRemoveButton(item.id, "FINISHED");
        finishedList.removeChild(element);
    });
    undoButton.addEventListener("click", () => {
        onClickRemoveButton(item.id, "FINISHED");
        swapTask(element, "PENDING");
    });

    element.id = item.id;
    element.appendChild(span);
    element.appendChild(deleteButton);
    element.appendChild(undoButton);

    return element;
}

function inputOnEnterKeyPress(event) {
    if (event.key === "Enter" && event.keyCode === 13) {
        const newItem = createTodoItem(event.target.value);

        setLocalStorage("PENDING", newItem);

        const todoElement = createPendingTodoElement(newItem);
        pendingList.appendChild(todoElement);

        todoInput.value = "";
    }
}

function swapTask(parent, name) {
    const item = {
        id: parent.id,
        text: parent.firstChild.textContent,
    };

    setLocalStorage(name, item);

    if (name === "FINISHED") {
        pendingList.removeChild(parent);

        finishedList.appendChild(createFinishedTodoElement(item));
    } else {
        finishedList.removeChild(parent);

        pendingList.appendChild(createPendingTodoElement(item));
    }
}

function init() {
    todoInput.addEventListener("keypress", inputOnEnterKeyPress);

    TODO_DATA["PENDING"].map((item) => {
        const pendingElement = createPendingTodoElement(item);
        pendingList.appendChild(pendingElement);
    });

    TODO_DATA["FINISHED"].map((item) => {
        const finishedElement = createFinishedTodoElement(item);
        finishedList.appendChild(finishedElement);
    });
}

init();
