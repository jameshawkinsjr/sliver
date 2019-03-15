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

/***/ "./src/camera.js":
/*!***********************!*\
  !*** ./src/camera.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Rectangle(left, top, width, height) {
  this.left = left || 0;
  this.top = top || 0;
  this.width = width || 0;
  this.height = height || 0;
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;

  Rectangle.prototype.set = function (left, top,
  /*optional*/
  width,
  /*optional*/
  height) {
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  };

  Rectangle.prototype.within = function (r) {
    return r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom;
  };

  Rectangle.prototype.overlaps = function (r) {
    return this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom;
  };
}

function Camera(map) {
  this.x = 0;
  this.y = 0;
  this.xMovement = 0;
  this.yMovement = 0;
  this.xDeadZone = 0;
  this.yDeadZone = 0;
  this.followed = null;
  this.viewportRect = new Rectangle(this.x, this.y, canvasWidth, canvasHeight);
  this.worldRect = new Rectangle(0, 0, map.width, map.height);

  Camera.prototype.follow = function (player, xDeadZone, yDeadZone) {
    this.followed = player;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  };

  Camera.prototype.update = function () {
    if (this.followed != null) {
      this.x = this.followed.x;
      this.y = this.followed.y; // if(this.followed.x - this.x  + this.xDeadZone > canvasWidth) {
      //     this.x = this.followed.x - (canvasWidth - this.xDeadZone);
      // } else if (this.followed.x  - this.xDeadZone < this.x) {
      //     this.x = this.followed.x  - this.xDeadZone;
      // }
      // if(this.followed.y - this.y + this.yDeadZone > canvasHeight) {
      //     this.y = this.followed.y - (canvasHeight - this.yDeadZone);
      // } else if(this.followed.y - this.yDeadZone < this.y) {
      //     this.y = this.followed.y - this.yDeadZone;
      // }

      console.log(this.x, this.y);
    } // update viewportRect


    this.viewportRect.set(this.x, this.y); // don't let camera leaves the world's boundary
    // if(!this.viewportRect.within(this.worldRect))
    // {
    // 	if(this.viewportRect.left < this.worldRect.left)
    // 		this.x = this.worldRect.left;
    // 	if(this.viewportRect.top < this.worldRect.top)					
    // 		this.y = this.worldRect.top;
    // 	if(this.viewportRect.right > this.worldRect.right)
    // 		this.x = this.worldRect.right - canvasWidth;
    // 	if(this.viewportRect.bottom > this.worldRect.bottom)					
    // 		this.y = this.worldRect.bottom - canvasHeight;
    // }
  };
}

module.exports = Camera;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Player = __webpack_require__(/*! ./player */ "./src/player.js");

var Map = __webpack_require__(/*! ./map */ "./src/map.js"); // var map1 = require('./maps').map1
// var map2 = require('./maps').map2


var Camera = __webpack_require__(/*! ./camera */ "./src/camera.js");

function Game(context) {
  var _this = this;

  // this.map = [
  //     [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,0],
  //     [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  //     [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  //     [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  // ];
  this.map = [[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1]]; // this.map = [
  //     [1, 1, 1, 1, 1, 0, 0 ],
  //     [0, 0, 0, 0, 1, 0, 1 ],
  //     [0, 1, 1, 0, 1, 0, 1 ],
  //     [0, 1, 1, 0, 1, 0, 1 ],
  //     [0, 0, 0, 0, 0, 0, 0 ],
  //     [0, 1, 1, 0, 1, 0, 1 ],
  //     [0, 0, 1, 0, 1, 0, 1 ]
  // ];

  var player = void 0;
  var gameMap = void 0;
  var camera = void 0; // Game initialize

  Game.prototype.init = function () {
    gameMap = new Map(_this.map);
    gameMap.generate();
    player = new Player(context, 0, 0, 0, 360, 200, '#797939', 'black', gameMap);
    camera = new Camera(gameMap);
    camera.follow(player, 0, 0);
  };

  Game.prototype.update = function () {
    player.update();
    camera.update();
  };

  Game.prototype.draw = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    player.draw();
    gameMap.draw(context, camera.x, camera.y);
  }; // Game animation


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

"use strict";


var Game = __webpack_require__(/*! ./game */ "./src/game.js"); // Compatibility with multiple browsers


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Map(inputMap) {
  this.map = inputMap;
  this.rowWidth = 100;
  this.rowHeight = 100;
  this.width = inputMap.length * this.rowWidth;
  this.height = inputMap.length * this.rowHeight;
  this.floor = null;
  this.wall = null;
} // generate an example of a large map


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
}; // draw the map adjusted to camera


Map.prototype.draw = function (context, xView, yView) {
  // easiest way: draw the entire map changing only the destination coordinate in canvas
  // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
  //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
  // didactic way:
  var sx = void 0,
      sy = void 0,
      dx = void 0,
      dy = void 0;
  var sWidth = void 0,
      sHeight = void 0,
      dWidth = void 0,
      dHeight = void 0; // offset point to crop the image

  sx = xView;
  sy = yView; // dimensions of cropped image			

  sWidth = canvasWidth;
  sHeight = canvasHeight; // if cropped image is smaller than canvas we need to change the source dimensions

  if (this.image.width - sx < sWidth) {
    sWidth = this.image.width - sx;
  }

  if (this.image.height - sy < sHeight) {
    sHeight = this.image.height - sy;
  } // location on canvas to draw the croped image


  dx = 0;
  dy = 0; // match destination with source to not scale the image

  dWidth = sWidth;
  dHeight = sHeight;
  context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

module.exports = Map;

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Player(context, startX, startY, centerDegree, flashlightWidth, radius, color, color2, map) {
  var _this = this;

  this.c = context;
  this.x = startX;
  this.y = startY;
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
    this.c.clearRect(0, 0, 0, 0);
    this.c.save();
    this.c.drawImage(sprite, 0, 0, 305, 231, this.x - 10, this.y - 10, 30, 23);
    this.c.rotate(direction);
    this.c.setTransform(1, 0, 0, 1, 0, 0);
    this.c.translate(0, 0);
    this.c.restore();
  };

  Player.prototype.drawFlashlight = function (radius) {
    _this.c.save();

    _this.c.beginPath(_this.x, _this.y);

    _this.c.arc(_this.x, _this.y, radius, _this.startAngle, _this.endAngle, false);

    _this.c.lineTo(_this.x, _this.y);

    _this.c.fillStyle = _this.grad;

    _this.c.fill();

    _this.c.restore();
  };

  Player.prototype.regenerate = function () {
    if (_this.jumpPower < 100) {
      _this.jumpPower += 1;
    }
  };

  Player.prototype.createGradient = function (inputRadius) {
    _this.grad = _this.c.createRadialGradient(_this.x, _this.y, inputRadius / 5, _this.x, _this.y, inputRadius);

    _this.grad.addColorStop(0, _this.color);

    _this.grad.addColorStop(1, _this.color2);
  };

  Player.prototype.movePlayer = function () {
    if (38 in keysDown || 87 in keysDown) {
      // === UP
      if (32 in keysDown && _this.y > 0 && _this.jumpPower > 5) {
        _this.y -= _this.stepOfMovement * 3;
        _this.jumpPower -= 5;
      } else if (_this.y > 0) {
        _this.y -= _this.stepOfMovement;
      }
    }

    if (40 in keysDown || 83 in keysDown) {
      // === DOWN
      if (32 in keysDown && _this.y < _this.map.height && _this.jumpPower > 5) {
        _this.y += _this.stepOfMovement * 3;
        _this.jumpPower -= 5;
      } else if (_this.y < _this.map.height) {
        _this.y += _this.stepOfMovement;
      }
    }

    if (37 in keysDown || 65 in keysDown) {
      // === LEFT
      if (32 in keysDown && _this.x > 0 && _this.jumpPower > 5) {
        _this.x -= _this.stepOfMovement * 3;
        _this.jumpPower -= 5;
      } else if (_this.x > 0) {
        _this.x -= _this.stepOfMovement;
      }
    }

    if (39 in keysDown || 68 in keysDown) {
      // === RIGHT
      if (32 in keysDown && _this.x < _this.map.width && _this.jumpPower > 5) {
        _this.x += _this.stepOfMovement * 3;
        _this.jumpPower -= 5;
      } else if (_this.x < _this.map.width) {
        _this.x += _this.stepOfMovement;
      }
    }
  };

  Player.prototype.getDistance = function (x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
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
    var theta = _this.getTheta(mouse.x, mouse.y, _this.x, _this.y);

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

    _this.drawPlayer(_this.directionFacing);
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

    console.log(_this.x, _this.y);
  };

  Player.prototype.draw = function () {
    _this.createGradient(_this.currentRadius);

    _this.drawFlashlight(_this.currentRadius);

    _this.drawPlayer(_this.directionFacing);
  };
}

module.exports = Player;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map