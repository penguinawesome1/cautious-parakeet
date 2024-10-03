let depth = 6;

const btn_game_mode = document.getElementById("game_mode");
const btn_opponent = document.getElementById("opponent");
const btn_color = document.getElementById("color");
const btn_depth = document.getElementById("depth");

btn_game_mode.onclick = () => {
    if (btn_game_mode.innerHTML=="Chess") btn_game_mode.innerHTML = "Chess960";
    else btn_game_mode.innerHTML = "Chess";
}

btn_opponent.onclick = () => {
    if (btn_opponent.innerHTML=="Player") {
        btn_opponent.innerHTML = "Engine";
        btn_color.className = "btn1";
        btn_depth.className = "btn1";
    } else {
        btn_opponent.innerHTML = "Player";
        btn_color.className = "btn1_off";
        btn_depth.className = "btn1_off";
    }
}
btn_color.onclick = () => {
    if (btn_color.innerHTML=="White") btn_color.innerHTML = "Black";
    else btn_color.innerHTML = "White";
}

btn_depth.onclick = () => {
    btn_depth.innerHTML = "Depth: " + (depth % 6 + 1);
    ++depth;
}