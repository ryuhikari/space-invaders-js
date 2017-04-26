/**
 * Resize the canvas to expand the parent preserving aspect ratio
 */
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

var enemies = createEnemies(11, 5, 20, 15, 20, 30, [0, 1, 1, 2, 2]);

/**
 * Function to draw every alive enemy in the array enemies
 *
 * enemies: array containing every alive alien ship
 */
function drawUfos(enemies){
    ctx.save();
    ctx.scale(SCALE_VALUE_UFOS, SCALE_VALUE_UFOS);

    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
    }

    ctx.restore();
}

/**
 * Function to move every alive enemy in the array enemies as a block.
 * (When at least one enemy gets to the edge of the board, the block
 * moves down and reverses direction)
 *
 * enemies: array containing every alive alien ship
 */
var changeDir = 0;
function moveUfos(enemies){
    for (var i = 0; i < enemies.length; i++){
        enemies[i].move();
        if (enemies[i].x >= canvas.width/SCALE_VALUE_UFOS-15 || enemies[i].x <= 0){
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
 * Function to remove dead aliens
 */
function killUfos(enemies){
    for(var i = enemies.length - 1; i>=0; i--){
        if(enemies[i].dead){
            enemies.splice(i, 1);
        }
    }
}

/**
 * Function to shoot the bullets
 */
function shoot(){
    for(var i = 0; i < bullets.length; i++){
        bullets[i].draw();
        bullets[i].move();
        for(var j = 0; j < enemies.length; j++){
            if(bullets[i].alienHit(enemies[j])){
                enemies[j].kill();
                bullets[i].kill();
            }
        }
    }
    for(var k = bullets.length - 1; k>=0; k--){
        if(bullets[k].dead){
            bullets.splice(k, 1);
        }
    }
}

/*
 * Function update, to animate the game
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

update();