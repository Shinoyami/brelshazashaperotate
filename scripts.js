document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseout", stopDrawing);

  function startDrawing(e) {
    drawing = true;
    setPosition(e);
  }

  function stopDrawing() {
    drawing = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!drawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    setPosition(e);
    ctx.lineTo(lastX, lastY);
    ctx.stroke();
  }

  function setPosition(e) {
    lastX = e.clientX - canvas.offsetLeft;
    lastY = e.clientY - canvas.offsetTop;
  }

  window.rotate90 = function () {
    rotateCanvas(90);
  };

  window.rotate180 = function () {
    rotateCanvas(180);
  };

  window.rotate270 = function () {
    rotateCanvas(270);
  };

  function rotateCanvas(angle) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.height;
    canvas.height = imageData.width;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(canvas, -canvas.height / 2, -canvas.width / 2);
    ctx.restore();
    ctx.putImageData(imageData, 0, 0);
  }
});
