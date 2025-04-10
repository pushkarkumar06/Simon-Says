let game_seq = [];
let user_seq = [];

let btn = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("key pressed ! -> game started");
        started = true;

        levelup();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);

}

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


function levelup() {
    user_seq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let random_index = Math.floor(Math.random() * 4); // <-- FIXED
    let random_color = btn[random_index];
    let random_botton = document.querySelector(`.${random_color}`);
    game_seq.push(random_color);
    console.log("Current Sequence:", game_seq.join(" → "));
    gameFlash(random_botton);
}


function checkAns(idx) {

    if (user_seq[idx] === game_seq[idx]) {
        // console.log("same value");
        if (user_seq.length == game_seq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> press any key to start `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}


function btnPress() {
    let btn = this
    console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    user_seq.push(userColor);

    checkAns(user_seq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    game_seq = [];
    user_seq = [];
    level = 0;
}