/**
 * Canvas
 */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasContainer = document.getElementById("canvas-container");

var scale = 0;

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

/**
 * Function drawShip: draws ships given a matrix as an input.
 *
 * Inputs
 *  shipToDraw:     matrix-like drawing of the ship to draw.
 *  color:          color of the ship to draw.
 *  offsetX:        position in the x-axis.
 *  offsetY:        position in the y-axis.
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