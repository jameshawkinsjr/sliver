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

var Map = __webpack_require__(/*! ./map */ "./src/map.js");

function Game(context) {
  var _this = this;

  this.map = [[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0], [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
  var player;
  var gameMap;

  Game.prototype.init = function () {
    gameMap = new Map(_this.map);
    gameMap.generate();
    player = new Player(context, 0, 60, 300, '#797939', 'black', gameMap);
  };

  Game.prototype.update = function () {
    player.update();
  };

  Game.prototype.draw = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    context.translate(player.x - canvasWidth, player.y - canvasHeight);
    context.restore();
    player.draw();
    context.drawImage(gameMap.image, player.x - canvasWidth / 2, player.y - canvasWidth / 2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
  };

  Game.prototype.animate = function () {
    requestAnimFrame(_this.animate);

    _this.update();

    _this.draw();
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

var Maps = __webpack_require__(/*! ./maps */ "./src/maps.js"); // Compatibility with multiple browsers


window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

document.addEventListener("DOMContentLoaded", function (event) {
  var canvas = document.getElementById("game-canvas");
  var context = canvas.getContext("2d");
  window.canvasWidth = context.canvas.width;
  window.canvasHeight = context.canvas.height; // Mouse Positioning

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
  }); // Keyboard Presses

  window.keysDown = {};
  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  });
  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }); // Play game

  var game = new Game(context);
  game.init();
  game.animate();
});

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Map(inputMap) {
  this.map = inputMap;
  this.rowWidth = 100;
  this.rowHeight = 100;
  this.width = inputMap.length * this.rowWidth;
  this.height = inputMap.length * this.rowHeight;

  Map.prototype.generate = function () {
    var context = document.createElement("canvas").getContext("2d");
    context.canvas.width = this.width;
    context.canvas.height = this.height;
    var color = "#000000";
    context.save();

    for (var x = 0, i = 0; i < this.map.length; x += this.rowWidth, i++) {
      for (var y = 0, j = 0; j < this.map.length; y += this.rowHeight, j++) {
        if (this.map[j][i] === 1) {
          context.beginPath();
          context.rect(x, y, this.rowWidth, this.rowHeight);
          context.fillStyle = color;
          context.fill();
          context.closePath();
        }
      }
    }

    context.restore();
    this.image = new Image();
    this.image.src = context.canvas.toDataURL("image/png");
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

var map1 = [[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0], [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var map2 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0], [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]];
exports.map1 = map1;
exports.map2 = map2;

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Player(context, centerDegree, flashlightWidth, radius, color, color2, map) {
  var _this = this;

  this.c = context;
  this.x = canvasWidth / 2;
  this.y = canvasHeight / 2;
  this.radius = radius;
  this.currentRadius = radius;
  this.color = color;
  this.color2 = color2;
  this.map = map;
  this.flashlightWidth = flashlightWidth;
  this.centerDegree = centerDegree;
  this.degreeOfRotation = 4;
  this.stepOfMovement = 5; // 1.7;

  this.flashlightAngle = this.flashlightWidth * Math.PI / 180;
  this.jumpPower = 100;

  Player.prototype.drawPlayer = function (direction) {
    var sprite = document.getElementById('sprite');
    this.c.save();
    this.c.drawImage(sprite, 0, 0, 305, 231, canvasWidth / 2 - 10, canvasHeight / 2 - 10, 30, 23);
    this.c.beginPath(canvasWidth / 2, canvasHeight / 2);
    this.c.arc(canvasWidth / 2, canvasHeight / 2, radius, this.startAngle, this.endAngle, false);
    this.c.lineTo(canvasWidth / 2, canvasHeight / 2);
    this.c.fillStyle = this.grad;
    this.c.fill();
    this.c.rotate(direction);
    this.c.restore();
  };

  Player.prototype.regenerate = function () {
    if (_this.jumpPower < 100) {
      _this.jumpPower += 1;
    }
  };

  Player.prototype.createGradient = function (inputRadius) {
    _this.grad = _this.c.createRadialGradient(canvasWidth / 2, canvasHeight / 2, inputRadius / 5, canvasWidth / 2, canvasHeight / 2, inputRadius);

    _this.grad.addColorStop(0, _this.color);

    _this.grad.addColorStop(1, _this.color2);
  };

  Player.prototype.intersectsMap = function (x, y, map) {
    var xTile = ~~(x / 100);
    var yTile = ~~(y / 100);

    if (map.map[yTile][xTile] === 1) {
      return true;
    } else {
      return false;
    }
  };

  Player.prototype.movePlayer = function () {
    if (38 in keysDown || 87 in keysDown) {
      // === UP
      if (_this.y > 5 && _this.intersectsMap(_this.x, _this.y - 10, _this.map) === false) {
        _this.y -= _this.stepOfMovement;
      }
    }

    if (40 in keysDown || 83 in keysDown) {
      // === DOWN
      if (_this.y < _this.map.height - 5 && _this.intersectsMap(_this.x, _this.y + 10, _this.map) === false) {
        _this.y += _this.stepOfMovement;
      }
    }

    if (37 in keysDown || 65 in keysDown) {
      // === LEFT
      if (_this.x > 5 && _this.intersectsMap(_this.x - 10, _this.y, _this.map) === false) {
        _this.x -= _this.stepOfMovement;
      }
    }

    if (39 in keysDown || 68 in keysDown) {
      // === RIGHT
      if (_this.x < _this.map.width - 5 && _this.intersectsMap(_this.x + 10, _this.y, _this.map) === false) {
        _this.x += _this.stepOfMovement;
      }
    }
  }; // Player.prototype.movePlayer = () => {
  //     if (38 in keysDown || 87 in keysDown) { // === UP
  //         if (32 in keysDown && this.y > 0 && this.jumpPower > 5) {
  //             this.y -= this.stepOfMovement * 3;
  //             this.jumpPower -= 5;
  //         } else if (this.y > 0) {
  //             this.y -= this.stepOfMovement;
  //         }
  //     }
  //     if (40 in keysDown || 83 in keysDown) { // === DOWN
  //         if (32 in keysDown && this.y < this.map.height && this.jumpPower > 5) {
  //             this.y += this.stepOfMovement * 3;
  //             this.jumpPower -= 5;
  //         } else if (this.y < this.map.height) {
  //             this.y += this.stepOfMovement;
  //         }
  //     }
  //     if (37 in keysDown || 65 in keysDown) { // === LEFT
  //         if (32 in keysDown && this.x > 0 && this.jumpPower > 5) {
  //             this.x -= this.stepOfMovement * 3;
  //             this.jumpPower -= 5;
  //         } else if (this.x > 0) {
  //             this.x -= this.stepOfMovement;
  //         }
  //     }
  //     if (39 in keysDown || 68 in keysDown) { // === RIGHT
  //         if (32 in keysDown && this.x < this.map.width && this.jumpPower > 5) {
  //             this.x += this.stepOfMovement * 3;
  //             this.jumpPower -= 5;
  //         } else if (this.x < this.map.width) {
  //             this.x += this.stepOfMovement;
  //         }
  //     }
  // };


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

  Player.prototype.changeFlashlight = function () {
    if (49 in keysDown) {
      // === 1
      _this.currentRadius = _this.radius * 2;
      _this.flashlightAngle = _this.flashlightWidth * Math.PI / 180;
    } else if (50 in keysDown) {
      // === 2
      _this.currentRadius = _this.radius;
      _this.flashlightAngle = _this.flashlightWidth * Math.PI / 180;
    } else if (51 in keysDown) {
      // === 3
      _this.flashlightAngle = 360 * Math.PI / 180;
      _this.currentRadius = _this.radius * .7;
    }
  };

  Player.prototype.update = function () {
    _this.movePlayer();

    _this.moveFlashlight();

    _this.changeFlashlight();

    _this.regenerate();

    _this.createGradient(_this.currentRadius);
  };

  Player.prototype.draw = function () {
    _this.drawPlayer(_this.directionFacing);
  };
}

module.exports = Player;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map