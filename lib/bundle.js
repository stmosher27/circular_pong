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
	    this.gameOver = false;
	    window.addEventListener("keypress", this.startGame.bind(this));
	    this.renderInitialState();
	  }
	
	  _createClass(Game, [{
	    key: 'startGame',
	    value: function startGame(e) {
	      if (e.keyCode === 13 && !this.gameOver) {
	        this.runGame();
	      } else if (e.keyCode === 13) {
	        this.runGame();
	      }
	
	      // window.requestAnimationFrame(this.runGame);
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
	      if (this.ball.ballAngle >= this.player.paddleStart && this.ball.ballAngle <= this.player.paddleEnd && disFromCenter >= this.board.boardRadius - this.ball.ballRadius && Math.ceil(disFromCenter) <= this.board.boardRadius && this.collidedWith) {
	        this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
	        this.ball.updateSpeed();
	        this.ball.updateBall();
	        this.collidedWith = false;
	        this.score += 1;
	      }
	
	      if (this.player.paddleStart >= 3 * PI / 2 && this.player.paddleEnd <= PI / 2 && disFromCenter >= this.board.boardRadius - this.ball.ballRadius && Math.ceil(disFromCenter) <= this.board.boardRadius) {
	        if ((this.ball.ballAngle <= this.player.paddleEnd || this.ball.ballAngle >= this.player.paddleStart) && this.collidedWith) {
	          this.ball.updateAngle(this.board.boardRadius, this.board.centerY);
	          this.ball.updateSpeed();
	          this.ball.updateBall();
	          this.collidedWith = false;
	        }
	      }
	
	      if (!(this.ball.ballAngle >= this.player.paddleStart && this.ball.ballAngle <= this.player.paddleEnd) && Math.ceil(disFromCenter) >= this.board.boardRadius) {
	        console.log(this.score);
	        clearInterval(this.int);
	        this.gameOver = true;
	      }
	    }
	  }, {
	    key: 'renderInitialState',
	    value: function renderInitialState() {
	      this.board.drawCircle();
	      this.board.clearBorder();
	
	      this.ball.drawBall();
	
	      this.player.drawPaddle(this.board.boardRadius, this.board.boardX, this.board.boardY);
	    }
	  }, {
	    key: 'runGame',
	    value: function runGame() {
	      var _this = this;
	
	      this.board.drawCircle();
	
	      this.int = setInterval(function () {
	        _this.board.setBackground();
	
	        _this.ball.ballSpeed();
	
	        _this.board.drawCircle();
	        _this.board.clearBorder();
	
	        _this.ball.drawBall();
	
	        _this.player.updatePaddle();
	        _this.player.drawPaddle(_this.board.boardRadius, _this.board.boardX, _this.board.boardY);
	
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
	    this.WIDTH = 700;
	    this.HEIGHT = 700;
	
	    this.centerX = this.WIDTH / 2;
	    this.centerY = this.HEIGHT / 2;
	
	    this.boardX = this.WIDTH / 2;
	    this.boardY = this.HEIGHT / 2;
	    this.boardRadius = 300;
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
	      this.ctxt.lineWidth = 21;
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
	
	    this.paddleFlag = true;
	    window.addEventListener("keypress", this.switchDirections.bind(this));
	  }
	
	  _createClass(Player, [{
	    key: "switchDirections",
	    value: function switchDirections(e) {
	      if (e.keyCode === 32) this.paddleFlag = !this.paddleFlag;
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
	  }, {
	    key: "drawPaddle",
	    value: function drawPaddle(boardRadius, boardX, boardY) {
	      this.ctxt.beginPath();
	      this.ctxt.arc(boardX, boardY, boardRadius, this.paddleStart, this.paddleEnd, false);
	      this.ctxt.strokeStyle = "black";
	      this.ctxt.lineWidth = 20;
	      this.ctxt.stroke();
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
	    this.ballX = this.canvas.width / 2;
	    this.ballY = canvas.width / 2;
	    this.xSpeed = 5;
	    this.ySpeed = 5;
	    this.ballAngle = 45 * PI / 180;
	    this.ballRadius = 20;
	
	    this.ballFlag = true;
	  }
	
	  _createClass(Ball, [{
	    key: "updateAngle",
	    value: function updateAngle(radius, centerY) {
	      this.ballAngle = Math.asin((this.ballY - centerY) / radius);
	      if (this.ballAngle < 0) this.ballAngle = Math.abs(this.ballAngle);
	      if (this.ballX <= 300 && this.ballY >= 300) this.ballAngle = PI - this.ballAngle;
	      if (this.ballX < 300 && this.ballY < 300) this.ballAngle += PI;
	      if (this.ballX >= 300 && this.ballY <= 300) this.ballAngle += 3 * PI / 2;
	      if (this.ballAngle >= TWO_PI) this.ballAngle -= TWO_PI;
	    }
	  }, {
	    key: "updateBall",
	    value: function updateBall() {
	      this.ballFlag = !this.ballFlag;
	    }
	  }, {
	    key: "updateSpeed",
	    value: function updateSpeed() {
	      this.xSpeed += .5;
	      this.ySpeed -= .5;
	    }
	  }, {
	    key: "ballSpeed",
	    value: function ballSpeed() {
	      if (this.ballFlag) {
	        this.ballX += this.xSpeed;
	        this.ballY += this.ySpeed;
	      } else {
	        this.ballX -= this.xSpeed;
	        this.ballY -= this.ySpeed;
	      }
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