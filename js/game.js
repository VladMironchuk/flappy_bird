const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const restart = document.querySelector('.restart')

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";


// Звуковые файлы
const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap;
let speed;

switch(localStorage.getItem('dif')){
    case 'easy':
        gap = 90;
        speed = 1;
        break;
    case 'medium':
        gap = 90;
        speed = 2;
        break;
    case 'hard':
        gap = 70;
        speed = 2;
        break;
    case 'insane':
        gap = 70;
        speed = 4;
        break;
}
// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 45;
 fly.play();
}

// Создание блоков
let pipe = [];  

pipe[0] = {
 x : cvs.width,
 y : 0
}

let score = 0;
// Позиция птички
let xPos = 10;
let yPos = 250;
let grav = 1.5;
let isPaused = false

function draw() {
    if(isPaused) return
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x-=speed;

        if(pipe[i].x == 120) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            if(localStorage.getItem('maxScore')){
                if(score > +localStorage.getItem('maxScore')) localStorage.setItem('maxScore', score)
            }
            else localStorage.setItem('maxScore', score)
            isPaused = !isPaused // Перезагрузка страницы
            restart.style.visibility = "visible"
        }

        if(pipe[i].x == 4) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    ctx.fillText("Max: " + (localStorage.getItem('maxScore') || 0), 180, cvs.height - 20);

    const req = requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
restart.onclick = () => location.reload()