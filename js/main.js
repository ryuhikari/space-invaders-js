/**
 * Resize the canvas to expand the parent preserving aspect ratio
 */
function resize() {
    const canvasContainerWidth = canvasContainer.offsetWidth;
    const canvasContainerHeight = canvasContainer.offsetHeight;
    const canvasContainerRatio = canvasContainerWidth / canvasContainerHeight;

    if (canvasContainerRatio >= canvasRatio) {
        width = (canvasWidth / canvasHeight) * canvasContainerHeight;
        canvas.width = width;

        height = canvasContainerHeight - 6;
        canvas.height = height;
    } else {
        width = canvasContainerWidth - 6;
        canvas.width = width;

        height = (canvasHeight / canvasWidth) * canvasContainerWidth;
        canvas.height = height;
    }

    scale = width / (ufosPerRow * spaceX + offsetX * 2);
}

window.addEventListener("resize", resize);

window.addEventListener("orientationchange", resize);

resize();

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

var enemies = createEnemies(ufosPerRow, numRows, spaceX, spaceY, offsetX, offsetY, design);

// Function to draw every alive enemy in the array
function drawUfos(enemies){
    ctx.save();
    ctx.scale(scale, scale);

    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
    }

    ctx.restore();
}

// Function to move every enemy as a block (when at least one of them gets to the edge of the board,
// move downwards and reverse direction)
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

////////////////////////////////////////////////
///                 Animation                ///
////////////////////////////////////////////////

// Function update, to animate the game
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();
    drawUfos(enemies);
    moveUfos(enemies);

    ID = requestAnimationFrame(update);
}

update();
