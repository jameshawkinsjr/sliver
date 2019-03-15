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
    let c = canvas.getContext("2d");
    let innerWidth = c.canvas.width;
    let innerHeight = c.canvas.height;
    let sprite = document.getElementById('sprite');


    // Mouse Positioning
        getMousePos = (canvas, e) => {
            let canvasBound = canvas.getBoundingClientRect();
            return {
            x: e.clientX - canvasBound.left,
            y: e.clientY - canvasBound.top
            };
        };
        let mouse = {
            x: 0,
            y: 0,
        };

        window.addEventListener('mousemove', ( (e) => {
                let pos = getMousePos(canvas, e);
                mouse.x = pos.x;
                mouse.y = pos.y;
            } )
        );


    // Keyboard Presses
        // 38 === UP
        // 40 === DOWN
        // 37 === LEFT
        // 39 === RIGHT
        let keysDown = {};
        addEventListener( "keydown", function (e) { keysDown[e.keyCode] = true; } );
        addEventListener( "keyup",   function (e) { delete keysDown[e.keyCode]; } );


    // Collision Detection
        getDistance = (x1, y1, x2, y2) => {
            let xDistance = x2-x1;
            let yDistance = y2-y1;
            return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) )
        }

        getTheta = (cx, cy, ex, ey) => {
            let dy = ey - cy;
            let dx = ex - cx;
            let theta = Math.atan2(dy, dx);
            theta *= 180 / Math.PI;
            if (theta < 90) theta = 360 + theta;
            return (theta - 90);
        }


    class Player {
        constructor(startX, startY, centerDegree, flashlightWidth, radius, color, color2, stroke, dx, dy) {
            this.x = startX;
            this.y = startY;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.currentRadius = radius;
            this.color = color;
            this.color2 = color2;
            this.stroke = stroke;
            this.flashlightWidth = flashlightWidth;
            this.centerDegree = centerDegree;
            this.degreeOfRotation = 3;
            this.stepOfMovement = 1.5;
            this.directionFacing = (((this.centerDegree % 360) - 90) * Math.PI / 180);
            this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
            this.grad = c.createRadialGradient(this.x, this.y, radius / 5, this.x, this.y, radius);
            this.grad.addColorStop(0, color);
            this.grad.addColorStop(1, color2);
            this.startAngle = this.directionFacing - (this.flashlightAngle / 2);
            this.endAngle = this.directionFacing + (this.flashlightAngle / 2);

            this.drawPlayer = () => {
                const sprite = document.getElementById('sprite');
                c.drawImage(sprite, 0, 0, 305, 231, this.x, this.y, 60, 46);
            }
            this.drawFlashlight = (radius) => {
                c.beginPath(this.x, this.y);
                c.arc(this.x, this.y, radius, this.startAngle, this.endAngle, false);
                c.lineTo(this.x, this.y);
                c.fillStyle = this.grad;
                c.fill();
            };
            this.createGradient = (inputRadius) => {
                this.grad = c.createRadialGradient(this.x, this.y, inputRadius / 5, this.x, this.y, inputRadius);
                this.grad.addColorStop(0, this.color);
                this.grad.addColorStop(1, this.color2);
            };
            this.movePlayer = () => {
                if (38 in keysDown || 87 in keysDown) { // === UP
                    if (this.y > 0) {
                        this.y -= this.stepOfMovement;
                    }
                }
                if (40 in keysDown || 83 in keysDown) { // === DOWN
                    if (this.y < innerHeight) {
                        this.y += this.stepOfMovement;
                    }
                }
                if (37 in keysDown || 65 in keysDown) { // === LEFT
                    if (this.x > 0) {
                        this.x -= this.stepOfMovement;
                    }
                }
                if (39 in keysDown || 68 in keysDown) { // === RIGHT
                    if (this.x < innerWidth) {
                        this.x += this.stepOfMovement;
                    }
                }
            };
            this.moveFlashlight = () => {
                let theta = getTheta(mouse.x, mouse.y, this.x, this.y);
                let delta = (this.centerDegree - theta) % 360;
                if (delta <= -355 && delta <= 5) {
                    this.centerDegree += theta;
                }
                else if ((delta > -180 && delta < -5) || (delta > 180 && delta < 360)) {
                    this.centerDegree += this.degreeOfRotation;
                }
                else if ((delta <= -180 && delta > -355) || (delta > 5 && delta < 180)) {
                    this.centerDegree -= this.degreeOfRotation;
                }
                this.directionFacing = (((this.centerDegree % 360) - 90) * Math.PI / 180);
                this.startAngle = this.directionFacing - (this.flashlightAngle / 2);
                this.endAngle = this.directionFacing + (this.flashlightAngle / 2);
            };
            this.improveFlashlight = () => {
                if (49 in keysDown) { // === 1
                    this.currentRadius = this.radius * 2;
                    console.log(this.currentRadius);
                    this.createGradient(this.currentRadius);
                    this.drawFlashlight(this.currentRadius);
                }
                else if (50 in keysDown) { // === 2
                    this.currentRadius = this.radius;
                    this.createGradient(this.currentRadius);
                }
            };
            this.update = () => {
                this.drawPlayer();
                this.movePlayer();
                this.moveFlashlight();
                this.improveFlashlight();
                this.createGradient(this.currentRadius);
                this.drawFlashlight(this.currentRadius);
            };
        }
    }

    let newPlayer;

    createPlayer = () => {
        newPlayer = new Player(250, 250, 0, 60, 100, '#797939', 'black');
    }


    init = () => {
        createPlayer();
    };

    animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        
        newPlayer.update();
    };

    init();
    animate();

});