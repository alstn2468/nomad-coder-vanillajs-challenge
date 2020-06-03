// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/

const text = document.querySelector("h2");

const superEventHandler = {
    onMouseOver: (event) => {
        text.innerHTML = "The mouse is here!";
        text.style.color = colors[0];
    },
    onMouseLeave: (event) => {
        text.innerHTML = "The mouse is gone!";
        text.style.color = colors[1];
    },
    onWindowResize: (event) => {
        text.innerHTML = "You just resized!";
        text.style.color = colors[2];
    },
    onMouseDown: (event) => {
        if (event.which === 3) {
            text.innerHTML = "That was a light click!";
            text.style.color = colors[3];
        }
    },
};

text.addEventListener("mouseover", superEventHandler.onMouseOver);
text.addEventListener("mouseleave", superEventHandler.onMouseLeave);
window.addEventListener("resize", superEventHandler.onWindowResize);
document.addEventListener("mousedown", superEventHandler.onMouseDown);
