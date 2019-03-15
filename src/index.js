var Player = require('./player');

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
    let innerWidth = context.canvas.width;
    let innerHeight = context.canvas.height;


    // Mouse Positioning
    window.mouse = { x: 0, y: 0, };
    const getMousePos = (canvas, e) => {
        let canvasBound = canvas.getBoundingClientRect();
        return {
        x: e.clientX - canvasBound.left,
        y: e.clientY - canvasBound.top
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
    

    let newPlayer;
    const createPlayer = () => {
        newPlayer = new Player(context, innerWidth/2, innerHeight/2, 0, 60, 100, '#797939', 'black');
    }


    const init = () => {
        createPlayer();
    };

    const animate = () => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, innerWidth, innerHeight);
        
        newPlayer.update();
    };

    init();
    animate();

});