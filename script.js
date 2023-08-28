
canvas = document.getElementById('canvas');
context = canvas.getContext("2d");
canvas.width = window.innerWidth - 20;
ctx = canvas.width;
cty = canvas.height;

const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');

const music = document.getElementById('music');
const musicDesk = document.getElementById('music-desk');

// All vars
var x = 150;
var y = 150;
var t = Date.now();
var speed = 500;
var coinx = Math.random() * (400 - 50);
var coiny = Math.random() * (500 - 50);
//var cs = ['48','45','46','49','50'];
//var coinsize = Math.floor(Math.random() * cs);
var score = 0;
let dir;

const player = new Image();
player.src = './assets/img/Player2.webp';
const coin = new Image();
coin.src = './assets/img/Coin.webp';
const BGmusic = new Audio('./assets/sounds/sgt.mp3');

var playing = true;
const coinGrab = new Audio('./assets/sounds/coin.mp3');

//main
window.onload = function () {
    function draw() {
        //time and fps settings
        var timePassed = (Date.now() - t) / 1000;
        t = Date.now();
        var fps = Math.round(1 / timePassed);
        //clear()
        context.clearRect(0, 0, ctx, cty);
        //Coins Draw
        context.beginPath();
        context.drawImage(coin, coinx, coiny, 45, 45);
        context.fillStyle = "red";
        context.fill();
        //Text 
        context.beginPath();
        context.font = '1rem Arial';
        context.fillStyle = 'blue';
        context.fillText("SCORE: " + score, ctx - 100, 30);
        context.fill();
        context.fillStyle = "black";
        context.fillText("FPS: " + fps, ctx - 380, 30);
        context.fillText("Speed: " + speed, ctx - 320, 30);
        context.fill();
        //Player 
        context.beginPath();
        context.drawImage(player, x, y, 60, 60);
        context.stroke();
        //Coins random draw
        if (coinx + 45 >= x && coinx <= x + 60 &&
            coiny + 45 >= y && coiny <= y + 60) {
            score++; speed += 13;
            coinx = Math.random() * (ctx - 50); coiny = Math.random() * (cty - 50);
            coinGrab.play();
        }

        //Key Functions
        canvas.focus();


        down.addEventListener('touchstart', function () { dir = 0; });
        up.addEventListener('touchstart', function () { dir = 1; });
        right.addEventListener('touchstart', function () { dir = 2; });
        left.addEventListener('touchstart', function () { dir = 3; });
        


        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowDown') { dir = 0; }
            else if (event.key === 'ArrowUp') { dir = 1; }
            else if (event.key === 'ArrowRight') { dir = 2; }
            else if (event.key === 'ArrowLeft') { dir = 3; }
        });

        
        
        if (dir == 0 && y + 80 < cty) {
            y += (speed * timePassed);
        }
        else if (dir == 1 && y >= 10) {
            y -= (speed * timePassed);
        }
        else if (dir == 2 && x + 70 < ctx) {
            x += (speed * timePassed);
        }
        else if (dir == 3 && x >= 10) {
            x -= (speed * timePassed);
        }

        window.requestAnimationFrame(draw);
    }
    draw();
    music.onclick = function () {
        if (playing) {
            BGmusic.play();
            playing = false;
        }
        else { BGmusic.pause(); playing = true; }
    }
    musicDesk.onclick = function () {
        if (playing) {
            BGmusic.play();
            playing = false;
        }
        else { BGmusic.pause(); playing = true; }
    }
    //setInterval(draw,160);
}
$("#screen").hide();
$(window).on("load", function l() {
    $(".container").fadeOut(400);
    setTimeout(function () {
        $("#screen").show();
    }, 405)
    window.requestAnimationFrame(l);
})