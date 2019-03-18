/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Player = __webpack_require__(/*! ./player */ "./src/player.js");

var Zombie = __webpack_require__(/*! ./zombie */ "./src/zombie.js");

var Map = __webpack_require__(/*! ./map */ "./src/map.js");

var maps = __webpack_require__(/*! ./maps */ "./src/maps.js");

function Game(context) {
  var _this = this;

  this.level = 0;

  var requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();

  var colorArray = ['#060606', '#020202', '#000000', '#000000', '#000000', '#000000'];
  var mapArray = [maps.map1, maps.map2, maps.map3, maps.map4, maps.map5, maps.map6];
  var player;
  var gameMap;

  Game.prototype.init = function (level) {
    gameMap = new Map(mapArray[_this.level], colorArray[_this.level]);
    gameMap.generate();
    player = new Player(context, 0, 60, 200, '#797939', 'black', gameMap, _this.level);
  };

  Game.prototype.update = function () {
    player.update();
  };

  Game.prototype.draw = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    player.draw();
    context.drawImage(gameMap.image, player.x - canvasWidth / 2, player.y - canvasWidth / 2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
  };

  Game.prototype.winner = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = "45px Arima Madurai";
    context.fillStyle = "white";
    context.fillText("You won!", 200, canvasHeight / 2 + 50);
  };

  Game.prototype.welcome = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = "30px Arima Madurai";
    context.fillStyle = "#b7b7b7";
    context.fillText("this is sliver.", 0, 200);
    context.fillText("find the key.", 0, 250);
    context.fillText("find the way out.", 0, 300);
  };

  Game.prototype.batteries = function () {
    context.fillText("don't run out of batteries.", 0, 350);
  };

  Game.prototype.controls = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = "45px Arima Madurai";
    context.fillStyle = "#b7b7b7";
    context.fillText("controls", canvasWidth / 2 - 80, 100);
    context.font = "30px Arima Madurai";
    context.fillText("up (w)", canvasWidth / 2 - 45, 200);
    context.fillText("left (a) / down (s) / right (d)", canvasWidth / 2 - 180, 250);
    context.fillText("look around (mouse)", canvasWidth / 2 - 130, 350);
    context.fillText("sprint (space)", canvasWidth / 2 - 80, 400);
    context.fillText("items (numbers 1-9)", canvasWidth / 2 - 130, 500);
  };

  Game.prototype.animate = function () {
    requestAnimFrame(_this.animate);

    _this.update();

    _this.draw();

    if (player.exit === true && _this.level < 6) {
      _this.level += 1;

      _this.init(_this.level);
    }

    if (_this.level === 6) {
      _this.winner();
    }
  };

  Game.prototype.play = function () {
    _this.welcome();

    setTimeout(_this.batteries, 3000);
    setTimeout(_this.controls, 7000);
    setTimeout(_this.init, 12000);
    setTimeout(_this.animate, 13000);
  };
}

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(/*! ./game */ "./src/game.js");

var Maps = __webpack_require__(/*! ./maps */ "./src/maps.js");

document.addEventListener("DOMContentLoaded", function (event) {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  window.canvasWidth = context.canvas.width;
  window.canvasHeight = context.canvas.height;
  window.mouse = {
    x: canvasWidth / 2,
    y: 0
  };

  var getMousePos = function getMousePos(canvas, e) {
    var canvasBoundary = canvas.getBoundingClientRect();
    return {
      x: e.clientX - canvasBoundary.left,
      y: e.clientY - canvasBoundary.top
    };
  };

  addEventListener('mousemove', function (e) {
    var pos = getMousePos(canvas, e);
    mouse.x = pos.x;
    mouse.y = pos.y;
  }); // Play game

  var game = new Game(context);
  setTimeout(game.play, 8000);
});

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Sprite = __webpack_require__(/*! ./sprite */ "./src/sprite.js");

function Map(inputMap, color) {
  var _this = this;

  this.map = inputMap;
  this.rowWidth = 100;
  this.rowHeight = 100;
  this.width = inputMap[0].length * this.rowWidth;
  this.height = inputMap.length * this.rowHeight;
  this.color = color;

  Map.prototype.generate = function () {
    var context = document.createElement("canvas").getContext("2d");
    context.canvas.width = _this.width;
    context.canvas.height = _this.height;
    var color = _this.color;
    context.save();

    for (var x = 0, i = 0; i < _this.map[0].length; x += _this.rowWidth, i++) {
      for (var y = 0, j = 0; j < _this.map.length; y += _this.rowHeight, j++) {
        if (_this.map[j][i] === 1) {
          context.beginPath();
          context.rect(x, y, _this.rowWidth, _this.rowHeight);
          context.fillStyle = color;
          context.fill();
          context.closePath();
        } else if (_this.map[j][i] === 2) {
          context.beginPath();
          context.rect(x, y, _this.rowWidth, _this.rowHeight);
          context.fillStyle = "#333838";
          context.fill();
          context.closePath();
        } else if (_this.map[j][i] === 'b') {
          var battery = document.getElementById('battery');
          context.save();
          context.drawImage(battery, 0, 0, 30, 30, i * 100 + 35, j * 100 + 35, 30, 30);
          context.restore();
        } else if (_this.map[j][i] === 'l') {
          var lantern = document.getElementById('lantern');
          context.save();
          context.drawImage(lantern, 0, 0, 46, 43, i * 100 + 35, j * 100 + 30, 46, 43);
          context.restore();
        } else if (_this.map[j][i] === 'k') {
          var key = document.getElementById('key');
          context.save();
          context.drawImage(key, 0, 0, 40, 48, i * 100 + 35, j * 100 + 30, 40, 48);
          context.restore();
        } else if (_this.map[j][i] === 'e' || _this.map[j][i] === 'p') {
          var portal = document.getElementById('portal');
          context.save();
          context.drawImage(portal, 0, 0, 50, 50, i * 100 + 35, j * 100 + 30, 50, 50);
          context.restore();
        }
      }
    }

    context.restore();
    _this.image = new Image();
    _this.image.src = context.canvas.toDataURL("image/png");
    context = null;
  };
}

;
module.exports = Map;

/***/ }),

/***/ "./src/maps.js":
/*!*********************!*\
  !*** ./src/maps.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

var map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 0, 'b', 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 0, 'k', 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'e', 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map2 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 'l', 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 'b', 0, 0, 0, 0, 0, 0, 1, 0, 'k', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'e', 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map3 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 'e', 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 'b', 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 'b', 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 'l', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'b', 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 'b', 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 'k', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map4 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 'k', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 'b', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 'b', 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 'l', 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 'e', 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 'b', 1, 1, 0, 1, 1, 0, 1, 1, 'b', 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map5 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 'e', 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 'l', 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 'b', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'k', 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 0, 0, 1, 0, 'b', 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 'b', 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map6 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'e', 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 'b', 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 'b', 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'b', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 'l', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'b', 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 'k', 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 'b', 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 'b', 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.map1 = map1;
exports.map2 = map2;
exports.map3 = map3;
exports.map4 = map4;
exports.map5 = map5;
exports.map6 = map6;

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Player(context, centerDegree, flashlightWidth, radius, color, color2, map, level) {
  var _this = this;

  this.c = context;
  this.x = canvasWidth / 2;
  this.y = canvasHeight / 2;
  this.radius = radius;
  this.currentRadius = radius;
  this.color = color;
  this.color2 = color2;
  this.map = map;
  this.startItems = [' 1. Off', ' 2. Hi-Beam', ' 3. Normal'];
  this.items = [];
  this.keys = [];
  this.exit = false;
  this.level = level;
  this.flashlightWidth = flashlightWidth;
  this.centerDegree = centerDegree;
  this.degreeOfRotation = 4;
  this.stepOfMovement = 3; // 1.7;

  this.flashlightAngle = this.flashlightWidth * Math.PI / 180;
  this.jumpPower = 100;
  this.batteryPower = 200;
  this.batteryDrain = 0.01;
  var keysDown = {};
  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  });
  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  });

  Player.prototype.drawPlayer = function (direction) {
    // const sprite = document.getElementById('sprite');
    _this.c.save();

    _this.c.beginPath(canvasWidth / 2, canvasHeight / 2);

    _this.c.arc(canvasWidth / 2, canvasHeight / 2, _this.currentRadius, _this.startAngle, _this.endAngle, false);

    _this.c.lineTo(canvasWidth / 2, canvasHeight / 2);

    _this.c.fillStyle = _this.grad;

    _this.c.fill();

    _this.drawSprite();

    _this.c.restore();

    if (_this.batteryPower > 0) {
      _this.batteryPower -= _this.batteryDrain;
    } else {
      _this.batteryPower = 0;
      _this.currentRadius = 0;
      _this.batteryDrain = 0;
    }
  };

  Player.prototype.drawSprite = function () {
    var sprite = document.getElementById('sprite');

    _this.c.save();

    _this.c.translate((canvasWidth + 3) / 2, (canvasHeight - 6) / 2);

    _this.c.rotate(_this.directionFacing);

    _this.c.drawImage(sprite, 0, 0, 305, 231, -34, -12, 30, 23);

    _this.c.restore();
  };

  Player.prototype.regenerate = function () {
    if (_this.jumpPower < 100) {
      _this.jumpPower += 1;
    }
  };

  Player.prototype.createGradient = function (inputRadius, color1, color2) {
    _this.grad = _this.c.createRadialGradient(canvasWidth / 2, canvasHeight / 2, inputRadius / 5, canvasWidth / 2, canvasHeight / 2, inputRadius);

    _this.grad.addColorStop(0, color1);

    _this.grad.addColorStop(1, color2);
  };

  Player.prototype.intersectsMap = function (x, y, map) {
    var xTile = ~~(x / 100);
    var yTile = ~~(y / 100);

    if (map.map[yTile][xTile] === 1) {
      return true;
    } else if (map.map[yTile][xTile] === 'b') {
      _this.items.push("5. Battery");

      map.map[yTile][xTile] = 0;
      return false;
    } else if (map.map[yTile][xTile] === 'l') {
      _this.items.push("4. Lantern");

      map.map[yTile][xTile] = 0;
      return false;
    } else if (map.map[yTile][xTile] === 'k') {
      _this.keys[0] = "Key";
      map.map[yTile][xTile] = 0;
      return false;
    } else if (map.map[yTile][xTile] === 'e' && _this.keys[0] === "Key") {
      _this.exit = true;
      map.map[yTile][xTile] = 0;
      return false;
    } else {
      return false;
    }
  };

  Player.prototype.movePlayer = function () {
    if (38 in keysDown || 87 in keysDown) {
      // === UP
      if (_this.y > 5 && _this.intersectsMap(_this.x, _this.y - 10, _this.map) === false) {
        if (32 in keysDown && _this.jumpPower > 6) {
          _this.y -= _this.stepOfMovement * 2;
          _this.jumpPower -= 5;
        } else {
          _this.y -= _this.stepOfMovement;
        }
      }
    }

    if (40 in keysDown || 83 in keysDown) {
      // === DOWN
      if (_this.y < _this.map.height - 5 && _this.intersectsMap(_this.x, _this.y + 10, _this.map) === false) {
        if (32 in keysDown && _this.jumpPower > 5) {
          _this.y += _this.stepOfMovement * 2;
          _this.jumpPower -= 5;
        } else {
          _this.y += _this.stepOfMovement;
        }
      }
    }

    if (37 in keysDown || 65 in keysDown) {
      // === LEFT
      if (_this.x > 5 && _this.intersectsMap(_this.x - 10, _this.y, _this.map) === false) {
        if (32 in keysDown && _this.jumpPower > 5) {
          _this.x -= _this.stepOfMovement * 2;
          _this.jumpPower -= 5;
        } else {
          _this.x -= _this.stepOfMovement;
        }
      }
    }

    if (39 in keysDown || 68 in keysDown) {
      // === RIGHT
      if (_this.x < _this.map.width - 5 && _this.intersectsMap(_this.x + 10, _this.y, _this.map) === false) {
        if (32 in keysDown && _this.jumpPower > 5) {
          _this.x += _this.stepOfMovement * 2;
          _this.jumpPower -= 5;
        } else {
          _this.x += _this.stepOfMovement;
        }
      }
    }
  };

  Player.prototype.getTheta = function (cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 90) theta = 360 + theta;
    return theta - 90;
  };

  Player.prototype.moveFlashlight = function () {
    var theta = _this.getTheta(mouse.x, mouse.y, canvasWidth / 2, canvasHeight / 2);

    var delta = (_this.centerDegree - theta) % 360;

    if (delta <= -355 && delta <= 5) {
      _this.centerDegree += theta;
    } else if (delta > -180 && delta < -5 || delta > 180 && delta < 360) {
      _this.centerDegree += _this.degreeOfRotation;
    } else if (delta <= -180 && delta > -355 || delta > 5 && delta < 180) {
      _this.centerDegree -= _this.degreeOfRotation;
    }

    _this.directionFacing = (_this.centerDegree % 360 - 90) * Math.PI / 180;
    _this.startAngle = _this.directionFacing - _this.flashlightAngle / 2;
    _this.endAngle = _this.directionFacing + _this.flashlightAngle / 2;
  };

  Player.prototype.useItems = function () {
    if (_this.batteryPower > 0) {
      if (49 in keysDown) {
        // === 1
        _this.currentRadius = 0;
        _this.flashlightAngle = _this.flashlightWidth * Math.PI / 180;
        _this.batteryDrain = 0;
      } else if (50 in keysDown) {
        // === 2
        _this.currentRadius = _this.radius * 2;
        _this.flashlightAngle = _this.flashlightWidth * Math.PI / 180;
        _this.batteryDrain = 0.05;
      } else if (51 in keysDown) {
        // === 3
        _this.currentRadius = _this.radius;
        _this.flashlightAngle = _this.flashlightWidth * Math.PI / 180;
        _this.batteryDrain = 0.01;
      } else if (52 in keysDown && _this.items.includes("4. Lantern")) {
        // === 4
        _this.currentRadius = _this.radius * 0.7;
        _this.flashlightAngle = 360 * Math.PI / 180;
      }
    }

    if (53 in keysDown && _this.items.includes("5. Battery")) {
      // === 5
      _this.batteryPower += 50;

      _this.items.splice(_this.items.indexOf("5. Battery"), 1);
    }
  };

  Player.prototype.drawStats = function () {
    var canvas2 = document.getElementById("battery-level");
    var context2 = canvas2.getContext("2d");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.font = "15px Arima Madurai";
    context2.fillStyle = "white"; // context2.textAlign = "left";

    context2.fillText("Level: ".concat(_this.level + 1), 0, 25);
    context2.fillText("Sprint: ".concat(_this.jumpPower), 0, 50);

    if (_this.keys[0] === 'Key') {
      context2.fillStyle = "#F8Cf5F";
    }

    context2.fillText("".concat(_this.keys[0] || "Key: Missing"), 0, 100);
    context2.fillStyle = "white";
    context2.fillText("Flashlight", 150, 25);
    context2.fillText("".concat(_this.startItems[0]), 150, 50);
    context2.fillText("".concat(_this.startItems[1]), 150, 75);
    context2.fillText("".concat(_this.startItems[2]), 150, 100);
    context2.fillText("Items", 275, 25);
    context2.fillText("".concat(_this.items[0] || ""), 275, 50);
    context2.fillText("".concat(_this.items[1] || ""), 275, 75);
    context2.fillText("".concat(_this.items[2] || ""), 275, 100);
    context2.fillText("Objective", 375, 25);
    context2.fillText("Objective", 375, 25);

    if (_this.keys[0] === 'Key') {
      context2.fillText("Find the Exit", 375, 50);
    } else {
      context2.fillText("Find the Key", 375, 50);
    }

    if (_this.batteryPower < 50) {
      context2.fillStyle = "#C53426";
    } else if (_this.batteryPower < 100) {
      context2.fillStyle = "#F8Cf5F";
    } else if (_this.batteryPower > 150) {
      context2.fillStyle = "#63d26e";
    }

    context2.fillText("Battery: ".concat(Math.floor(_this.batteryPower)), 0, 75);
  };

  Player.prototype.update = function () {
    _this.movePlayer();

    _this.moveFlashlight();

    _this.useItems();

    _this.regenerate();

    _this.createGradient(_this.currentRadius, _this.color, _this.color2);
  };

  Player.prototype.draw = function () {
    _this.drawPlayer(_this.directionFacing);

    _this.drawStats();
  };
}

module.exports = Player;

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Sprite() {
  var coin, coinImage, canvas;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    coin.update();
    coin.render();
  }

  function sprite(options) {
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function () {
      tickCount += 1;

      if (tickCount > ticksPerFrame) {
        tickCount = 0; // If the current frame index is in range

        if (frameIndex < numberOfFrames - 1) {
          // Go to the next frame
          frameIndex += 1;
        } else {
          frameIndex = 0;
        }
      }
    };

    that.render = function () {
      // Clear the canvas
      that.context.clearRect(0, 0, that.width, that.height); // Draw the animation

      that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, that.height, 0, 0, that.width / numberOfFrames, that.height);
    };

    return that;
  } // Get canvas


  canvas = document.getElementById("battery-level");
  canvas.width = 10;
  canvas.height = 10; // Create sprite sheet

  coinImage = new Image(); // Create sprite

  coin = sprite({
    context: canvas.getContext("2d"),
    width: 1000,
    height: 100,
    image: coinImage,
    numberOfFrames: 10,
    ticksPerFrame: 4
  }); // Load sprite sheet

  coinImage.addEventListener("load", gameLoop);
  coinImage.src = "../src/images/coin.png";
}

module.exports = Sprite;

/***/ }),

/***/ "./src/zombie.js":
/*!***********************!*\
  !*** ./src/zombie.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Zombie(context, map) {
  var _this = this;

  this.c = context;
  this.x = canvasWidth - 40;
  this.y = canvasHeight - 40;
  this.map = map;
  this.stepOfMovement = 4; // 1.7;

  Zombie.prototype.drawZombie = function (direction) {
    var zombie = document.getElementById('zombie');

    _this.c.save(); // this.c.rotate(this.directionFacing);


    _this.c.drawImage(zombie, 0, 0, 305, 231, 0, 0, 30, 23);

    _this.c.restore();
  };

  Zombie.prototype.intersectsMap = function (x, y, map) {
    var xTile = ~~(x / 100);
    var yTile = ~~(y / 100);

    if (map.map[yTile][xTile] === 1) {
      return true;
    } else {
      return false;
    }
  };

  Zombie.prototype.moveZombie = function () {
    switch (Math.floor(Math.random()) * 4) {
      case 0:
        if (_this.y > 5 && _this.intersectsMap(_this.x, _this.y - 10, _this.map) === false) {
          _this.y -= _this.stepOfMovement; // UP
        }

        break;

      case 1:
        if (_this.y < _this.map.height - 5 && _this.intersectsMap(_this.x, _this.y + 10, _this.map) === false) {
          _this.y += _this.stepOfMovement; // DOWN
        }

        break;

      case 2:
        if (_this.x > 5 && _this.intersectsMap(_this.x - 10, _this.y, _this.map) === false) {
          _this.x -= _this.stepOfMovement; // LEFT
        }

        break;

      case 3:
        if (_this.x < _this.map.width - 5 && _this.intersectsMap(_this.x + 10, _this.y, _this.map) === false) {
          _this.x += _this.stepOfMovement; // RIGHT
        }

        ;
        break;
    }
  };

  Zombie.prototype.moveFlashlight = function () {
    var delta = (_this.centerDegree - theta) % 360;
    _this.directionFacing = (_this.centerDegree % 360 - 90) * Math.PI / 180;
  };

  Zombie.prototype.update = function () {
    _this.moveZombie();

    console.log(_this.x, _this.y);
  };

  Zombie.prototype.draw = function () {
    _this.drawZombie(_this.directionFacing);
  };
}

module.exports = Zombie;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map