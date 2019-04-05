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

var Welcome = __webpack_require__(/*! ./welcome */ "./src/welcome.js");

var Sound = __webpack_require__(/*! ./sound */ "./src/sound.js");

function Game(context) {
  var _this = this;

  this.level = 0;

  var requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();

  var mapArray = [maps.map1, maps.map2, maps.map3, maps.map4, maps.map5, maps.map6];
  var originalMaps = [JSON.parse(JSON.stringify(maps.map1)), JSON.parse(JSON.stringify(maps.map2)), JSON.parse(JSON.stringify(maps.map3)), JSON.parse(JSON.stringify(maps.map4)), JSON.parse(JSON.stringify(maps.map5)), JSON.parse(JSON.stringify(maps.map6))];
  var mute = false;
  var player;
  var gameMap;
  var zombie1;
  var welcome = new Welcome(context);
  var zombieSound = new Sound('./images/zombie.m4a');
  var dungeonSound = new Sound('./images/dripping.mp3');
  var levelUpSound = new Sound('./images/teleport.wav');
  var canvasMute = document.getElementById("canvas-mute");
  canvasMute.addEventListener('click', function (e) {
    mute = !mute;
    player.mute = !player.mute;

    if (!mute) {
      dungeonSound.play();
    } else {
      dungeonSound.stop();
    }
  });

  Game.prototype.init = function () {
    if (!mute) dungeonSound.play();
    gameMap = new Map(mapArray[_this.level], '#000000');
    gameMap.generate();
    player = new Player(context, 0, 60, 300, gameMap, _this.level, mute);

    var random = _this.randomSpot();

    zombie1 = new Zombie(context, gameMap, player, random[0] + 50, random[1] + 50);
  };

  Game.prototype.randomSpot = function () {
    return gameMap.blankSpots[Math.floor(Math.random() * gameMap.blankSpots.length)];
  };

  Game.prototype.update = function () {
    zombie1.update();

    if (Math.abs(player.x - zombie1.x) < 30 && Math.abs(player.y - zombie1.y) < 30) {
      _this.level = -1;
      player.level = -1;
    }

    if (Math.abs(player.x - zombie1.x) < 400 && Math.abs(player.y - zombie1.y) < 400) {
      player.zombieNearby = true;

      if (mute) {
        zombieSound.stop();
      } else {
        zombieSound.play();
      }
    } else {
      zombieSound.stop();
      player.zombieNearby = false;
    }

    var canvasMute = document.getElementById("canvas-mute");
    var context4 = canvasMute.getContext('2d');
    context4.clearRect(0, 0, canvasWidth, canvasHeight);
    context4.font = "25px Arima Madurai";
    context4.fillStyle = "white";

    if (mute) {
      context4.fillText("\uD83D\uDD07", 50, 25);
    } else {
      context4.fillText("\uD83D\uDD08", 50, 25);
    }
  };

  Game.prototype.shade = function () {
    context.drawImage(gameMap.image, player.x - canvasWidth / 2, player.y - canvasWidth / 2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    zombie1.draw();
    context.save();
    var gradient = context.createRadialGradient(canvasWidth / 2, canvasHeight / 2, player.currentRadius / 5, canvasWidth / 2, canvasHeight / 2, player.currentRadius);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "#000");
    context.beginPath(canvasWidth / 2, canvasHeight / 2);
    context.arc(canvasWidth / 2, canvasHeight / 2, canvasHeight, player.startAngle, player.endAngle, false);
    context.lineTo(canvasWidth / 2, canvasHeight / 2);
    context.fillStyle = gradient;
    context.fill();
    context.restore();
    context.save();
    context.beginPath(canvasWidth / 2, canvasHeight / 2);
    context.arc(canvasWidth / 2, canvasHeight / 2, canvasHeight, player.endAngle, player.startAngle, false);
    context.lineTo(canvasWidth / 2, canvasHeight / 2);
    context.fillStyle = "#000";
    context.fill();
    context.restore();
  };

  Game.prototype.draw = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    player.draw();

    _this.shade();

    player.drawSprite();
  };

  Game.prototype.animate = function () {
    requestAnimFrame(_this.animate);

    _this.update();

    _this.draw();

    if (player.exit === true && _this.level < 6) {
      _this.level += 1;
      if (!mute) levelUpSound.play();

      _this.init();
    }

    if (_this.level === 6) {
      welcome.winner();
    }

    if (player.continue === true && _this.level === -1) {
      _this.level = 0;
      mapArray[0] = JSON.parse(JSON.stringify(originalMaps[0]));
      mapArray[1] = JSON.parse(JSON.stringify(originalMaps[1]));
      mapArray[2] = JSON.parse(JSON.stringify(originalMaps[2]));
      mapArray[3] = JSON.parse(JSON.stringify(originalMaps[3]));
      mapArray[4] = JSON.parse(JSON.stringify(originalMaps[4]));
      mapArray[5] = JSON.parse(JSON.stringify(originalMaps[5]));
      if (!mute) levelUpSound.play();

      _this.init();
    }

    if (_this.level === -1) {
      welcome.loser();
    }
  };

  ;

  Game.prototype.play = function () {
    setTimeout(welcome.draw, 6000);
    setTimeout(_this.init, 10000);
    setTimeout(_this.animate, 10500); // this.init();
    // this.animate();
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
  });
  var game = new Game(context);
  game.play();
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

  this.map = [].concat(inputMap);
  this.rowWidth = 120;
  this.rowHeight = 120;
  this.width = inputMap[0].length * this.rowWidth;
  this.height = inputMap.length * this.rowHeight;
  this.color = color;
  this.blankSpots = [];

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
          context.save();
          var battery = document.getElementById("battery");
          context.drawImage(battery, 0, 0, 120, 120, i * 120, j * 120, 120, 120);
          context.restore();
        } else if (_this.map[j][i] === 'l') {
          context.save();
          var lantern = document.getElementById("lantern");
          context.drawImage(lantern, 0, 0, 120, 120, i * 120, j * 120, 120, 120);
          context.restore();
        } else if (_this.map[j][i] === 'k') {
          context.save();
          var key = document.getElementById("key");
          context.drawImage(key, 0, 0, 120, 120, i * 120, j * 120, 120, 120);
          context.restore();
        } else if (_this.map[j][i] === 'e' || _this.map[j][i] === 'p') {
          context.save();
          ;
          var portal = document.getElementById("portal");
          context.drawImage(portal, 0, 0, 120, 120, i * 120, j * 120, 120, 120);
          context.restore();
        } else {
          context.save();
          var floor = document.getElementById("floor");
          context.drawImage(floor, 0, 0, 60, 60, i * 120, j * 120, 60, 60);
          context.drawImage(floor, 0, 0, 60, 60, i * 120, j * 120 + 60, 60, 60);
          context.drawImage(floor, 0, 0, 60, 60, i * 120 + 60, j * 120, 60, 60);
          context.drawImage(floor, 0, 0, 60, 60, i * 120 + 60, j * 120 + 60, 60, 60);
          context.restore();

          _this.blankSpots.push([x, y]);
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

var map0 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var map1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 'l', 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 0, 0, 0, 0, 'b', 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 0, 'k', 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'e', 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map2 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 'b', 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 'l', 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 'b', 0, 0, 0, 0, 0, 0, 1, 0, 'k', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'e', 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map3 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 'e', 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 'b', 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 'b', 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 'l', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'b', 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 'b', 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 'k', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map4 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 'k', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 'b', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 'b', 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 'l', 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 'e', 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 'b', 1, 1, 0, 1, 1, 0, 1, 1, 'b', 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map5 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 'e', 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 'l', 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 'b', 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'k', 0, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 0, 0, 1, 0, 'b', 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 'b', 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map6 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'e', 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 'b', 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 'b', 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'b', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 'l', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'b', 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1], [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 'k', 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 'b', 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 'b', 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.map0 = map0;
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
/***/ (function(module, exports, __webpack_require__) {

var Sound = __webpack_require__(/*! ./sound */ "./src/sound.js");

function Player(context, centerDegree, flashlightWidth, radius, map, level, mute) {
  var _this = this;

  this.c = context;
  this.x = canvasWidth / 2;
  this.y = canvasHeight / 2;
  this.radius = radius;
  this.currentRadius = radius;
  this.map = map;
  this.startItems = [' [1] Off', ' [2] Hi-Beam', ' [3] Normal'];
  this.items = [];
  this.keys = [];
  this.exit = false;
  this.mute = mute;
  this.continue = false;
  this.zombieNearby = false;
  this.level = level;
  this.flashlightWidth = flashlightWidth;
  this.centerDegree = centerDegree;
  this.degreeOfRotation = 4;
  this.stepOfMovement = 3; // 1.7;

  this.flashlightAngle = this.flashlightWidth * Math.PI / 180;
  this.directionFacing = (this.centerDegree % 360 - 90) * Math.PI / 180;
  this.startAngle = this.directionFacing - this.flashlightAngle / 2;
  this.endAngle = this.directionFacing + this.flashlightAngle / 2;
  this.jumpPower = 100;
  this.batteryPower = 200;
  this.batteryDrain = 0.01;
  var itemSound = new Sound('./images/item.mp3');
  var keysDown = {};
  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  });
  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  });

  Player.prototype.drawSprite = function () {
    var sprite = new Image();
    sprite.src = './images/player.png';

    _this.c.save();

    _this.c.translate((canvasWidth + 3) / 2, (canvasHeight - 6) / 2);

    _this.c.rotate(_this.directionFacing);

    _this.c.drawImage(sprite, 0, 0, 305, 231, -40, -14, 40, 30);

    _this.c.restore();
  };

  Player.prototype.regenerate = function () {
    if (_this.batteryPower > 0) {
      _this.batteryPower -= _this.batteryDrain;
    } else {
      _this.batteryPower = 0;
      _this.currentRadius = 0;
      _this.batteryDrain = 0;
    }

    if (_this.jumpPower < 100) {
      _this.jumpPower += 1;
    }
  };

  Player.prototype.intersectsMap = function (x, y, map) {
    var xTile = ~~(x / 120);
    var yTile = ~~(y / 120);

    if (map.map[yTile][xTile] === 1) {
      return true;
    } else if (map.map[yTile][xTile] === 'b') {
      if (!_this.mute) itemSound.play();

      _this.items.push("[5] Battery");

      map.map[yTile][xTile] = 0;

      _this.c.drawImage(map.image, _this.x - canvasWidth / 2, _this.y - canvasWidth / 2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      _this.map.generate();
    } else if (map.map[yTile][xTile] === 'l') {
      if (!_this.mute) itemSound.play();

      _this.items.push("[4] Lantern");

      map.map[yTile][xTile] = 0;

      _this.c.drawImage(map.image, _this.x - canvasWidth / 2, _this.y - canvasWidth / 2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      _this.map.generate();
    } else if (map.map[yTile][xTile] === 'k') {
      if (!_this.mute) itemSound.play();
      _this.keys[0] = "In Inventory";

      _this.items.push("Golden Key");

      map.map[yTile][xTile] = 0;

      _this.c.drawImage(map.image, _this.x - canvasWidth / 2, _this.y - canvasWidth / 2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      _this.map.generate();
    } else if (map.map[yTile][xTile] === 'e' && _this.keys[0] === "In Inventory") {
      _this.exit = true;
      map.map[yTile][xTile] = 0;
    }

    return false;
  };

  Player.prototype.movePlayer = function () {
    if (13 in keysDown && _this.level === -1) {
      _this.continue = true;
    }

    if (38 in keysDown || 87 in keysDown) {
      // === UP
      if (_this.y > 5 && _this.intersectsMap(_this.x, _this.y - 10, _this.map) === false) {
        if ((32 in keysDown || 16 in keysDown) && _this.jumpPower > 6) {
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
        if ((32 in keysDown || 16 in keysDown) && _this.jumpPower > 5) {
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
        if ((32 in keysDown || 16 in keysDown) && _this.jumpPower > 5) {
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
        if ((32 in keysDown || 16 in keysDown) && _this.jumpPower > 5) {
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
      } else if (52 in keysDown && _this.items.includes("[4] Lantern")) {
        // === 4
        _this.currentRadius = _this.radius * 0.7;
        _this.flashlightAngle = 360 * Math.PI / 180;
      }
    }

    if (53 in keysDown && _this.items.includes("[5] Battery")) {
      // === 5
      _this.batteryPower += 50;

      _this.items.splice(_this.items.indexOf("[5] Battery"), 1);
    }
  };

  Player.prototype.drawLeftStats = function () {
    var canvas2 = document.getElementById("canvas-left");
    var context2 = canvas2.getContext("2d");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.font = "20px Arima Madurai";
    context2.fillStyle = "white";
    context2.fillText("Up: W", 0, 150);
    context2.fillText("Left: A", 0, 175);
    context2.fillText("Down: S", 0, 200);
    context2.fillText("Right: D", 0, 225);
    context2.fillText("Sprint: Shift", 0, 250);
    context2.fillText("Items: 1-5", 0, 275);

    if (_this.keys[0] === 'Key: In Inventory') {
      context2.fillStyle = "#323537";
      context2.fillText("Find the Key", 0, 50);
      var text = context2.measureText("Find the Key");
      context2.fillRect(0, 45, text.width, 2);
      context2.fillStyle = "#63d26e";
      context2.fillText("Find the Exit", 0, 75);
    } else {
      context2.fillStyle = "#63d26e";
      context2.fillText("Find the Key", 0, 50);
      context2.fillStyle = "white";
      context2.fillText("Find the Exit", 0, 75);
    }

    context2.fillStyle = "yellow";
    context2.fillText("Objectives", 0, 25);
    context2.fillText("Controls", 0, 125);
  };

  Player.prototype.drawRightStats = function () {
    var canvas3 = document.getElementById("canvas-right");
    var context3 = canvas3.getContext("2d");
    context3.clearRect(0, 0, canvas3.width, canvas3.height);
    context3.font = "20px Arima Madurai";
    context3.fillStyle = "white";
    context3.fillText("".concat(_this.startItems[0]), 0, 50);
    context3.fillText("".concat(_this.startItems[1]), 0, 75);
    context3.fillText("".concat(_this.startItems[2]), 0, 100);
    context3.fillText("".concat(_this.items[0] || ""), 0, 175);
    context3.fillText("".concat(_this.items[1] || ""), 0, 200);
    context3.fillText("".concat(_this.items[2] || ""), 0, 225);
    context3.fillText("".concat(_this.items[3] || ""), 0, 250);
    context3.fillText("".concat(_this.items[4] || ""), 0, 275);
    context3.fillStyle = "yellow";
    context3.fillText("Flashlight", 0, 25);
    context3.fillText("Items", 0, 150);
  };

  Player.prototype.drawBottomStats = function () {
    var canvas4 = document.getElementById("canvas-bottom");
    var context4 = canvas4.getContext("2d");
    context4.clearRect(0, 0, canvas4.width, canvas4.height);
    context4.font = "20px Arima Madurai";
    context4.fillStyle = "white";
    context4.fillText("Level: ".concat(_this.level + 1), 0, 25);
    context4.fillText("Sprint:", 100, 25);
    context4.fillText("Key:", 375, 25);
    context4.fillText("Battery:", 240, 25);

    if (_this.batteryPower < 50) {
      context4.fillStyle = "red";
    } else if (_this.batteryPower < 100) {
      context4.fillStyle = "yellow";
    } else if (_this.batteryPower > 150) {
      context4.fillStyle = "#63d26e";
    }

    context4.fillText("".concat(Math.floor(_this.batteryPower)), 315, 25);

    if (_this.jumpPower < 25) {
      context4.fillStyle = "red";
    } else {
      context4.fillStyle = "white";
    }

    context4.fillText("".concat(Math.floor(_this.jumpPower)), 165, 25);

    if (_this.keys[0] === 'In Inventory') {
      context4.fillStyle = "#63d26e";
      context4.fillText(_this.keys[0], 420, 25);
    } else {
      context4.fillStyle = "red";
      context4.fillText("Missing", 420, 25);
    }

    if (_this.zombieNearby) {
      context4.fillStyle = "red";
      context4.fillText("CAUTION: ZOMBIE NEARBY", 0, 75);
      context4.fillStyle = "white";
    }
  };

  Player.prototype.draw = function () {
    _this.movePlayer();

    _this.moveFlashlight();

    _this.useItems();

    _this.regenerate();

    _this.drawLeftStats();

    _this.drawRightStats();

    _this.drawBottomStats();
  };
}

module.exports = Player;

/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function () {
    this.sound.play();
  };

  this.stop = function () {
    this.sound.pause();
  };
}

module.exports = Sound;

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

/***/ "./src/welcome.js":
/*!************************!*\
  !*** ./src/welcome.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Welcome(context) {
  var _this = this;

  Welcome.prototype.winner = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = "45px Arima Madurai";
    context.fillStyle = "white";
    context.fillText("you won!", 200, canvasHeight / 2 + 50);
  };

  Welcome.prototype.loser = function (level) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = "45px Arima Madurai";
    context.fillStyle = "white";
    var text = context.measureText("you got eaten by a zombie!");
    context.fillText("you got eaten by a zombie!", canvasWidth / 2 - text.width / 2, canvasHeight / 2 - 25);
    context.font = "30px Arima Madurai";
    var text = context.measureText("press 'enter' to retry");
    context.fillText("press 'enter' to retry", canvasWidth / 2 - text.width / 2, canvasHeight / 2 + 50);
  };

  Welcome.prototype.welcome = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.font = "30px Arima Madurai";
    context.fillStyle = "#b7b7b7";
    context.fillText("this is sliver.", 0, 200);
    context.fillText("find the key.", 0, 250);
    context.fillText("find the way out.", 0, 300);
  };

  Welcome.prototype.batteries = function () {
    context.fillText("don't run out of batteries.", 0, 350);
  };

  Welcome.prototype.zombies = function () {
    context.fillText("don't let the zombies catch you.", 0, 400);
  }; // Welcome.prototype.controls = () => {
  //     context.clearRect(0, 0, canvasWidth, canvasHeight);
  //     context.font="45px Arima Madurai";
  //     context.fillStyle = "#b7b7b7";
  //     context.fillText(`controls`, canvasWidth/2-80, 100);
  //     context.font="30px Arima Madurai";
  //     context.fillText(`up (w)`, canvasWidth/2-45, 200);
  //     context.fillText(`left (a) / down (s) / right (d)`, canvasWidth/2-180, 250);
  //     context.fillText(`look around (mouse)`, canvasWidth/2-130, 350);
  //     context.fillText(`sprint (space)`, canvasWidth/2-80, 400);
  //     context.fillText(`items (numbers 1-9)`, canvasWidth/2-130, 500);
  // }


  Welcome.prototype.draw = function () {
    _this.welcome();

    setTimeout(_this.batteries, 3000);
    setTimeout(_this.zombies, 5000); // setTimeout(this.controls, 8000);
  };
}

module.exports = Welcome;

/***/ }),

/***/ "./src/zombie.js":
/*!***********************!*\
  !*** ./src/zombie.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Zombie(context, map, player, startX, startY) {
  var _this = this;

  this.c = context;
  this.x = startX;
  this.y = startY;
  this.map = map;
  this.stepOfMovement = 5; // 1.7;

  this.timeSinceUpdate = 0;
  this.random = 3;

  Zombie.prototype.drawZombie = function (direction) {
    var zombie = new Image();
    zombie.src = './images/zombie.png';

    _this.c.save();

    _this.c.translate(_this.x + 350 - player.x, _this.y + 350 - player.y);

    _this.c.rotate(_this.directionFacing);

    _this.c.drawImage(zombie, 0, 0, 305, 231, -22.5, -17, 45, 34);

    _this.c.restore();
  };

  Zombie.prototype.intersectsMap = function (x, y, map) {
    var xTile = ~~(x / 120);
    var yTile = ~~(y / 120);

    if (map.map[yTile][xTile] === 1) {
      return true;
    } else {
      return false;
    }
  };

  Zombie.prototype.moveZombie = function (input) {
    switch (input) {
      case 0:
        if (_this.y > 5 && _this.intersectsMap(_this.x, _this.y - 15, _this.map) === false) {
          _this.y -= _this.stepOfMovement; // UP

          _this.directionFacing = (0 % 360 - 90) * Math.PI / 180;
        } else {
          _this.timeSinceUpdate = 100;
        }

        break;

      case 1:
        if (_this.y < _this.map.height - 5 && _this.intersectsMap(_this.x, _this.y + 15, _this.map) === false) {
          _this.y += _this.stepOfMovement; // DOWN

          _this.directionFacing = (180 % 360 - 90) * Math.PI / 180;
        } else {
          _this.timeSinceUpdate = 100;
        }

        break;

      case 2:
        if (_this.x > 5 && _this.intersectsMap(_this.x - 15, _this.y, _this.map) === false) {
          _this.x -= _this.stepOfMovement; // LEFT

          _this.directionFacing = (270 % 360 - 90) * Math.PI / 180;
        } else {
          _this.timeSinceUpdate = 100;
        }

        break;

      case 3:
        if (_this.x < _this.map.width - 5 && _this.intersectsMap(_this.x + 15, _this.y, _this.map) === false) {
          _this.x += _this.stepOfMovement; // RIGHT

          _this.directionFacing = (90 % 360 - 90) * Math.PI / 180;
        } else {
          _this.timeSinceUpdate = 100;
        }

        break;
    }
  };

  Zombie.prototype.update = function () {
    if (_this.timeSinceUpdate > 40) {
      _this.random = Math.floor(Math.random() * 4);
      _this.timeSinceUpdate = 0;
    } else {
      _this.timeSinceUpdate += 1;
    }

    _this.moveZombie(_this.random);
  };

  Zombie.prototype.draw = function () {
    _this.drawZombie(_this.directionFacing);
  };
}

module.exports = Zombie;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map