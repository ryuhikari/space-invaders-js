// Helpers functions
function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};

// Board
function Board(containerID, width, height) {
    var _this = this;
    this.container = document.getElementById(containerID);

    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("canvas-style");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.width = width;
    this.canvas.height = height,
    this.height = height;
    this.ratio = this.width / this.height;

    window.addEventListener("resize", function() {
        _this.resize(_this);
    });
    window.addEventListener("orientationchange", function() {
        _this.resize(_this);
    });
};

Board.prototype.resize = function (instance) {
    // Body
    document.body.style.height = window.innerHeight + "px";
    // Canvas
    var containerWidth = instance.container.offsetWidth;
    var containerHeight = instance.container.offsetHeight;
    var containerRatio = containerWidth / containerHeight;

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

Board.prototype.init = function () {
    this.container.appendChild(this.canvas);
    this.resize(this);
};

Board.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
};

Board.prototype.drawAlien = function(alien, alienType) {
    var sprite = alien.sprite[alienType];
    this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, alien.x + alien.offset, alien.y, alien.width, alien.height);
};

Board.prototype.drawShip = function (ship) {
    var sprite = ship.sprite;
    this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height, ship.x, ship.y, ship.width, ship.height);
};

Board.prototype.drawBullet = function (bullet) {
    this.ctx.save();
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    this.ctx.restore();
};

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

Board.prototype.gameOver = function(){
    var fontSize = this.height*0.15 + "px Arial";
    this.ctx.font = fontSize;
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "#33FF00";
    this.ctx.strokeText("Game Over", this.width*0.5, this.height*0.5);

    var msg;
    /*
    The following 5 lines code was adapted from a post at:
    http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
    Accessed: 2017-05-21
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

Board.prototype.gameOverLine = function(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#33FF00";
    this.ctx.moveTo(0, this.height*0.9);
    this.ctx.lineTo(this.width, this.height*0.9);
    this.ctx.stroke();
}

// Sprite
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// Alien
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

Alien.prototype.kill = function(){
    this.alive = false;
}

// Aliens
function aliensMove(aliens, dir, amount) {
    for (var i = 0; i < aliens.length; i++) {
        aliens[i][dir] += amount;
    }
}

// Ship
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

Ship.prototype.kill = function(hit){
    this.lives -= hit;
    this.lives = Math.max(this.lives, 0);

    if(this.lives <= 0){
        this.alive = false;
    }
};

Ship.prototype.newWave = function(){
    this.wave++;
};

// Bullet
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

Bullet.prototype.move = function () {
    this.y += this.vely * this.direction;
};

Bullet.prototype.kill = function(){
    this.alive = false;
};

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

    if(this.y < 0 || this.y > Board.height){
        this.kill();
    }
};

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

// InputHandeler
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

InputHandeler.prototype.isDown = function (code) {
    return this.down[code];
};

InputHandeler.prototype.isPressed = function (code) {
    if (this.pressed[code]) {
        delete this.pressed[code];
        return true;
    } else {
        return false;
    }
};
