var

board,
input,
frames,
moveFreq,
moveFreqInit,

rowPattern,
alienScore,
numAlienColumns,
columnWidth,

alienSprite,
shipSprite,
citySprite,
spriteVersion,
maxSpriteWidth,

aliens,
dir,
ship,
bullets,
cities;

if (window.DeviceOrientationEvent) {
  // Listen for the event and handle DeviceOrientationEvent object
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;
    var aux = Math.max(tiltLR, -30);
    aux = Math.min(tiltLR, 30);
    aux = aux * 100 / 30 / 100;
    aux = (board.width / 2) * (1+aux);
    ship.x = aux - ship.width / 2;
  }, false);
}

if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    // Touch events are supported
    window.addEventListener("touchstart", function(event) {
        event.preventDefault();

        if(ship.alive){
            bullets.push(new Bullet(ship.x + ship.width / 2, ship.y, "#33FF00", -1));
        }else{
            board.clear();
            init();
        }
    }, false);
}

function main() {
    board = new Board("canvas-container", 224, 256);
    board.init();

    input = new InputHandeler();

    var img = new Image();
    img.addEventListener("load", function() {

        alienSprite = [
            [new Sprite(this, 0, 0, 110, 80), new Sprite(this, 0, 80, 110, 80)],
            [new Sprite(this, 110, 0, 80, 80), new Sprite(this, 110, 80, 80, 80)],
            [new Sprite(this, 190, 0, 120, 80), new Sprite(this, 190, 80, 120, 80)],
        ];
        shipSprite = new Sprite(this, 310, 108, 73, 52);
        citySprite = new Sprite(this, 310, 0, 104, 73);

        init();
        run();
    });
    img.src = "img/sprites.png";
};

function init() {
    frames  = 0;
    moveFreqInit = 60;   //60
    moveFreq = moveFreqInit;
    shootFreqInit = 1;  // 0.03
    shootFreq = shootFreqInit;
    spriteVersion = 0;

    rowPattern = [1, 0, 0, 2, 2];
    alienScore = [300, 200, 200, 100, 100];
    numAlienColumns = 11;
    maxSpriteWidth = "110";

    var numGaps = numAlienColumns - 1;
    var totalColumns = Math.round( 8 * (numAlienColumns * 2 + numGaps) / 6 );
    columnWidth = board.width / totalColumns;
    dir = columnWidth;

    aliens = [];
    displayAliens();

    var width = shipSprite.width * aliens[0].width / alienSprite[rowPattern[0]][0].width;
    width *= 1.5;
    var height = shipSprite.height / shipSprite.width * width;
    ship = new Ship(shipSprite, board.width*0.5, board.height * 0.95, width, height, 3);

    bullets = [];
};

function run() {
    var loop = function() {
        update();
        render();

        window.requestAnimationFrame(loop, board.canvas);
    };
    window.requestAnimationFrame(loop, board.canvas);
};

function update() {
    frames++;

    if (input.isDown(37)) { // Left arrow key
        ship.x -= ship.width / 4;
    }
    if (input.isDown(39)) { // Right arrow key
        ship.x += ship.width / 4;
    }
    ship.x = Math.min(ship.x, board.width - ship.width);
    ship.x = Math.max(ship.x, 0);

    if (input.isPressed(32)) { // Space key     isPressed
        if(ship.alive){
            bullets.push(new Bullet(ship.x + ship.width / 2, ship.y, "#33FF00", -1));
        }
    }

    if(input.isDown(82)) { // R key
        board.clear();
        init();
    }

    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if(!bullet.alive){
            bullets.splice(i, 1);
            i--;
        }
        bullet.move();
        bullet.checkHit(aliens, ship);
    }

    if (frames % moveFreq === 0) {
        spriteVersion = (spriteVersion + 1) % 2;

        aliensMove(aliens, "x", dir);
        for (var i = 0; i < aliens.length; i++) {
            var alien = aliens[i];

            if ( alien.x > (board.width - columnWidth * 2) || alien.x < 0) {
                dir *= -1;
                aliensMove(aliens, "y", Math.abs(dir));
                aliensMove(aliens, "x", dir);
                break;
            }

            if(alien.y + alien.height >= board.height*0.9){
                ship.kill(10000);
            }
        }
    }

    if(Math.random() < shootFreq && aliens.length > 0){
        var s = Math.floor(Math.random()*aliens.length);
        bullets.push(new Bullet(aliens[s].x + aliens[s].width/2, aliens[s].y + aliens[s].height, "#fff", 1));
    }

};

function render() {
    board.clear();
    board.gameInfo(ship);

    if(ship.alive){
        board.gameOverLine();

        if(aliens.length <= 0){
            shootFreq += 0.02;
            displayAliens();
            ship.newWave();
        }

        for (var i = 0; i < aliens.length; i++) {
            var alien = aliens[i];
            if(alien.alive){
                board.drawAlien(alien, spriteVersion);
            }else{
                aliens.splice(i, 1);
                i--;
                moveFreq--;
                if(moveFreq <= 1){
                    moveFreq = 1;
                }
            }
        }

        board.drawShip(ship);

        for (var i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            if(bullet.alive){
                board.drawBullet(bullet);
            }
        }
    }else{
        bullets = [];
        board.gameOver();
    }

};

main();
