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

function createTodoElement(item, isPending = true) {
    const element = document.createElement("li");
    const span = document.createElement("span");
    const leftButton = document.createElement("button");
    const rightButton = document.createElement("button");

    leftButton.innerText = "❌";
    rightButton.innerText = isPending ? "✅" : "🔙";
    span.innerText = item.text;

    leftButton.addEventListener("click", () => {
        onClickRemoveButton(item.id, isPending ? "PENDING" : "FINISHED");
        isPending 
            ? pendingList.removeChild(element)
            : finishedList.removeChild(element);
    });
    rightButton.addEventListener("click", () => {
        onClickRemoveButton(item.id, isPending ? "PENDING" : "FINISHED");
        swapTask(element, isPending ? "FINISHED" : "PENDING");
    });

    element.id = item.id;
    element.appendChild(span);
    element.appendChild(leftButton);
    element.appendChild(rightButton);

    return element;
}

function inputOnEnterKeyPress(event) {
    if (event.key === "Enter" && event.keyCode === 13) {
        const newItem = createTodoItem(event.target.value);

        setLocalStorage("PENDING", newItem);

        const todoElement = createTodoElement(newItem);
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

        finishedList.appendChild(createTodoElement(item, false));
    } else {
        finishedList.removeChild(parent);

        pendingList.appendChild(createTodoElement(item));
    }
}

function init() {
    todoInput.addEventListener("keypress", inputOnEnterKeyPress);

    TODO_DATA["PENDING"].map((item) => {
        const pendingElement = createTodoElement(item);
        pendingList.appendChild(pendingElement);
    });

    TODO_DATA["FINISHED"].map((item) => {
        const finishedElement = createTodoElement(item, false);
        finishedList.appendChild(finishedElement);
    });
}

init();
