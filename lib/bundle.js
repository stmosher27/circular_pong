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
	
	var Board = __webpack_require__(1);
	var Player = __webpack_require__(2);
	var Game = __webpack_require__(3);
	
	document.addEventListener('DOMContentLoaded', function () {
	  var board = new Board();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board() {
	    _classCallCheck(this, Board);
	
	    this.runGame = this.runGame.bind(this);
	    this.runGame();
	  }
	
	  _createClass(Board, [{
	    key: "runGame",
	    value: function runGame() {
	      var PI = Math.PI;
	      var TWO_PI = 2 * PI;
	
	      var WIDTH = 700;
	      var HEIGHT = 700;
	
	      window.onload = function () {
	        var canvas = document.getElementById("board");
	        var ctxt = canvas.getContext("2d");
	
	        var centerX = WIDTH / 2;
	        var centerY = HEIGHT / 2;
	
	        var boardX = WIDTH / 2;
	        var boardY = HEIGHT / 2;
	        var boardRadius = 300;
	
	        ctxt.beginPath();
	        ctxt.arc(boardX, boardY, boardRadius, 0, TWO_PI, false);
	        ctxt.fillStyle = "#1E90FF";
	        ctxt.fill();
	
	        var ballX = canvas.width / 2;
	        var ballY = canvas.width / 2;
	        var ballAngle = 45 * PI / 180;
	        var ballRadius = 20;
	
	        var paddleStart = 0;
	        var paddleEnd = TWO_PI / 10;
	
	        var paddleFlag = true;
	        var ballFlag = true;
	
	        function switchDirections(e) {
	          if (e.keyCode === 32) paddleFlag = !paddleFlag;
	        }
	
	        function checkCollision(angle, paddleStartAngle, paddleEndAngle, ballPosX, ballPosY) {
	          var newXPos = ballPosX - centerX;
	          var newYPos = ballPosY - centerY;
	          var disFromCenter = Math.sqrt(Math.pow(newXPos, 2) + Math.pow(newYPos, 2));
	
	          if (paddleStartAngle < 0) paddleStartAngle += 2 * PI;
	          if (paddleEndAngle < 0) paddleEndAngle += 2 * PI;
	
	          if (angle >= paddleStartAngle && angle <= paddleEndAngle && disFromCenter >= boardRadius - ballRadius && Math.ceil(disFromCenter) <= boardRadius) {
	            updateBall();
	          }
	
	          if (!(angle >= paddleStartAngle && angle <= paddleEndAngle) && Math.ceil(disFromCenter) >= boardRadius) {
	            console.log('lose');
	          }
	        }
	
	        window.addEventListener("keypress", switchDirections, false);
	
	        function updateBall() {
	          ballFlag = !ballFlag;
	          ballAngle += PI;
	          if (ballAngle >= 2 * PI) ballAngle -= 2 * PI;
	        }
	
	        function updatePaddle() {
	          if (paddleFlag) {
	            paddleStart += .05;
	            paddleEnd += .05;
	            if (paddleStart >= 2 * PI) paddleStart -= 2 * PI;
	            if (paddleEnd >= 2 * PI) paddleEnd -= 2 * PI;
	          } else {
	            paddleStart -= .05;
	            paddleEnd -= .05;
	            if (paddleStart <= -2 * PI) {
	              paddleStart += 2 * PI;
	            }
	            if (paddleEnd <= -2 * PI) paddleEnd += 2 * PI;
	          }
	        }
	
	        setInterval(function () {
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
	  }]);
	
	  return Board;
	}();
	
	module.exports = Board;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map