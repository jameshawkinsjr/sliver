var Game = require('./game');
var Maps = require('./maps');

document.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById("game-canvas");
    let context = canvas.getContext("2d");
    window.canvasWidth = context.canvas.width;
    window.canvasHeight = context.canvas.height;
    window.mouse = { x: canvasWidth/2, y: 0, };
        const getMousePos = (canvas, e) => {
            let canvasBoundary = canvas.getBoundingClientRect();
            return {
            x: e.clientX - canvasBoundary.left,
            y: e.clientY - canvasBoundary.top
            };
        };
        addEventListener('mousemove', ( (e) => {
            let pos = getMousePos(canvas, e);
            mouse.x = pos.x;
            mouse.y = pos.y;
            } )
        );
    
    // Play game
    let game = new Game(context);
    // setTimeout(game.play, 8000);
    game.play();
    

});