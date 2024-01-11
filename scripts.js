document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  // Draw a non-deletable circle in the middle
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const circleRadius = 30;

  ctx.beginPath();
  ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.stroke();

  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseout", handleMouseOut);

  function handleMouseDown(e) {
    isDrawing = true;
    setStartPoint(e);
  }

  function handleMouseUp() {
    isDrawing = false;
    ctx.beginPath();
  }

  function handleMouseMove(e) {
    if (!isDrawing) return;
    drawLineTo(e);
  }

  function handleMouseOut() {
    if (isDrawing) {
      handleMouseUp();
    }
  }

  function setStartPoint(e) {
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }

  function drawLineTo(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.stroke();

    // Reset the starting point to the current mouse position
    setStartPoint(e);
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

    // Redraw the non-deletable circle after rotation
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
  }
});
