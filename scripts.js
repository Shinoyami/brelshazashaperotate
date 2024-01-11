document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let lines = [];
  let startX = 0;
  let startY = 0;

  // Draw a non-deletable circle in the middle
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const circleRadius = 70;

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
    lines.push([]);
    ctx.beginPath();
  }

  function handleMouseMove(e) {
    if (!isDrawing) return;
    drawStraightLineTo(e);
  }

  function handleMouseOut() {
    if (isDrawing) {
      handleMouseUp();
    }
  }

  function setStartPoint(e) {
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    ctx.moveTo(startX, startY);
    lines[lines.length - 1].push({ x: startX, y: startY });
  }

  function drawStraightLineTo(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.stroke();
    lines[lines.length - 1].push({ x, y });
  }

  window.rotateLines = function (angle) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);

    // Redraw the existing lines after rotation
    lines.forEach((line) => {
      ctx.moveTo(line[0].x, line[0].y);
      for (let i = 1; i < line.length; i++) {
        ctx.lineTo(line[i].x, line[i].y);
      }
    });

    ctx.restore();
    ctx.stroke();
  };

  window.resetCanvas = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    lines = [];
  };
});
