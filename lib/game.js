import Board from './board';
import Player from './player';
import Ball from './ball';

const PI = Math.PI;
const TWO_PI = 2 * PI;

class Game {
  constructor() {
    this.canvas = document.getElementById("board");
    this.ctxt = this.canvas.getContext("2d");
    this.player = new Player(this.ctxt);
    this.ball = new Ball(this.canvas, this.ctxt);
    this.board = new Board(this.player, this.ball, this.canvas, this.ctxt);
    this.collidedWith = true;
    this.score = 0;
    this.gameOver = true;
  }


  checkCollision(){
    let newXPos = this.ball.ballX - this.board.centerX;
    let newYPos = this.ball.ballY - this.board.centerY;
    let disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));

    this.player.checkPaddle();

    if (disFromCenter < this.board.boardRadius - this.ball.ballRadius)
      this.collidedWith = true;

    if (disFromCenter >= this.board.boardRadius - this.ball.ballRadius) {
          this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
    }
    if ((this.ball.ballAngle >= this.player.paddleStart && this.ball.ballAngle <= this.player.paddleEnd) &&
          (disFromCenter >= this.board.boardRadius - this.ball.ballRadius &&
           Math.ceil(disFromCenter) <= this.board.boardRadius) &&
          this.collidedWith) {
           this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
           this.ball.resetInitialSpeed();
           this.ball.updateSpeed();
           this.collidedWith = false;
           this.score += 1;
      }

    if ((this.player.paddleStart >= ((3 * PI) / 2)) && this.player.paddleEnd <= (PI / 2) &&
    (disFromCenter >= this.board.boardRadius - this.ball.ballRadius &&
     Math.ceil(disFromCenter) <= this.board.boardRadius)) {
      if ((this.ball.ballAngle <= this.player.paddleEnd ||
        this.ball.ballAngle >= this.player.paddleStart) &&
        this.collidedWith) {
        this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
        this.ball.resetInitialSpeed();
        this.ball.updateSpeed();
        this.collidedWith = false;
        this.score += 1;
      }
    }

    if (!(this.ball.ballAngle >= this.player.paddleStart && this.ball.ballAngle <= this.player.paddleEnd)
      && Math.ceil(disFromCenter) >= this.board.boardRadius) {
        clearInterval(this.int);
        this.gameOver = true;
        console.log(this.score);
      }
  }

  renderInitialState(){
    this.board.drawCircle();
    this.board.clearBorder();

    this.ball.drawInitialBall();

    this.player.drawInitialPaddle(this.board.boardX, this.board.boardY, this.board.boardRadius);
  }


  runGame() {
    this.board.drawCircle();

    this.int = setInterval(() => {
      this.board.setBackground();

      this.ball.ballSpeed();

      this.board.drawCircle();
      this.board.clearBorder();

      this.ball.drawBall();

      this.player.updatePaddle();
      this.player.drawPaddle(this.board.boardX, this.board.boardY, this.board.boardRadius);

      this.checkCollision();

    }, 30);
  }
}

export default Game;
