/**
 * Canvas
 */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasContainer = document.getElementById("canvas-container");

/**
 * Configuration
 */
const SCALE_VALUE = 3;
const SCALE_VALUE_UFOS = 2;
const UFOS_PER_ROW = 11;
const N_ROWS = 5;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasRatio = canvasWidth / canvasHeight;

/**
 * Ship drawing function, given a matrix
 */
function drawShip(shipToDraw, color, offsetX, offsetY){
    for(var i = 0; i < shipToDraw.length; i++){
        for(var j = 0; j < shipToDraw[i].length; j++){
            if(shipToDraw[i][j]){
                ctx.fillStyle = color;
                ctx.fillRect(j + offsetX, i + offsetY, 1, 1);
            }
        }
    }
}

/**
 * Playership object constructor
 */
function PlayerShip(){
    this.x = canvas.width/2;
    this.y = canvas.height;
    this.color = "#33FF00";
    this.centerX = 9;
    this.centerY = 5;

    this.spaceship = [
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

    this.draw = function(){
    	ctx.save();
        ctx.scale(SCALE_VALUE, SCALE_VALUE);
        drawShip(this.spaceship, this.color, this.x/SCALE_VALUE, this.y/SCALE_VALUE);
        ctx.restore();
    }
}

var ship = new PlayerShip();

/**
 * Control of playership with mouse (horizontal movement)
 */
//canvas.style.cursor = "none";
canvas.addEventListener("mousemove", function(e){
    ship.x = e.pageX - canvas.offsetLeft - 25;

});

/**
 * Enemy ships
 */

//Matrices with the enemy ships models

const ufoModel1 = [
	[
	    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],

	[
	    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
];

const ufoModel2 = [
	[
	    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],

	[
	    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
	    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
];

const ufoModel3 = [
	[
	    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
	    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],

	[
	    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
	    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
	    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
];

const ufoModel4 = [
	[
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
	    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
	    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
];

/**
 * Ufo type constructor to hold the model, color and points of each enemy
 */
function UfoType(model, color, points) {
	this.model = model;
	this.color = color;
	this.points = points;
}

// Create all the enemies
const ufo1 = new UfoType(ufoModel1, "white", 10);
const ufo2 = new UfoType(ufoModel2, "white", 20);
const ufo3 = new UfoType(ufoModel3, "white", 30);
const ufo4 = new UfoType(ufoModel4, "red", 100);

// Hold the enemies in an array
const enemyUfos = [ufo1, ufo2, ufo3, ufo4];

/**
 * Enemy ships object constructor
 *
 * ufo: array with 2 ufo models to draw
 * color: filling color
 * offsetX: X position on canvas
 * offsetY: Y position on canvas
 * points: value to increment the player score if killed
 */
var UfoShip = function(ufo, color, offsetX, offsetY, points){
    this.x = offsetX;
    this.y = offsetY;
    this.mode = 0;
    this.ufo = ufo;
    this.height = 5;
    this.color = color;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.width = 17;

    this.dirX = 1;
    this.velX = 0.5;

    this.frames = 15;
    this.counter = 0;

    this.dead = false;

    this.moveDownwards = function(){
        this.y += this.height;
        this.dirX *= -1;
    }

    this.move = function(){
        this.counter++;
        this.x = this.x + this.dirX*this.velX;
        if (this.counter >= this.frames){
            this.counter = 0;
            this.mode++;
        }
        if (this.mode > 1){
            this.mode = 0;
        }
    }

    this.draw = function(){
        drawShip(this.ufo[this.mode], this.color, this.x, this.y);
    }

    this.kill = function(){
    	this.dead = true;
    }
    /*// If enemy hits playership, game over automatically
    this.crash = function(player){

    }
    */
}

/*
 * Bullet object
 *
 * x: initial horizontal position
 * y: initial vertical position
 */

function Bullet(x, y){
	this.x = x;
	this.y = y;
	this.r = 2;
	this.color = "#00FFF0";
	this.hit = false;
	this.speed = 4;
	this.dead = false;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	this.alienHit = function(ufo){
		var nextPosition = this.y + this.r + this.speed;
		if(this.x >= ufo.x*SCALE_VALUE_UFOS && this.x <= ufo.x*SCALE_VALUE_UFOS + ufo.width*SCALE_VALUE_UFOS){
			if(nextPosition >= ufo.y*SCALE_VALUE_UFOS && nextPosition <= ufo.y*SCALE_VALUE_UFOS + ufo.height*SCALE_VALUE_UFOS){
				this.hit = true;
			}
		}
		return this.hit;
	}

	this.move = function(){
		this.y -= this.speed;
	}

	this.kill = function(){
		this.dead = true;
	}
}

var bullets = [];

/**
 * Control of playership's shots
 */
canvas.addEventListener("click", function(e){
	var shot = new Bullet(ship.x + ship.centerX*SCALE_VALUE, ship.y);
	bullets.push(shot);
});