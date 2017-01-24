class Board {
  constructor() {
    this.runGame = this.runGame.bind(this);
    this.runGame();
  }

  runGame() {
    const PI = Math.PI;
    const TWO_PI = 2 * PI;

    const WIDTH = 700;
    const HEIGHT = 700;

    window.onload = () => {
      const canvas = document.getElementById("board");
      const ctxt = canvas.getContext("2d");

      const centerX = WIDTH/2;
      const centerY = HEIGHT/2

      const boardX = WIDTH/2;
      const boardY = HEIGHT/2;
      const boardRadius = 300;

      ctxt.beginPath();
      ctxt.arc(boardX, boardY, boardRadius, 0, TWO_PI, false);
      ctxt.fillStyle = "#1E90FF";
      ctxt.fill();


      let ballX = canvas.width/2;
      let ballY = canvas.width/2;
      let ballAngle = (45 * PI)/180;
      const ballRadius = 20;

      let paddleStart = 0;
      let paddleEnd = TWO_PI/10;

      let paddleFlag = true;
      let ballFlag = true;

      function switchDirections(e){
        if (e.keyCode === 32)
          paddleFlag = !paddleFlag;
      }

      function checkCollision(angle, paddleStartAngle, paddleEndAngle, ballPosX, ballPosY){
        let newXPos = ballPosX - centerX;
        let newYPos = ballPosY - centerY;
        let disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));

        if (paddleStartAngle < 0)
          paddleStartAngle += 2 * PI;
        if (paddleEndAngle < 0)
          paddleEndAngle += 2 * PI;

        if ((angle >= paddleStartAngle && angle <= paddleEndAngle)
           && (disFromCenter >= boardRadius - ballRadius && Math.ceil(disFromCenter) <= boardRadius)) {
          updateBall();
        }

        if (!(angle >= paddleStartAngle && angle <= paddleEndAngle)
          && Math.ceil(disFromCenter) >= boardRadius) {
            console.log('lose');
          }
      }

      window.addEventListener("keypress", switchDirections, false);

      function updateBall() {
        ballFlag = !ballFlag;
        ballAngle += PI;
        if (ballAngle >= 2 * PI)
          ballAngle -= 2 * PI;
      }

      function updatePaddle() {
        if (paddleFlag) {
          paddleStart += .05;
          paddleEnd += .05;
          if (paddleStart >= 2 * PI)
            paddleStart -= 2 * PI;
          if (paddleEnd >= 2 * PI)
            paddleEnd -= 2 * PI;
        } else {
          paddleStart -= .05;
          paddleEnd -= .05;
          if (paddleStart <= -2 * PI){
            paddleStart += 2 * PI;
          }
          if (paddleEnd <= -2 * PI)
            paddleEnd += 2 * PI;
        }
      }


      setInterval(() => {
        ctxt.fillStyle = "white";
        ctxt.fillRect(0, 0, HEIGHT, WIDTH);

        if (ballFlag) {
          ballX += 4;
          ballY += 4;
        } else {
          ballX -= 4;
          ballY -= 4;
        }

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

        updatePaddle();

        ctxt.beginPath();
        ctxt.arc(boardX, boardY, boardRadius, paddleStart, paddleEnd, false);
        ctxt.strokeStyle = "black";
        ctxt.lineWidth = 20;
        ctxt.stroke();

        checkCollision(ballAngle, paddleStart, paddleEnd, ballX, ballY);

      }, 30);
    };
  }
}

module.exports = Board;
