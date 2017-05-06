/**
 * Configuration
 */
const ufosPerRow = 11;
const numRows = 5;
const spaceX = 20;
const spaceY = 15;
const offsetX = 20;
const offsetY = 30;
const design = [0, 1, 1, 2, 2];

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasRatio = canvasWidth / canvasHeight;

var width;
var height;

var ship;
var enemies;
var bullets = [];

/**
 * Control of playership with mouse (horizontal movement)
 */
//canvas.style.cursor = "none";
canvas.addEventListener("mousemove", function(e){
    ship.x = e.pageX - canvas.offsetLeft - 25;
});

/**
 * Control of playership's shots
 */
canvas.addEventListener("click", function(e){
    e.preventDefault();
    var shot = new Bullet(ship.x + ship.centerX*scale, ship.y);
    bullets.push(shot);
});

/**
 * Function setup: initialize the game.
 */
function setup(){
	resize();

	ship = new PlayerShip();
	enemies = createEnemies(ufosPerRow, numRows, spaceX, spaceY, offsetX, offsetY, design);

}

/*
 * Function update: animate the game.
 */
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();
    drawUfos(enemies);
    moveUfos(enemies);
    killUfos(enemies);
    shoot();

    ID = requestAnimationFrame(update);
}

setup();

update();