// ======================================================
// AuraDraw - draw.js
// Canvas Drawing Script
// ======================================================

// Canvas Elements
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Buttons
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const recognizeBtn = document.getElementById("recognizeBtn");

// Controls
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

// Canvas Size
canvas.width = 900;
canvas.height = 500;

// Default Brush
ctx.strokeStyle = "#000000";
ctx.lineWidth = 5;
ctx.lineCap = "round";

let drawing = false;

// Undo & Redo
let history = [];
let redoHistory = [];

// ======================================================
// Save Canvas State
// ======================================================

function saveState() {
    redoHistory = [];

    if (history.length >= 20) {
        history.shift();
    }

    history.push(canvas.toDataURL());
}

// ======================================================
// Drawing
// ======================================================

function startDrawing(e) {
    drawing = true;
    saveState();

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!drawing) return;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

// ======================================================
// Mouse Events
// ======================================================

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// ======================================================
// Touch Support
// ======================================================

canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    startDrawing({
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
    });
});

canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    draw({
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
    });
});

canvas.addEventListener("touchend", stopDrawing);

// ======================================================
// Brush Color
// ======================================================

colorPicker.addEventListener("input", function () {
    ctx.strokeStyle = this.value;
});

// ======================================================
// Brush Size
// ======================================================

brushSize.addEventListener("input", function () {
    ctx.lineWidth = this.value;
});

// ======================================================
// Clear Canvas
// ======================================================

clearBtn.addEventListener("click", function () {

    saveState();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ======================================================
// Undo
// ======================================================

undoBtn.addEventListener("click", function () {

    if (history.length === 0)
        return;

    redoHistory.push(canvas.toDataURL());

    const img = new Image();

    img.src = history.pop();

    img.onload = function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);
    };
});

// ======================================================
// Redo
// ======================================================

redoBtn.addEventListener("click", function () {

    if (redoHistory.length === 0)
        return;

    history.push(canvas.toDataURL());

    const img = new Image();

    img.src = redoHistory.pop();

    img.onload = function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);
    };
});

// ======================================================
// Save Drawing
// ======================================================

saveBtn.addEventListener("click", function () {

    const link = document.createElement("a");

    link.download = "AuraDraw.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
});

// ======================================================
// Recognize Drawing
// (Currently Dummy Prediction)
// ======================================================

recognizeBtn.addEventListener("click", function () {

    const imageData = canvas.toDataURL("image/png");

    localStorage.setItem("drawingImage", imageData);

    // Dummy Prediction
    localStorage.setItem("prediction", "Cat");
    localStorage.setItem("confidence", "96%");

    window.location.href = "result.html";
});

// ======================================================
// Initialize Blank Canvas
// ======================================================

window.onload = function () {

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

};
