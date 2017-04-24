var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasContainer = document.getElementById("canvas-container");

// GLOBALS
const SCALE_VALUE = 3;
const UFOS_PER_ROW = 11;
const N_ROWS = 6;

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
///                 Animation                ///
////////////////////////////////////////////////

var ufoMode = 0;
var counter = 0;

// Function update, to animate the game
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();

    /*
    ctx.scale(SCALE_VALUE, SCALE_VALUE);
    drawUfos();
    ctx.scale(1/SCALE_VALUE, 1/SCALE_VALUE);

    moveUfos();

    counter++;
    if(counter >=15){
        ufoMode++;
        if(ufoMode > 1){
            ufoMode = 0;
        }
        counter = 0;
    }
    */

    ID = requestAnimationFrame(update);
}

update();