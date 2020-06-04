// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const colors = ["#E1AD01", "#B574EC", "#2A9DF4"];

const body = document.querySelector("body");
body.style.background = colors[0];

const hello = document.createElement("h1");
hello.innerHTML = "Hello!";
hello.style.color = "#FFFFFF";

body.appendChild(hello);

window.addEventListener("resize", (event) => {
    const { innerWidth, screenX } = event.target;

    if (screenX * 0.5 >= innerWidth) {
        body.style.background = colors[2];
    } else if (screenX * 0.7 >= innerWidth) {
        body.style.background = colors[1];
    } else {
        body.style.background = colors[0];
    }
});
