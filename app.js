document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("signCanvas");
  const ctx = canvas.getContext("2d");
  const downloadBtn = document.querySelector(".downloadbtn");
  const clearBtn = document.querySelector(".clearbtn");

  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  let drawing = false;

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const getTouchPos = (canvas, touch) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    drawing = true;
    const pos = getMousePos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!drawing) return;
    const pos = getMousePos(canvas, e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadSignature = () => {
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  canvas.addEventListener("touchstart", (e) => {
    startDrawing(e.touches[0]);
  });
  canvas.addEventListener("touchmove", (e) => {
    draw(e.touches[0]);
    e.preventDefault();
  });
  canvas.addEventListener("touchend", stopDrawing);
  canvas.addEventListener("touchcancel", stopDrawing);

  downloadBtn.addEventListener("click", downloadSignature);
  clearBtn.addEventListener("click", clearCanvas);
});
