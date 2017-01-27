/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var game = new _game2.default();
	  game.renderInitialState();
	  window.addEventListener("keypress", restart);
	
	  function restart(e) {
	    if (e.keyCode === 13 && game.gameOver) {
	      game = new _game2.default();
	      game.runGame();
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _player = __webpack_require__(3);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _ball = __webpack_require__(4);
	
	var _ball2 = _interopRequireDefault(_ball);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PI = Math.PI;
	var TWO_PI = 2 * PI;
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.canvas = document.getElementById("board");
	    this.ctxt = this.canvas.getContext("2d");
	    this.player = new _player2.default(this.ctxt);
	    this.ball = new _ball2.default(this.canvas, this.ctxt);
	    this.board = new _board2.default(this.player, this.ball, this.canvas, this.ctxt);
	    this.collidedWith = true;
	    this.score = 0;
	    this.gameOver = true;
	  }
	
	  _createClass(Game, [{
	    key: 'checkPaddle',
	    value: function checkPaddle() {
	      var newXPos = this.ball.ballX - this.board.centerX;
	      var newYPos = this.ball.ballY - this.board.centerY;
	      var disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));
	      if (this.ball.ballAngle >= this.player.paddleStart && this.ball.ballAngle <= this.player.paddleEnd && disFromCenter >= this.board.boardRadius - this.ball.ballRadius && Math.ceil(disFromCenter) <= this.board.boardRadius && this.collidedWith) {
	        this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
	        this.ball.resetInitialSpeed();
	        this.ball.updateSpeed();
	        this.collidedWith = false;
	        this.score += 1;
	      }
	    }
	  }, {
	    key: 'checkSpecialPaddle',
	    value: function checkSpecialPaddle() {
	      var newXPos = this.ball.ballX - this.board.centerX;
	      var newYPos = this.ball.ballY - this.board.centerY;
	      var disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));
	      if (this.player.paddleStart >= 3 * PI / 2 && this.player.paddleEnd <= PI / 2 && disFromCenter >= this.board.boardRadius - this.ball.ballRadius && Math.ceil(disFromCenter) <= this.board.boardRadius) {
	        if ((this.ball.ballAngle <= this.player.paddleEnd || this.ball.ballAngle >= this.player.paddleStart) && this.collidedWith) {
	          this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
	          this.ball.resetInitialSpeed();
	          this.ball.updateSpeed();
	          this.collidedWith = false;
	          this.score += 1;
	        }
	      }
	    }
	  }, {
	    key: 'lose',
	    value: function lose() {
	      var newXPos = this.ball.ballX - this.board.centerX;
	      var newYPos = this.ball.ballY - this.board.centerY;
	      var disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));
	      if (!(this.ball.ballAngle >= this.player.paddleStart && this.ball.ballAngle <= this.player.paddleEnd) && Math.ceil(disFromCenter) >= this.board.boardRadius) {
	        clearInterval(this.int);
	        this.gameOver = true;
	        this.ctxt.font = "30px fantasy";
	        this.ctxt.fillStyle = 'white';
	        this.ctxt.fillText('Score: ' + this.score, 175, 225);
	      }
	    }
	  }, {
	    key: 'checkCollision',
	    value: function checkCollision() {
	      var newXPos = this.ball.ballX - this.board.centerX;
	      var newYPos = this.ball.ballY - this.board.centerY;
	      var disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));
	
	      this.player.checkPaddle();
	
	      if (disFromCenter < this.board.boardRadius - this.ball.ballRadius) this.collidedWith = true;
	
	      if (disFromCenter >= this.board.boardRadius - this.ball.ballRadius) {
	        this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
	      }
	
	      this.checkPaddle();
	
	      this.checkSpecialPaddle();
	
	      this.lose();
	    }
	  }, {
	    key: 'renderInitialState',
	    value: function renderInitialState() {
	      this.board.drawCircle();
	      this.board.clearBorder();
	
	      this.ball.drawInitialBall();
	
	      this.player.drawInitialPaddle(this.board.boardX, this.board.boardY, this.board.boardRadius);
	    }
	  }, {
	    key: 'runGame',
	    value: function runGame() {
	      var _this = this;
	
	      this.gameOver = false;
	      this.board.drawCircle();
	
	      this.int = setInterval(function () {
	        _this.board.setBackground();
	
	        _this.ball.ballSpeed();
	
	        _this.board.drawCircle();
	        _this.board.clearBorder();
	
	        _this.ball.drawBall();
	
	        _this.player.updatePaddle();
	        _this.player.drawPaddle(_this.board.boardX, _this.board.boardY, _this.board.boardRadius);
	
	        _this.checkCollision();
	      }, 30);
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player = __webpack_require__(3);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PI = Math.PI;
	var TWO_PI = 2 * PI;
	
	var Board = function () {
	  function Board(player, ball, canvas, ctxt) {
	    _classCallCheck(this, Board);
	
	    this.player = player;
	    this.ball = ball;
	    this.canvas = canvas;
	    this.ctxt = ctxt;
	    this.WIDTH = 450;
	    this.HEIGHT = 450;
	
	    this.centerX = this.WIDTH / 2;
	    this.centerY = this.HEIGHT / 2;
	
	    this.boardX = this.WIDTH / 2;
	    this.boardY = this.HEIGHT / 2;
	    this.boardRadius = 200;
	  }
	
	  _createClass(Board, [{
	    key: "drawCircle",
	    value: function drawCircle() {
	      this.ctxt.beginPath();
	      this.ctxt.arc(this.boardX, this.boardY, this.boardRadius, 0, TWO_PI, false);
	      this.ctxt.fillStyle = "#1E90FF";
	      this.ctxt.fill();
	    }
	  }, {
	    key: "clearBorder",
	    value: function clearBorder() {
	      this.ctxt.strokeStyle = "white";
	      this.ctxt.lineWidth = 11;
	      this.ctxt.stroke();
	    }
	  }, {
	    key: "setBackground",
	    value: function setBackground() {
	      this.ctxt.fillStyle = "white";
	      this.ctxt.fillRect(0, 0, this.HEIGHT, this.WIDTH);
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PI = Math.PI;
	var TWO_PI = 2 * PI;
	
	var Player = function () {
	  function Player(ctxt) {
	    _classCallCheck(this, Player);
	
	    this.ctxt = ctxt;
	    this.paddleStart = 0;
	    this.paddleEnd = TWO_PI / 12;
	    this.initialPaddleStart = 0;
	    this.initialPaddleEnd = TWO_PI / 12;
	
	    this.paddleFlag = true;
	    window.addEventListener("keypress", this.switchDirections.bind(this));
	  }
	
	  _createClass(Player, [{
	    key: "switchDirections",
	    value: function switchDirections(e) {
	      if (e.keyCode === 32) this.paddleFlag = !this.paddleFlag;
	    }
	  }, {
	    key: "drawInitialPaddle",
	    value: function drawInitialPaddle(boardX, boardY, boardRadius) {
	      this.ctxt.beginPath();
	      this.ctxt.arc(boardX, boardY, boardRadius, this.initialPaddleStart, this.initialPaddleEnd, false);
	      this.ctxt.strokeStyle = "black";
	      this.ctxt.lineWidth = 10;
	      this.ctxt.stroke();
	    }
	  }, {
	    key: "drawPaddle",
	    value: function drawPaddle(boardX, boardY, boardRadius) {
	      this.ctxt.beginPath();
	      this.ctxt.arc(boardX, boardY, boardRadius, this.paddleStart, this.paddleEnd, false);
	      this.ctxt.strokeStyle = "black";
	      this.ctxt.lineWidth = 10;
	      this.ctxt.stroke();
	    }
	  }, {
	    key: "updatePaddle",
	    value: function updatePaddle() {
	      if (this.paddleFlag) {
	        this.paddleStart += .06;
	        this.paddleEnd += .06;
	        if (this.paddleStart >= TWO_PI) this.paddleStart -= TWO_PI;
	        if (this.paddleEnd >= TWO_PI) this.paddleEnd -= TWO_PI;
	      } else {
	        this.paddleStart -= .06;
	        this.paddleEnd -= .06;
	        if (this.paddleStart <= -TWO_PI) {
	          this.paddleStart += TWO_PI;
	        }
	        if (this.paddleEnd <= -TWO_PI) this.paddleEnd += TWO_PI;
	      }
	      this.checkPaddle();
	    }
	  }, {
	    key: "checkPaddle",
	    value: function checkPaddle() {
	      if (this.paddleStart < 0) this.paddleStart += TWO_PI;
	      if (this.paddleEnd < 0) this.paddleEnd += TWO_PI;
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PI = Math.PI;
	var TWO_PI = 2 * PI;
	
	var Ball = function () {
	  function Ball(canvas, ctxt) {
	    _classCallCheck(this, Ball);
	
	    this.ctxt = ctxt;
	    this.canvas = canvas;
	    this.ballX = canvas.width / 2;
	    this.ballY = canvas.width / 2;
	    this.initialBallX = canvas.width / 2;
	    this.initialBallY = canvas.width / 2;
	    this.initialXSpeed = 4;
	    this.initialYSpeed = 4;
	    this.magnitude = 4 * Math.sqrt(2);
	    this.initialBallAngle = 45 * PI / 180;
	    this.xSpeed = 4;
	    this.ySpeed = 4;
	    this.ballAngle = 45 * PI / 180;
	    this.ballRadius = 10;
	  }
	
	  _createClass(Ball, [{
	    key: "updateAngle",
	    value: function updateAngle(radius, centerY) {
	      this.ballAngle = Math.asin((Math.abs(this.ballY) - centerY) / radius);
	      if (this.ballAngle < 0) this.ballAngle = Math.abs(this.ballAngle);
	      if (this.ballX <= 225 && this.ballY >= 225) this.ballAngle = PI - this.ballAngle;
	      if (this.ballX < 225 && this.ballY < 225) this.ballAngle += PI;
	      if (this.ballX >= 225 && this.ballY <= 225) this.ballAngle = TWO_PI - this.ballAngle;
	      if (this.ballAngle >= TWO_PI) this.ballAngle -= TWO_PI;
	    }
	  }, {
	    key: "updateSpeed",
	    value: function updateSpeed() {
	      var newSpeeds = [[1, Math.sqrt(7)], [1.5, Math.sqrt(1.75)], [.7, Math.sqrt(9.91)]];
	      var random = Math.floor(Math.random() * 3);
	      this.xSpeed += newSpeeds[random][0];
	      this.ySpeed = newSpeeds[random][1];
	
	      if (this.ballX >= 225 && this.ballY <= 225) {
	        this.xSpeed = -this.xSpeed;
	      } else if (this.ballX >= 225 && this.ballY >= 225) {
	        this.xSpeed = -this.xSpeed;
	        this.ySpeed = -this.ySpeed;
	      } else if (this.ballX <= 225 && this.ballY >= 225) {
	        this.ySpeed = -this.ySpeed;
	      }
	    }
	  }, {
	    key: "ballSpeed",
	    value: function ballSpeed() {
	      this.ballX += this.xSpeed;
	      this.ballY += this.ySpeed;
	    }
	  }, {
	    key: "resetInitialSpeed",
	    value: function resetInitialSpeed() {
	      this.xSpeed = this.initialXSpeed;
	      this.YSpeed = this.initialYSpeed;
	    }
	  }, {
	    key: "drawInitialBall",
	    value: function drawInitialBall() {
	      this.ctxt.beginPath();
	      this.ctxt.arc(this.initialBallX, this.initialBallY, this.ballRadius, 0, TWO_PI, false);
	      this.ctxt.fillStyle = "black";
	      this.ctxt.fill();
	    }
	  }, {
	    key: "drawBall",
	    value: function drawBall() {
	      this.ctxt.beginPath();
	      this.ctxt.arc(this.ballX, this.ballY, this.ballRadius, 0, TWO_PI, false);
	      this.ctxt.fillStyle = "black";
	      this.ctxt.fill();
	    }
	  }]);
	
	  return Ball;
	}();
	
	exports.default = Ball;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map