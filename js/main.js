var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasRatio = canvasWidth / canvasHeight;

function resize() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const vr = vw / vh;

    if (vr >= canvasRatio) {
        canvas.width = (canvasWidth / canvasHeight) * vh; 
        canvas.height = vh - 6;
    } else {
        canvas.width = vw - 6;
        canvas.height = (canvasHeight / canvasWidth) * vw;
    }
}

window.addEventListener("resize", resize);

window.addEventListener("orientationchange", resize);

resize();