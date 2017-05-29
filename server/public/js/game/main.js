/**
 * All the variables
 */
var

/**
 * Canvas
 */
board,
input,
frames,
moveFreq,
moveFreqInit,

/**
 * Alien block
 */
rowPattern,
alienScore,
numAlienColumns,
columnWidth,

/**
 * Sprites
 */
alienSprite,
shipSprite,
spriteVersion,
maxSpriteWidth,

/**
 * Game elements
 */
aliens,
dir,
ship,
bullets,
gameOverFlag;

/**
 * Event to move user cannon on mobile devices based on orientation
 */
if (window.DeviceOrientationEvent) {
  // Listen for the event and handle DeviceOrientationEvent object
  window.addEventListener('deviceorientation', function(eventData) {
    // betta represents the motion of the device around the x axis
    // gamma represents the motion of the device around the y axis

    // Get betta or gamma based on portrait or landscape mode
    if (screen.orientation.angle === 90 || screen.orientation.angle === 270) {
        var tiltLR = eventData.beta;
    } else {
        var tiltLR = eventData.gamma;
    }

    // Limit movement to 30 degrees
    var aux = Math.max(tiltLR, -30);
    aux = Math.min(tiltLR, 30);
    aux = aux * 100 / 30 / 100;
    aux = (board.width / 2) * (1+aux);

    // Move user cannon based on the tilt
    ship.x = aux - ship.width / 2;
  }, false);
}

/**
 * Event to move shoot on mobile devices based on screen touch
 */
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

/**
 * Create canvas and prepare sprites by cropping image
 */
function main() {
    // Create canvas
    board = new Board("canvas-container", 224, 256);
    board.init();

    // Initialize input key events
    input = new InputHandeler();

    // Get image with all the sprites and crop it
    var img = new Image();
    // Crop image when it finish loading
    img.addEventListener("load", function() {

        alienSprite = [
            [new Sprite(this, 0, 0, 110, 80), new Sprite(this, 0, 80, 110, 80)],
            [new Sprite(this, 110, 0, 80, 80), new Sprite(this, 110, 80, 80, 80)],
            [new Sprite(this, 190, 0, 120, 80), new Sprite(this, 190, 80, 120, 80)],
        ];
        shipSprite = new Sprite(this, 310, 108, 73, 52);

        // Init game variables and start running
        init();
        run();
    });
    img.src = "img/sprites.png";
};

/**
 * Initialize game variables
 */
function init() {
    frames  = 0; // Count number of times requestAnimationFrame is called
    moveFreqInit = 60;   // Start moving aliens each second (60 frames)
    moveFreq = moveFreqInit; // The fewer the aliens, the faster the movement
    shootFreqInit = 0.03;  // Initial shooting rate
    shootFreq = shootFreqInit; // Current shooting rate
    spriteVersion = 0; // Each alien has two version to create movement
    gameOverFlag = false; // Flag to control the upload of score to the server

    rowPattern = [1, 0, 0, 2, 2]; // number of alien rows and which alien to use
    alienScore = [300, 200, 200, 100, 100]; // Score of each alien in the row
    numAlienColumns = 11; // Number of alien columns
    maxSpriteWidth = "110"; // Max sprite alien width to create columns

    var numGaps = numAlienColumns - 1; // Number of gaps between columns
    // Get round number of canvas columns based on alien columns
    var totalColumns = Math.round( 8 * (numAlienColumns * 2 + numGaps) / 6 );
    // Get column width
    columnWidth = board.width / totalColumns;
    dir = columnWidth; // Number of pixels to move - In this case move one column

    aliens = []; // Init aliens array
    displayAliens();

    var width = shipSprite.width * aliens[0].width / alienSprite[rowPattern[0]][0].width;
    width *= 1.5;
    var height = shipSprite.height / shipSprite.width * width;
    ship = new Ship(shipSprite, board.width*0.5, board.height * 0.95, width, height, 3);

    bullets = []; // Init bullets array
};

/**
 * Init requestAnimationFrame loop
 */
function run() {
    var loop = function() {
        update(); // Update game values
        render(); // Redraw the game

        window.requestAnimationFrame(loop, board.canvas);
    };
    window.requestAnimationFrame(loop, board.canvas);
};

/**
 * Update game values
 */
function update() {
    frames++; // Increase frames count to do something when certain time has passed

    // Move user cannon based on left and right keyboard arrows
    if (input.isDown(37)) { // Left arrow key
        ship.x -= ship.width / 4;
    }
    if (input.isDown(39)) { // Right arrow key
        ship.x += ship.width / 4;
    }
    ship.x = Math.min(ship.x, board.width - ship.width);
    ship.x = Math.max(ship.x, 0);

    // Shoot new bullet what user presses spacebar
    if (input.isPressed(32)) { // Space key     isPressed
        if(ship.alive){
            bullets.push(new Bullet(ship.x + ship.width / 2, ship.y, "#33FF00", -1));
        }
    }

    // Reset game when user presses R key
    if(input.isDown(82)) { // R key
        board.clear();
        init();
    }

    // Move bullets and check if they hit something
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if(!bullet.alive){
            bullets.splice(i, 1);
            i--;
        }
        bullet.move();
        bullet.checkHit(aliens, ship);
    }

    // Move aliens when frames === moveFreq
    if (frames % moveFreq === 0) {
        // Change between the 2 sprite version of each alien to create visual movement
        spriteVersion = (spriteVersion + 1) % 2;

        // Move aliens on the horizontal axis
        aliensMove(aliens, "x", dir);
        for (var i = 0; i < aliens.length; i++) {
            var alien = aliens[i];

            // If some alien hits canvas border, move all the aliens one step down
            if ( alien.x > (board.width - columnWidth * 2) || alien.x < 0) {
                dir *= -1;
                aliensMove(aliens, "y", Math.abs(dir));
                aliensMove(aliens, "x", dir);
                break;
            }

            // If aliens reach the user cannon limit, the game is over
            if(alien.y + alien.height >= board.height*0.9){
                ship.kill(10000);
            }
        }
    }

    // Generate alien bullets based on shoot frequence
    if(Math.random() < shootFreq && aliens.length > 0){
        var s = Math.floor(Math.random()*aliens.length);
        bullets.push(new Bullet(aliens[s].x + aliens[s].width/2, aliens[s].y + aliens[s].height, "#fff", 1));
    }

};

/**
 * Redraw the game
 */
function render() {
    board.clear(); // Clear the canvas to start over
    board.gameInfo(ship); // Draw game info

    // Do things if the user still alive
    if(ship.alive){
        board.gameOverLine();

        // If user kills all aliens, new wave is generated
        if(aliens.length <= 0){
            shootFreq += 0.02;
            displayAliens();
            ship.newWave();
        }

        // Draw all alive aliens
        for (var i = 0; i < aliens.length; i++) {
            var alien = aliens[i];
            if(alien.alive){
                board.drawAlien(alien, spriteVersion);
            }else{
                // Remove alien from the aliens array if it is not alive
                aliens.splice(i, 1);
                i--;
                moveFreq--;
                if(moveFreq <= 1){
                    moveFreq = 1;
                }
            }
        }

        // Draw user cannon
        board.drawShip(ship);

        // Draw all the bullets
        for (var i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            if(bullet.alive){
                board.drawBullet(bullet);
            }
        }
    }else{
        // Finish game when the user runs out of lives
        bullets = [];
        if(!gameOverFlag) {
            uploadScore(ship.score);
            gameOverFlag = true;
        }
        board.gameOver();
    }

};

// Start all the game process
main();
