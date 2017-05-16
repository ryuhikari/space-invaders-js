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

// Sprite
function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// Alien
function Alien(sprite, x, y, offset, width, height) {
    this.sprite = sprite,
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.width = width;
    this.height = height;
};

// Aliens
function aliensMove(aliens, dir, amount) {
    for (var i = 0; i < aliens.length; i++) {
        aliens[i][dir] += amount;
    }
}

// Alien
function Ship(sprite, x, y, width, height) {
    this.sprite = sprite,
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

// Bullet
function Bullet(x, y, vely, w, h, color) {
    this.x = x;
    this.y = y;
    this.vely = vely;
    this.width = w;
    this.height = h;
    this.color = color;
};

Bullet.prototype.move = function () {
    this.y += this.vely;
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
