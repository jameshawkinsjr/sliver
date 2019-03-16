var Game = require('./game');
var Maps = require('./maps');

// Compatibility with multiple browsers
window.requestAnimFrame = (function(){ 
    return  window.requestAnimationFrame       ||  
            window.webkitRequestAnimationFrame ||  
            window.mozRequestAnimationFrame    ||  
            window.oRequestAnimationFrame      ||  
            window.msRequestAnimationFrame     ||  
            function( callback ){ 
              window.setTimeout(callback, 1000 / 60); 
            }; 
  })(); 

document.addEventListener("DOMContentLoaded", function(event){
    let canvas = document.getElementById("game-canvas");
    let context = canvas.getContext("2d");
    window.canvasWidth = context.canvas.width;
    window.canvasHeight = context.canvas.height;


    // Mouse Positioning
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
    
    // Keyboard Presses
    window.keysDown = {};
    addEventListener( "keydown", function (e) { keysDown[e.keyCode] = true; } );
    addEventListener( "keyup",   function (e) { delete keysDown[e.keyCode]; } );
    
    // Play game
    let game = new Game(context);
    game.init();
    game.animate();
    

});