let depth = 6;

const btnGameMode = document.getElementById("game_mode"),
    btnOpponent = document.getElementById("opponent"),
    btnColor = document.getElementById("color"),
    btnDepth = document.getElementById("depth"),
    btnReset = document.getElementById("reset");

btnGameMode.onclick = () => {
    if (btnGameMode.textContent === "Chess") btnGameMode.innerHTML = "Chess960";
    else btnGameMode.textContent = "Chess";
};

btnOpponent.onclick = () => {
    if (btnOpponent.textContent === "Player") {
        btnOpponent.textContent = "Engine";
        btnColor.id = "";
        btnDepth.id = "";
    } else {
        btnOpponent.textContent = "Player";
        btnColor.id = "off";
        btnDepth.id = "off";
    }
};

btnColor.onclick = () => {
    if (btnColor.textContent === "White") btnColor.innerHTML = "Black";
    else btnColor.textContent = "White";
};

btnDepth.onclick = () => {
    ++depth;
    if (depth > 6) depth = 1;
    btnDepth.textContent = "Depth: " + depth;
};

btnReset.addEventListener('click', setBoard);