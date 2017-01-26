const PI = Math.PI;
const TWO_PI = 2 * PI;

class Player {
  constructor(ctxt) {
    this.ctxt = ctxt;
    this.paddleStart = 0;
    this.paddleEnd = TWO_PI/12;
    this.initialPaddleStart = 0;
    this.initialPaddleEnd = TWO_PI/12;

    this.paddleFlag = true;
    window.addEventListener("keypress", this.switchDirections.bind(this));
  }

  switchDirections(e){
    if (e.keyCode === 32)
      this.paddleFlag = !this.paddleFlag;
  }

  drawInitialPaddle(boardX, boardY, boardRadius){
    this.ctxt.beginPath();
    this.ctxt.arc(boardX, boardY, boardRadius, this.initialPaddleStart, this.initialPaddleEnd, false);
    this.ctxt.strokeStyle = "black";
    this.ctxt.lineWidth = 10;
    this.ctxt.stroke();
  }

  drawPaddle(boardX, boardY, boardRadius){
    this.ctxt.beginPath();
    this.ctxt.arc(boardX, boardY, boardRadius, this.paddleStart, this.paddleEnd, false);
    this.ctxt.strokeStyle = "black";
    this.ctxt.lineWidth = 10;
    this.ctxt.stroke();
  }

  updatePaddle() {
    if (this.paddleFlag) {
      this.paddleStart += .06;
      this.paddleEnd += .06;
      if (this.paddleStart >= TWO_PI)
        this.paddleStart -= TWO_PI;
      if (this.paddleEnd >= TWO_PI)
        this.paddleEnd -= TWO_PI;
    } else {
      this.paddleStart -= .06;
      this.paddleEnd -= .06;
      if (this.paddleStart <= -TWO_PI){
        this.paddleStart += TWO_PI;
      }
      if (this.paddleEnd <= -TWO_PI)
        this.paddleEnd += TWO_PI;
    }
    this.checkPaddle();
  }

  checkPaddle(){
    if (this.paddleStart < 0)
      this.paddleStart += TWO_PI;
    if (this.paddleEnd < 0)
      this.paddleEnd += TWO_PI;
  }
}

export default Player;
