// color strip filling

var colorStrip = document.getElementById('color-strip')
var colorCtx = colorStrip.getContext('2d')
var colorStripWidth = colorStrip.width
var colorStripHeight = colorStrip.height
console.log(`w: ${colorStripWidth}, h: ${colorStripHeight}`)

function drawColorStrip(){
    colorCtx.rect(0, 0, colorStripWidth, colorStripHeight)
    var grd = colorCtx.createLinearGradient(0, 0, colorStripWidth, 0)
    grd.addColorStop(0.00, 'rgba(255, 0, 0, 1)');
    grd.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd.addColorStop(1.00, 'rgba(255, 0, 0, 1)');
    colorCtx.fillStyle = grd;
    colorCtx.fill();
}

drawColorStrip()

// wb strip filling

var wbStrip = document.getElementById('wb-strip')
var wbCtx = wbStrip.getContext('2d')
var wbStripWidth = wbStrip.width
var wbStripHeight = wbStrip.height
console.log(`w: ${wbStripWidth}, h: ${wbStripHeight}`)

// settings

var currentColor = [255, 0, 0]
var currentWb = 1
var dragWb = false
var dragColor = false
var colorPreviewBox = document.getElementById('color-preview-box')

function updatePreviewColor() {
    var wb = Math.round(currentWb * 1000) / 1000
    var color = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${wb})`
    // console.log(color)
    colorPreviewBox.style.backgroundColor = color
    document.getElementById('rgba-log').innerText = color
}

function updateWbStrip() {
    wbCtx.rect(0, 0, colorStripWidth, wbStripHeight)
    var grd = wbCtx.createLinearGradient(0, 0, 0, wbStripHeight)

    var color = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, 1)`
    grd.addColorStop(0.0, color);
    grd.addColorStop(1.0, 'rgba(20, 20, 20, 0)');
    wbCtx.fillStyle = grd;
    wbCtx.fill();
}

updateWbStrip()
updatePreviewColor()

// function click(e) {
//     x = e.offsetX;
//     y = e.offsetY;
//     var imageData = colorCtx.getImageData(x, y, 1, 1).data;
//     rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
//     currentColor = [imageData[0], imageData[1], imageData[2]]
//     updatePreviewColor()
// }

function mousedownColor(e) {
    dragColor = true
    changeColor(e)
}

function mousemoveColor(e) {
    if (dragColor)
        changeColor(e)
}

function mouseupColor(e) {
    dragColor = false
}

function mousedownWb(e) {
    dragWb = true
    changeWb(e)
}

function mousemoveWb(e) {
    if (dragWb)
        changeWb(e)
}

function mouseupWb(e) {
    dragWb = false
}

function changeColor(e) {
    var x = e.offsetX / parseFloat(getComputedStyle(colorStrip).width) * colorStrip.width;
    var y = e.offsetY;
    // console.log(x, y)
    var imageData = colorCtx.getImageData(x, colorStrip.height * 0.5, 1, 1).data;
    // console.log(imageData)
    currentColor = [imageData[0], imageData[1], imageData[2]]
    // console.log(currentColor)

    // drawColorStrip()

    // colorCtx.beginPath();
    // colorCtx.moveTo(x-1, 0);
    // colorCtx.lineTo(x+1, 0);
    // colorCtx.lineTo(x, 10);
    // colorCtx.lineTo(x-1, 0);
    // colorCtx.fillStyle = '#000000';
    // colorCtx.fill();

    updatePreviewColor()
    updateWbStrip()
}

function changeWb(e) {
    var prop = e.offsetY / parseFloat(getComputedStyle(document.getElementById('wb-strip')).height)
    currentWb = 1.0 - prop
    updatePreviewColor()
}

// colorStrip.addEventListener("click", click, false);

wbStrip.addEventListener("mousedown", mousedownWb, false);
wbStrip.addEventListener("mouseup", mouseupWb, false);
wbStrip.addEventListener("mousemove", mousemoveWb, false);

colorStrip.addEventListener("mousedown", mousedownColor, false);
colorStrip.addEventListener("mouseup", mouseupColor, false);
colorStrip.addEventListener("mousemove", mousemoveColor, false);