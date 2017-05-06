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
 * Function UfoType: Ufo type constructor to hold the model, color and points of each enemy.
 *
 * Inputs:
 *	model: type of alien ship. Array containing the matrices with both forms of the alien ship.
 *	color: color code of the alien ship.
 *	points: points to add to the score when the alien ship dies.
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
 * Function UfoShip: enemy ships object constructor.
 *
 * Inputs:
 * 	ufo: array with 2 ufo models to draw.
 * 	color: filling color.
 * 	offsetX: X position on canvas.
 * 	offsetY: Y position on canvas.
 *	points: value to increment the player score if killed.
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

/**
 * Function creatEnemies: draw the enemy ships.
 *
 * Inputs:
 *	ufosPerRow: number of enemy ships in each row.
 *	numRows: number of rows to draw.
 *	spaceX: initial position of each enemy ship in the x-axis.
 * 	spaceY: initial position of each enemy ship in the y-axis.
 *	offsetX: offset distance in the x-axis.
 *	offsetY: offset distance in the y-axis.
 *	design: array containing the type of enemy ship for each row.
 *
 * Output:
 *	enemies: array containing every enemy ship, with their position in the matrix that is their display.
 */
function createEnemies(ufosPerRow, numRows, spaceX, spaceY, offsetX, offsetY, design) {
    var enemies = [];

    for(var i = 0; i < numRows; i++){
        var positionY = i * spaceY + offsetY
        var selectUfo = design[i];
        for(var j = 0; j < ufosPerRow; j++){
            var positionX = j * spaceX + offsetX;
            var enemyUfo = new UfoShip(enemyUfos[selectUfo].model, enemyUfos[selectUfo].color, positionX, positionY, enemyUfos[selectUfo].points);
            enemies.push(enemyUfo);
        }
    }

    return enemies;
}

/**
 * Function drawUfos: draw every alive enemy in the array enemies.
 *
 * Input:
 *  enemies: array containing every alive alien ship.
 */
function drawUfos(enemies){
    ctx.save();
    ctx.scale(scale, scale);

    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
    }

    ctx.restore();
}

/**
 * Function moveUfos: move every alive enemy in the array enemies as a block.
 * 	(When at least one enemy gets to the edge of the board, the block moves
 * 	down and reverses direction).
 *
 * Input:
 * 	enemies: array containing every alive alien ship.
 */
var changeDir = 0;
function moveUfos(enemies){
    for (var i = 0; i < enemies.length; i++){
        enemies[i].move();
        if (enemies[i].x >= canvas.width/scale-15 || enemies[i].x <= 0){
            changeDir = 1;
        }
    }
    if (changeDir){
        for(var j = 0; j<enemies.length; j++){
            enemies[j].moveDownwards();
        }
        changeDir = 0;
    }
}

/**
 * Function killUfos: remove dead aliens.
 *
 * Input:
 *	enemies: array containing every enemy ship still in game.
 */
function killUfos(enemies){
    for(var i = enemies.length - 1; i>=0; i--){
        if(enemies[i].dead){
            enemies.splice(i, 1);
        }
    }
}