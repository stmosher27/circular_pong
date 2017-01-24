const Board = require("./board.js");

document.addEventListener('DOMContentLoaded', () => {
  const PI = Math.PI;
  const TWO_PI = 2 * PI;

  const WIDTH = 700;
  const HEIGHT = 700;

  window.onload = () => {
    const canvas = document.getElementById("board");
    const ctxt = canvas.getContext("2d");

    const boardX = canvas.width/2;
    const boardY = canvas.height/2;
    const boardRadius = 300;

    ctxt.beginPath();
    ctxt.arc(boardX, boardY, boardRadius, 0, TWO_PI, false);
    ctxt.fillStyle = "#1E90FF";
    ctxt.fill();


    let ballX = canvas.width/2;
    let ballY = canvas.width/2;
    const ballRadius = 20;

    let paddleStart = 0;
    let paddleEnd = TWO_PI/10;

    let flag = true;

    const switchDirections = () => {
      flag = !flag;
    };

    window.addEventListener("keypress", switchDirections, false);


    setInterval(() => {
      ctxt.fillStyle = "white";
      ctxt.fillRect(0, 0, HEIGHT, WIDTH);

      ballX += 1;
      ballY += 1;

      ctxt.beginPath();
      ctxt.arc(boardX, boardY, boardRadius, 0, TWO_PI, false);
      ctxt.fillStyle = "#1E90FF";
      ctxt.fill();
      ctxt.strokeStyle = "white";
      ctxt.lineWidth = 21;
      ctxt.stroke();


      ctxt.beginPath();
      ctxt.arc(ballX, ballY, ballRadius, 0, TWO_PI, false);
      ctxt.fillStyle = "black";
      ctxt.fill();

      if (flag) {
        paddleStart += .05;
        paddleEnd += .05;
      } else {
        paddleStart -= .05;
        paddleEnd -= .05;
      }

      ctxt.beginPath();
      ctxt.arc(boardX, boardY, boardRadius, paddleStart, paddleEnd, false);
      ctxt.strokeStyle = "black";
      ctxt.lineWidth = 20;
      ctxt.stroke();

    }, 30);
  };
});
