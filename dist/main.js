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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim layer with setTimeout fallback \nwindow.requestAnimFrame = (function(){ \n    return  window.requestAnimationFrame       ||  \n            window.webkitRequestAnimationFrame ||  \n            window.mozRequestAnimationFrame    ||  \n            window.oRequestAnimationFrame      ||  \n            window.msRequestAnimationFrame     ||  \n            function( callback ){ \n              window.setTimeout(callback, 1000 / 60); \n            }; \n  })(); \n\ndocument.addEventListener(\"DOMContentLoaded\", function(event){\n    let canvas = document.getElementById(\"game-canvas\");\n    let c = canvas.getContext(\"2d\");\n    let innerWidth = c.canvas.width;\n    let innerHeight = c.canvas.height;\n\n    function getMousePos(canvas, evt) {\n        let rect = canvas.getBoundingClientRect();\n        return {\n          x: evt.clientX - rect.left,\n          y: evt.clientY - rect.top\n        };\n    }\n\n    let mouse = {\n        x: undefined,\n        y: undefined,\n    }\n    let maxRadius = 40;\n    let minRadius = 2;\n    let colorArray = [\n        '#F67280',\n        '#F8B195',\n        '#C06C84',\n        '#6C5B7B',\n        '#355C7D',\n        \n    ]\n\n    window.addEventListener('mousemove', ( (e) => {\n            let pos = getMousePos(canvas, e);\n            mouse.x = pos.x;\n            mouse.y = pos.y;\n        } )\n    );\n\n    // window.addEventListener('resize', ( (e) => {\n    //         canvas.width = window.innerWidth;\n    //         canvas.width = window.innerHeight;\n    //         init ();\n    //     } )\n    // );\n\n\n\n    function Circle(x, y, dx, dy, radius) {\n        this.x = x;\n        this.y = y;\n        this.dx = dx;\n        this.dy = dy;\n        this.radius = radius;\n        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];\n        this.minRadius = radius;\n\n        this.draw = () => {\n            c.beginPath();\n            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n            // c.strokeStyle = \"blue\";\n            c.fillStyle = this.color;\n            c.fill();\n            // c.stroke();\n        }\n\n        this.update = () => {\n            if (this.x + radius > innerWidth || this.x - radius < 0){\n                this.dx = -this.dx;\n            }\n            if (this.y + radius > innerHeight|| this.y - radius < 0){\n                this.dy = -this.dy;\n            }\n            this.x += this.dx;\n            this.y += this.dy;\n\n            if (    mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {\n                if (this.radius < maxRadius) {\n                    this.radius += 1;\n                }\n            } else if (this.radius > this.minRadius) { \n                this.radius -= 1;\n            }\n            this.draw();\n        }\n    }\n    let circleArray = [];\n    \n    for (let i = 0; i < 500; i++) {\n        let radius = (Math.random() * 10)+1;\n        let x = Math.random() * (innerWidth-radius * 2) + radius;\n        let y = Math.random() * (innerHeight-radius * 2) + radius;\n        let dx = (Math.random() - 0.5 * 2);\n        let dy = (Math.random() - 0.5 * 2);\n\n        circleArray.push(new Circle(x, y, dx, dy, radius));\n    }\n    \n    animate = () => {\n        requestAnimationFrame(animate);\n        c.clearRect(0, 0, innerWidth, innerHeight);\n\n        for (let i = 0; i < circleArray.length; i ++){\n            circleArray[i].update();\n        }\n        \n    }\n\n    animate();\n\n\n\n\n});\n\n\n\n\n\n/////////////////////////////\n// let bgReady = false;\n// let bgImage = new Image();\n// bgImage.onload = function () {\n//     bgReady = true;\n// };\n// bgImage.src = url('https://github.com/lostdecade/simple_canvas_game/blob/master/images/background.png');\n\n// let hero = {\n//     speed: 256, // movement in pixels per second\n//     x: 0,\n//     y: 0\n// };\n// let monster = {\n//     x: 0,\n//     y: 0\n// };\n// let monstersCaught = 0;\n\n// let keysDown = {};\n\n// addEventListener(\"keydown\", function (e) {\n//     keysDown[e.keyCode] = true;\n// }, false);\n\n// addEventListener(\"keyup\", function (e) {\n//     delete keysDown[e.keyCode];\n// }, false);\n\n\n// let angle = .1*Math.PI*2;\n// c.fillStyle = 'black';\n// let grad = c.createRadialGradient( 250,250, 10, 250,250, 300);\n// grad.addColorStop(0,\"#797939\"); \n// grad.addColorStop(1,'#000000'); \n// c.fillStyle = grad; \n// c.beginPath();\n// c.moveTo(250,250);\n// c.arc(250,250, 250, 0, angle, false);\n// c.lineTo(250,250);\n// c.fill();\n// c.save();\n// let rads = 240 * Math.PI*2.0/360.0;\n// c.rotate(rads);\n// c.restore();\n\n// c.fillStyle = \"black\";\n// c.fillRect(400,300, 100, 500);\n// c.clip();\n// c.fillStyle = 'black';\n/////////////////////////////\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });