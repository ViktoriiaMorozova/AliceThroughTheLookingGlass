let cover = document.getElementById('section1');
let cover2 = document.getElementById('section2');
let game = document.getElementById('section3');
let winner = document.getElementById('section4');
let gameOver = document.getElementById('section5');
let aliceWon = false;
let aliceLost = false;

var then = Date.now();
var canvas;
var ctx;

// This function creates canvas and adds it to a div element.
function initCanvas() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;
    canvas.style = "align-self: center";
    document.getElementById("canvasHost").appendChild(canvas);
}

// This object plays background music in the loop.
let backgroundMusic = new Audio("sound/backgroundMusic.mp3");
// When this variable is set to true, background music
// does not start over when it was stopped.
let dontRepeatBackgroundMusic = false;

// This function is needed to keep playing background music.
let repeatBackgroundMusic = function() {
    if (!dontRepeatBackgroundMusic) {
        playBackgroundMusic();
    }
}

// This function plays background music
let playBackgroundMusic = function() {
    dontRepeat = false;
    // .then(repeat) calls repeat() function when playback is finished 
    backgroundMusic.play().then(repeat);
}

// This function stops playing background music.
let stopBackgroundMusic = function() {
    dontRepeatBackgroundMusic = true;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// This function plays the 'aliceLost' sound.
let playAliceLost = function () {
    new Audio("sound/aliceLost.mp3").play();
}

// This function plays the 'aliceWon' sound.
let playAliceWon = function () {
    new Audio("sound/aliceWon.mp3").play();
}

// When the page is loaded, canvas is initialised and main loop is started.
document.addEventListener("DOMContentLoaded", function (event) {
    initCanvas();
    requestAnimationFrame(main);
});

function hideSection (sectionId) {
     document.getElementById(sectionId).style.display = 'none';
 }

 function showSection (sectionId) {
     document.getElementById(sectionId).style.display = 'flex';
 }

// Background image
let backgrReady = false;
let backgrImage = new Image();
backgrImage.onload = function () {
    backgrReady = true;
};
backgrImage.src = "images/background.png";

//Alice
let aliceReady = false;
let aliceImage = new Image();
aliceImage.onload = function () {
    aliceReady = true;
};
aliceImage.src = "images/sprite_Alice.png";

// figure1
let figure1Ready = false;
let figure1Image = new Image();
figure1Image.onload = function () {
    figure1Ready = true;
};
figure1Image.src = "images/figure_1.png";

// figure2
let figure2Ready = false;
let figure2Image = new Image();
figure2Image.onload = function () {
    figure2Ready = true;
};
figure2Image.src = "images/figure_2.png";

// figure3
let figure3Ready = false;
let figure3Image = new Image();
figure3Image.onload = function () {
    figure3Ready = true;
};
figure3Image.src = "images/figure_3.png";

// figure4
let figure4Ready = false;
let figure4Image = new Image();
figure4Image.onload = function () {
    figure4Ready = true;
};
figure4Image.src = "images/figure_4.png";

// figure5
let figure5Ready = false;
let figure5Image = new Image();
figure5Image.onload = function () {
    figure5Ready = true;
};
figure5Image.src = "images/figure_5.png";

// figure6
let figure6Ready = false;
let figure6Image = new Image();
figure6Image.onload = function () {
    figure6Ready = true;
};
figure6Image.src = "images/figure_6.png";

// This function updates positions of game objects
// using time that past since the previous update.
let update = function(delta) {
    updateAlice(delta);
    updateFigure(figure1, delta);
    updateFigure(figure2, delta);
    updateFigure(figure3, delta);
    updateFigure(figure4, delta);
    updateFigure(figure5, delta);
    updateFigure(figure6, delta);
}

// The main game loop
let main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);

    render();
    then = now;
    // If Alice wins, switch to the section 4 and play the winning sound
    if (aliceWon) {
        hideSection("section3");
        showSection("section4");
        stopBackgroundMusic();
        playAliceWon();
    }
    // If a figure catches Alice, switch to the section 5 and play the losing sound.
    else if (aliceLost) {
        hideSection("section3");
        showSection("section5");
        stopBackgroundMusic();
        playAliceLost();
    }
    else {
        requestAnimationFrame(main);
    }
};

let drawAlice = function() {
    let y0 = alice.heading * 0.25 * aliceImage.height;
    let h = 0.25 * aliceImage.height;
    let x0 = alice.animation * aliceImage.width / 3.0;
    let w = aliceImage.width / 3.0;
    ctx.drawImage(aliceImage, x0, y0, w, h, alice.x, alice.y, alice.w, alice.h);    

}

// Draw everything in the main render function
let render = function () {
    if (backgrReady) {
        ctx.drawImage(backgrImage, 0, 0, backgrImage.width, backgrImage.height, 0, 0, 600, 600);
    }
    if (aliceReady) {
        drawAlice();
    }
    if (figure1Ready) {
        ctx.drawImage(figure1Image, 0, 0, figure1Image.width, figure1Image.height, figure1.x, figure1.y, figure1.w, figure1.h);
    }
    if (figure2Ready) {
        ctx.drawImage(figure2Image, 0, 0, figure2Image.width, figure2Image.height, figure2.x, figure2.y, figure2.w, figure2.h);
    }
    if (figure3Ready) {
        ctx.drawImage(figure3Image, 0, 0, figure3Image.width, figure3Image.height, figure3.x, figure3.y, figure3.w, figure3.h);
    }
    if (figure4Ready) {
        ctx.drawImage(figure4Image, 0, 0, figure4Image.width, figure4Image.height, figure4.x, figure4.y, figure4.w, figure4.h);
    }
    if (figure5Ready) {
        ctx.drawImage(figure5Image, 0, 0, figure5Image.width, figure5Image.height, figure5.x, figure5.y, figure5.w, figure5.h);
    }
    if (figure6Ready) {
        ctx.drawImage(figure6Image, 0, 0, figure6Image.width, figure6Image.height, figure6.x, figure6.y, figure6.w, figure6.h);
    }
};

// This function updates Alice's position using time that past since the previous update.
let updateAlice = function(delta) {
    if (keysDown["ArrowUp"]) {
        alice.y -= alice.speed * delta;
        alice.heading = 3;
    }
    else if (keysDown["ArrowDown"]) {
        if (alice.y < 550) {
            alice.y += alice.speed * delta;
        }
        alice.heading = 0;
    }
    else if (keysDown["ArrowLeft"]) {
        if (alice.x > 0) {
            alice.x -= alice.speed * delta;
        }
        alice.heading = 1;
    }
    else if (keysDown["ArrowRight"]) {
        if (alice.x < 550) {
            alice.x += alice.speed * delta;
        }
        alice.heading = 2;
    }
    // Check if Alice has won.
    if (alice.y < 3) {
        aliceWon = true;
    }
};

// This function checks whether Alice's rectangle overlaps with figure's rectangle.
let catchAlice = function(figure, x, y) {
    if (figure.x <= x && x <= (figure.x + figure.w) && figure.y <= y && y <= (figure.y + figure.h)) {
        aliceLost = true;
    }
}

// This function moves a figure using time that past since the previous update.
let updateFigure = function(figure, delta) {
    if (figure.direction == 0) {
        if (figure.x > 550) {
            figure.direction = 1;
        }
        else {
            figure.x += figure.speed * delta;
        }
    }
    if (figure.direction == 1) {
        if (figure.x < 1) {
            figure.direction = 0;
        }
        else {
            figure.x -= figure.speed * delta;
        }
    }
    catchAlice(figure, alice.x, alice.y);
    catchAlice(figure, alice.x + alice.w, alice.y + alice.h);
};

// Game objects
let alice = {
    heading: 0,
    animation: 1,
    speed: 256, 
    x: 275,  
    y: 540,  
    w: 50,
    h: 50,
    speed: 50
};
let figure1 = {
    x: 10,
    y: 0,
    w: 50,
    h: 75,
    direction: 0,
    speed: 30
};
let figure2 = {
    x: 250,
    y: 75,
    w: 50,
    h: 75,
    direction: 1,
    speed: 10
};
let figure3 = {
    x: 100,
    y: 150,
    w: 50,
    h: 75,
    direction: 0,
    speed: 40
};
let figure4 = {
    x: 350,
    y: 225,
    w: 50,
    h: 75,
    direction: 1,
    speed: 25
};
let figure5 = {
    x: 30,
    y: 300,
    w: 50,
    h: 75,
    direction: 0,
    speed: 30
};
let figure6 = {
    x: 450,
    y: 375,
    w: 50,
    h: 75,
    direction: 1,
    speed: 20
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    console.log(e.key + " down")
    keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
    console.log(e.key + " up")
    delete keysDown[e.key];
}, false);
