// Helpers functions
function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};

/**
 * Canvas object
 * @param       {string} containerID - Canvas HTML id
 * @param       {number} width       - Canvas width
 * @param       {number} height      - Canvas height
 * @constructor
 */
function Board(containerID, width, height) {
    // save instance reference
    var _this = this;

    // Get container to hold the canvas
    this.container = document.getElementById(containerID);

    // Create canvas and add it to the container
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("canvas-style");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.width = width;
    this.canvas.height = height,
    this.height = height;
    this.ratio = this.width / this.height;

    // Response to resize events
    window.addEventListener("resize", function() {
        _this.resize(_this);
    });
    // Response to orientationchange events
    window.addEventListener("orientationchange", function() {
        _this.resize(_this);
    });
};

/**
 * Resize canvas to use all available space preserving aspect ratio
 * @param  {Object} instance - Canvas reference
 */
Board.prototype.resize = function (instance) {
    // Body
    document.body.style.height = window.innerHeight + "px";
    // Canvas
    var containerWidth = instance.container.offsetWidth;
    var containerHeight = instance.container.offsetHeight;
    var containerRatio = containerWidth / containerHeight;

    // Adjust width or height based on aspect ratio
    if (containerRatio >= instance.ratio) {
        instance.width = Math.round(instance.ratio * containerHeight);
        instance.canvas.width = instance.width;

        instance.height = containerHeight - 6;
        instance.canvas.height = instance.height;
    } else {
        instance.width = containerWidth - 6;
        instance.canvas.width = instance.width;

        instance.height = Math.round(1 / instance.ratio * containerWidth);
        instance.canvas.height = instance.height;
    }
};

/**
 * Initialize canvas creation
 */
Board.prototype.init = function () {
    this.container.appendChild(this.canvas);
    this.resize(this);
};

/**
 * Clear canvas to redraw
 */
Board.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
};

/**
 * Draw enemy alien
 * @param  {Object} alien     - Enemy alien
 * @param  {number} alienType - Number to specify which alien to display
 */
Board.prototype.drawAlien = function(alien, alienType) {
    var sprite = alien.sprite[alienType];
    this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, alien.x + alien.offset, alien.y, alien.width, alien.height);
};

/**
 * Draw user cannon on canvas
 * @param  {Object} ship - Cannon object that holds user info
 */
Board.prototype.drawShip = function (ship) {
    var sprite = ship.sprite;
    this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, ship.x, ship.y, ship.width, ship.height);
};

/**
 * Draw alien and user bullets
 * @param  {Object} bullet - Bullet to draw
 */
Board.prototype.drawBullet = function (bullet) {
    this.ctx.save();
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    this.ctx.restore();
};

/**
 * Property that holds info to show on canvas
 * @param  {Object} ship - user cannon
 */
Board.prototype.gameInfo = function(ship){
    var fontSize = board.height*0.03 + "px Arial";
    this.ctx.font = fontSize;
    var textScore = "Score: " + ship.score;
    var textWave = "Wave: " + ship.wave;
    var textLives = "Lives: " + ship.lives;
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#33FF00";
    this.ctx.fillText(textScore, this.width*0.25, this.height*0.05);
    this.ctx.fillText(textWave, this.width*0.5, this.height*0.05);
    this.ctx.fillText(textLives, this.width*0.75, this.height*0.05);
}

/**
 * Draw Game Over text on canvas
 */
Board.prototype.gameOver = function(){
    var fontSize = this.height*0.15 + "px Arial";
    this.ctx.font = fontSize;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#33FF00";
    this.ctx.strokeText("Game Over", this.width*0.5, this.height*0.5);

    var msg;
    /**
     * The following 5 lines code was adapted from a post at:
     * http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
     * Accessed: 2017-05-21
     */
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        msg = "To restart, touch the screen";
    }else{
        msg = "To restart, press R";
    }

    fontSize = this.height*0.05 + "px Arial";
    this.ctx.font = fontSize;
    this.ctx.fillText(msg, this.width*0.5, this.height*0.7);
}

/**
 * Draw  a line to show the limit between aliens and ship
 */
Board.prototype.gameOverLine = function(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#33FF00";
    this.ctx.moveTo(0, this.height*0.9);
    this.ctx.lineTo(this.width, this.height*0.9);
    this.ctx.stroke();
}

/**
 * Object to hold info about the piece of the original sprite
 * @param       {Object} img    - Image to crop a piece from
 * @param       {number} x      - Coordinate
 * @param       {number} y      - Coordinate
 * @param       {number} width  - horixontal section to crop from x position
 * @param       {number} height - vertical section to crop from y position
 * @constructor
 */
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

/**
 * Object to hold Sprite and position of each alien
 * @param       {Object} sprite - Sprite object that holds an are of the original Image
 * @param       {number} x      - x position on canvas
 * @param       {number} y      - y position on canvas
 * @param       {number} offset - horizontal offset to center the image on each column
 * @param       {number} width  - final width of the sprite
 * @param       {number} height - final height of the sprite
 * @param       {number} points - points to give to the user if the alien is killed
 * @constructor
 */
function Alien(sprite, x, y, offset, width, height, points) {
    this.sprite = sprite,
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.points = points;
};

/**
 * Indicate that the alien is killed to not be drawn on canvas
 */
Alien.prototype.kill = function(){
    this.alive = false;
}

/**
 * Move the whole aliens
 * @param  {Object[]} aliens - Array that holds all the alive aliens
 * @param  {number}   dir    - (+1) right and (-1) left
 * @param  {number}   amount - number of pixels to move
 */
function aliensMove(aliens, axis, amount) {
    for (var i = 0; i < aliens.length; i++) {
        aliens[i][axis] += amount;
    }
}

/**
 * User cannon
 * @param       {Object} sprite - Sprite object that holds an are of the original Image
 * @param       {number} x      - x position on canvas
 * @param       {number} y      - y position on canvas
 * @param       {number} width  - final width to draw
 * @param       {number} height - final height to draw
 * @param       {number} lives  - number of lives left
 * @constructor
 */
function Ship(sprite, x, y, width, height, lives) {
    this.sprite = sprite,
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.lives = lives;
    this.score = 0;
    this.wave = 1;
};

/**
 * Kill the user cannon
 * @param  {number} hit - number of lives to remove from the user
 */
Ship.prototype.kill = function(hit){
    this.lives -= hit;
    this.lives = Math.max(this.lives, 0);

    if(this.lives <= 0){
        this.alive = false;
    }
};

/**
 * Increase wave info
 */
Ship.prototype.newWave = function(){
    this.wave++;
};

/**
 * Bullet object
 * @param       {number} x         - horizontal position
 * @param       {number} y         - vertical position
 * @param       {string} color     - color to show
 * @param       {number} direction - vertical direction to move the bullet
 * @constructor
 */
function Bullet(x, y, color, direction) {
    this.x = x;
    this.y = y;
    this.vely = 8;
    this.width = 3;
    this.height = 7;
    this.color = color;
    this.direction = direction;
    this.alive = true;
};

/**
 * Move the bullet
 */
Bullet.prototype.move = function () {
    this.y += this.vely * this.direction;
};

/**
 * Kill the bullet
 */
Bullet.prototype.kill = function(){
    this.alive = false;
};

/**
 * Check if the bullet hits alien or user cannon
 * @param  {Object[]} aliens - Array of alive aliens
 * @param  {Object}   ship   - user cannon
 */
Bullet.prototype.checkHit = function(aliens, ship){
    var nextPosition = this.y + this.height/2 + this.vely*this.direction;

    if(this.direction === -1){ // Ship shot, bullets upwards
        for(var j = 0; j<aliens.length; j++){
            if(this.x >= aliens[j].x && this.x + this.width <= aliens[j].x + aliens[j].width){
                if(nextPosition <= aliens[j].y + aliens[j].height && nextPosition >= aliens[j].y){
                    this.kill();
                    ship.score += aliens[j].points;
                    aliens[j].kill();
                    break;
                }
            }
        }
    }else if(this.direction === 1){ // Alien shot, bullets downwards
        if(this.x >= ship.x && this.x + this.width <= ship.x + ship.width){
            if(nextPosition <= ship.y + ship.height && nextPosition >= ship.y + ship.height/2){
                ship.kill(1);
                this.kill();
            }
        }
    }

    // Erase bullet when it goes outside the canvas
    if(this.y < 0 || this.y > Board.height){
        this.kill();
    }
};

/**
 * Draw all aliens
 */
function displayAliens(){
    moveFreqInit--;
    moveFreq = moveFreqInit;
    for (var i = 0; i < rowPattern.length; i++) {
        var alienType = rowPattern[i];
        var alienPoints = alienScore[i];
        var alien = alienSprite[alienType];
        var width = alien[0].width * columnWidth * 2 / maxSpriteWidth;
        var height = alien[0].height / alien[0].width * width;
        var offsetColumn = (columnWidth * 2 - width)*0.5;
        for (var j = 0; j < numAlienColumns; j++) {
            aliens.push(new Alien(alien, (columnWidth*3)*j, board.height*0.1 + (height*1.5)*i, offsetColumn, width, height, alienPoints));
        }
    }
};

/**
 * Help to detect key inputs
 * @constructor
 */
function InputHandeler() {
    this.down = {};
    this.pressed = {};

    var _this = this;
    document.addEventListener("keydown", function(event) {
        _this.down[event.keyCode] = true;
    });
    document.addEventListener("keyup", function(event) {
        delete _this.down[event.keyCode];
        _this.pressed[event.keyCode] = true;
    });
};

/**
 * Check if user holds a key
 * @param  {number} code - keycode
 * @return {boolean}     - true if user holds the key
 */
InputHandeler.prototype.isDown = function (code) {
    return this.down[code];
};

/**
 * Check if user press and release a key
 * @param  {number} code - keycode
 * @return {boolean}      - true if user press the key
 */
InputHandeler.prototype.isPressed = function (code) {
    if (this.pressed[code]) {
        delete this.pressed[code];
        return true;
    } else {
        return false;
    }
};
