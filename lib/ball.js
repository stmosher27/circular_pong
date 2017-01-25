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
    this.initialXSpeed = 5;
    this.initialYSpeed = 5;
    this.initialBallAngle = (45 * PI)/180;
    this.xSpeed = 5;
    this.ySpeed = 5;
    this.ballAngle = (45 * PI)/180;
    this.ballRadius = 20;


    this.ballFlag = true;
  }

  updateAngle(radius, centerY) {
    this.ballAngle = Math.asin((this.ballY -  centerY)/ radius);
    if (this.ballAngle < 0)
      this.ballAngle = Math.abs(this.ballAngle);
    if (this.ballX <= 300 && this.ballY >= 300)
      this.ballAngle = PI - this.ballAngle;
    if (this.ballX < 300 && this.ballY < 300)
      this.ballAngle += PI;
    if (this.ballX >= 300 && this.ballY <= 300)
      this.ballAngle += ((3 * PI) / 2);
    if (this.ballAngle >= TWO_PI)
      this.ballAngle -= TWO_PI;
  }

  updateBall() {
    this.ballFlag = !this.ballFlag;
  }

  updateSpeed(){
    this.xSpeed += .5;
    this.ySpeed -= .5;
  }

  ballSpeed() {
    if (this.ballFlag) {
      this.ballX += this.xSpeed;
      this.ballY += this.ySpeed;
    } else {
      this.ballX -= this.xSpeed;
      this.ballY -= this.ySpeed;
    }
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
