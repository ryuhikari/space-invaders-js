var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasContainer = document.getElementById("canvas-container");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasRatio = canvasWidth / canvasHeight;

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