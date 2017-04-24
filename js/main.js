var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasContainer = document.getElementById("canvas-container");

// GLOBALS
const SCALE_VALUE = 3;
const SCALE_VALUE_UFOS = 2;
const UFOS_PER_ROW = 11;
const N_ROWS = 5;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasRatio = canvasWidth / canvasHeight;

function resize() {
    const canvasContainerWidth = canvasContainer.offsetWidth;
    const canvasContainerHeight = canvasContainer.offsetHeight;
    const canvasContainerRatio = canvasContainerWidth / canvasContainerHeight;

    if (canvasContainerRatio >= canvasRatio) {
        canvas.width = (canvasWidth / canvasHeight) * canvasContainerHeight;
        canvas.height = canvasContainerHeight - 6;
    } else {
        canvas.width = canvasContainerWidth - 6;
        canvas.height = (canvasHeight / canvasWidth) * canvasContainerWidth;
    }
}

window.addEventListener("resize", resize);

window.addEventListener("orientationchange", resize);

resize();

////////////////////////////////////////////////
///                Player Ship               ///
////////////////////////////////////////////////

// Playership model, drawn through a matrix
const spaceship = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Ship drawing function, given a matrix
function drawShips(shipToDraw, color, offsetX, offsetY){
    for(var i = 0; i < shipToDraw.length; i++){
        for(var j = 0; j < shipToDraw[i].length; j++){
            if(shipToDraw[i][j]){
                ctx.fillStyle = color;
                ctx.fillRect(j + offsetX, i + offsetY, 1, 1);
            }
        }
    }
}

// Playership object constructor
function PlayerShip(){
    this.x = canvas.width/2;
    this.y = canvas.height-40;
    this.color = "#33FF00";

    this.draw = function(){
        ctx.scale(SCALE_VALUE, SCALE_VALUE);
        drawShips(spaceship, this.color, this.x/SCALE_VALUE, this.y/SCALE_VALUE);
        ctx.scale(1/SCALE_VALUE, 1/SCALE_VALUE);
    }
}

var ship = new PlayerShip();

//Control of playership with mouse (horizontal movement)
//canvas.style.cursor = "none";
canvas.addEventListener("mousemove", function(e){
    ship.x = e.pageX - canvas.offsetLeft - 25;
});

////////////////////////////////////////////////
///                 Enemy Ships              ///
////////////////////////////////////////////////

//Matrix with the enemy ships models

const ufo1a = [
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ufo1b = [
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ufo2a = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ufo2b = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ufo3a = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ufo3b = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ufo4a = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Variables containing the 4 types of ships and their alternative forms
const ufo1 = [ufo1a, ufo1b];
const ufo2 = [ufo2a, ufo2b];
const ufo3 = [ufo3a, ufo3b];
const ufo4 = [ufo4a, ufo4a];

const enemyUfos = [ufo1, ufo2, ufo3, ufo4];
const colorUfos = ["white", "white", "white", "red"];
const points = [10, 20, 30, 100];

// Enemy ships object constructor.
// The arrays above give the extra information needed to draw the ships
var UfoShip = function(ufo, color, offsetX, offsetY, points){
    this.x = offsetX;
    this.y = offsetY;
    this.mode = 0;
    this.ufo = ufo;
    this.height = 5;
    this.color = color;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.alive = true;
    this.dirX = 1;
    this.velX = 0.5;

    this.counter = 0;

    this.moveDownwards = function(){
        this.y += this.height;
        this.dirX *= -1;
    }

    this.move = function(){
        this.counter++;
        this.x = this.x + this.dirX*this.velX;
        if(this.counter >= 15){
            this.counter = 0;
            this.mode++;
        }
        if(this.mode > 1){
            this.mode = 0;
        }
    }

    this.die = function(){
        this.alive = false;
    }

    this.draw = function(){
        drawShips(this.ufo[this.mode], this.color, this.x, this.y);
    }
    /*// If enemy hits playership, game over automatically
    this.crash = function(player){

    }
    */
}

// Grid to place the enemy ships
var ufoRowPosition = [];
for(var i = 0; i<UFOS_PER_ROW; i++){
    ufoRowPosition.push(i*20+20);
}
var gridRows = [];
for(var i = 0; i<N_ROWS; i++){
    gridRows.push(i*10+30);
}

// Enemies array
var enemies = [];
var selectUfo = 0;
var enemyUfo;

for(var i = 0; i<gridRows.length; i++){
    for(var j = 0; j<ufoRowPosition.length; j++){
        enemyUfo = new UfoShip(enemyUfos[selectUfo], colorUfos[selectUfo], ufoRowPosition[j], gridRows[i], points[selectUfo]);
        enemies.push(enemyUfo);
    }
    if(i%2 - 1 ){
        selectUfo++;
    }
    if(selectUfo > 2){
        selectUfo = 0;
    }
}
 // Function to draw every alive enemy in the array
function drawUfos(){
    for(var i = 0; i<enemies.length; i++){
        if(enemies[i].alive){
            enemies[i].draw();
        }
    }
}

// Function to move every enemy as a block (when at least one of them gets to the edge of the board, move downwards and reverse direction)
var changeDir = 0;
function moveUfos(){
    for(var i = 0; i<enemies.length; i++){
        enemies[i].move();
        if(enemies[i].x >= canvas.width/SCALE_VALUE_UFOS-15 || enemies[i].x <= 0){
            changeDir = 1;
        }
    }
    if(changeDir){
        for(var j = 0; j<enemies.length; j++){
            enemies[j].moveDownwards();
        }
        changeDir = 0;
    }
}

////////////////////////////////////////////////
///                 Animation                ///
////////////////////////////////////////////////

var ufoMode = 0;
var counter = 0;

// Function update, to animate the game
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();

    ctx.scale(SCALE_VALUE_UFOS, SCALE_VALUE_UFOS);
    drawUfos();
    ctx.scale(1/SCALE_VALUE_UFOS, 1/SCALE_VALUE_UFOS);

    moveUfos();

    counter++;
    if(counter >=15){
        ufoMode++;
        if(ufoMode > 1){
            ufoMode = 0;
        }
        counter = 0;
    }

    ID = requestAnimationFrame(update);
}

update();