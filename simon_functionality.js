let game_seq = [];
let user_seq = [];

let btn = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Key pressed! -> Game started");
        started = true;
        levelup();
    }
});

function gameFlash(button) {
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

function userFlash(button) {
    button.classList.add("userflash");
    setTimeout(function () {
        button.classList.remove("userflash");
    }, 250);
}

function levelup() {
    user_seq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let random_index = Math.floor(Math.random() * 4);
    let random_color = btn[random_index];
    let random_button = document.querySelector(`.${random_color}`);

    if (!random_button) {
        console.error(`Button with class "${random_color}" not found!`);
        return;
    }

    game_seq.push(random_color);

    // 👇 Console logs for help during gameplay
    console.log("Current Sequence:", game_seq.join(" → "));
    console.log("Just Added:", random_color);

    gameFlash(random_button);
}

function checkAns(idx) {
    if (user_seq[idx] === game_seq[idx]) {
        if (user_seq.length === game_seq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let button = this;
    console.log("Clicked:", button.id);
    userFlash(button);

    let userColor = button.getAttribute("id");
    user_seq.push(userColor);

    checkAns(user_seq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let button of allbtns) {
    button.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    game_seq = [];
    user_seq = [];
    level = 0;
}
