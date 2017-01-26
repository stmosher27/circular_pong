import Player from './player.js';

const PI = Math.PI;
const TWO_PI = 2 * PI;

class Board {
  constructor(player, ball, canvas, ctxt) {
    this.player = player;
    this.ball = ball;
    this.canvas = canvas;
    this.ctxt = ctxt;
    this.WIDTH = 450;
    this.HEIGHT = 450;

    this.centerX = this.WIDTH/2;
    this.centerY = this.HEIGHT/2;

    this.boardX = this.WIDTH/2;
    this.boardY = this.HEIGHT/2;
    this.boardRadius = 200;
  }

  drawCircle(){
    this.ctxt.beginPath();
    this.ctxt.arc(this.boardX, this.boardY, this.boardRadius, 0, TWO_PI, false);
    this.ctxt.fillStyle = "#1E90FF";
    this.ctxt.fill();
  }

  clearBorder(){
    this.ctxt.strokeStyle = "white";
    this.ctxt.lineWidth = 11;
    this.ctxt.stroke();
  }

  setBackground(){
    this.ctxt.fillStyle = "white";
    this.ctxt.fillRect(0, 0, this.HEIGHT, this.WIDTH);
  }
}

export default Board;
