const PI = Math.PI;
const TWO_PI = 2 * PI;

class Ball {
  constructor(canvas, ctxt) {
    this.ctxt = ctxt;
    this.canvas = canvas;
    this.ballX = this.canvas.width/2;
    this.ballY = canvas.width/2;
    this.initialBallX = this.canvas.width/2;
    this.initialBallY = canvas.width/2;
    this.initialXSpeed = 6;
    this.initialYSpeed = 6;
    this.magnitude = 6 * Math.sqrt(2);
    this.initialBallAngle = (45 * PI)/180;
    this.xSpeed = 6;
    this.ySpeed = 6;
    this.ballAngle = (45 * PI)/180;
    this.ballRadius = 20;
  }

  updateAngle(radius, centerY) {
    this.ballAngle = Math.asin((Math.abs(this.ballY) -  centerY)/ radius);
    if (this.ballAngle < 0)
      this.ballAngle = Math.abs(this.ballAngle);
    if (this.ballX <= 350 && this.ballY >= 350)
      this.ballAngle = PI - this.ballAngle;
    if (this.ballX < 350 && this.ballY < 350)
      this.ballAngle += PI;
    if (this.ballX >= 350 && this.ballY <= 350)
      this.ballAngle = TWO_PI - this.ballAngle;
    if (this.ballAngle >= TWO_PI)
      this.ballAngle -= TWO_PI;
  }

  updateSpeed(){
    let newSpeeds = [[1, Math.sqrt(7)],
                 [1.5, Math.sqrt(1.75)]];
    let random = Math.floor(Math.random() * 2);
    this.xSpeed += newSpeeds[random][0];
    this.ySpeed = newSpeeds[random][1];

    if (this.ballX >= 350 && this.ballY <= 350) {
      this.xSpeed = -(this.xSpeed);
    } else if (this.ballX >= 350 && this.ballY >= 350) {
      this.xSpeed = -(this.xSpeed);
      this.ySpeed = -(this.ySpeed);
    } else if (this.ballX <= 350 && this.ballY >= 350) {
      this.ySpeed = -(this.ySpeed);
    }
  }

  ballSpeed() {
    this.ballX += this.xSpeed;
    this.ballY += this.ySpeed;
  }

  resetInitialSpeed() {
    this.xSpeed = this.initialXSpeed;
    this.YSpeed = this.initialYSpeed;
  }

  drawInitialBall(){
    this.ctxt.beginPath();
    this.ctxt.arc(this.initialBallX, this.initialBallY, this.ballRadius, 0, TWO_PI, false);
    this.ctxt.fillStyle = "black";
    this.ctxt.fill();
  }

  drawBall(){
    this.ctxt.beginPath();
    this.ctxt.arc(this.ballX, this.ballY, this.ballRadius, 0, TWO_PI, false);
    this.ctxt.fillStyle = "black";
    this.ctxt.fill();
  }
}

export default Ball;
