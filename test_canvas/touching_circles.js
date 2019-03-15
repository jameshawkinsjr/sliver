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



    function Circle(startX, startY, startDegrees, endDegrees, radius, color, color2, stroke, dx, dy) {
        this.x = startX;
        this.y = startY;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.color2 = color2;
        this.stroke = stroke;
        this.grad = c.createRadialGradient( startX, startY, 50, startX, startY, 200);
        this.grad.addColorStop(0,color); 
        this.grad.addColorStop(1,color2);
        this.startAngle = ((startDegrees - 90) * Math.PI/180);
        this.endAngle = ((endDegrees - 90) * Math.PI/180);

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
            c.fillStyle = this.color;
            c.fill();
            c.strokeStyle = this.stroke;
            c.stroke();
        };

        this.move = () => {
            if (this.x + radius > innerWidth || this.x - radius < 0){
                this.dx = -this.dx;
            }
            if (this.y + radius > innerHeight|| this.y - radius < 0){
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
        }


        this.collision = (color1, color2) => {
            if (getDistance( circle1.x, circle1.y, circle2.x, circle2.y ) < circle1.radius + circle2.radius){
                circle1.color = color1;
                circle1.stroke = color1;
            } else {
                circle1.color = color2;
                circle1.stroke = color2;
            }
        }

        this.update = () => {

            this.move();
            this.collision('blue', 'red');
            this.draw();
        }
    }



    // Two touching circles
    let circle1;
    let circle2;
    touchingCircles = () => {
        circle1 = new Circle(250, 250, 0, 360, 30, 'red', 'red');
        circle2 = new Circle(undefined, undefined, 0, 360, 30, 'blue', 'blue');
    }


    ////////////////////////////////////////////////
    // Game initialization
    init = () => {

        touchingCircles();

    };
    ////////////////////////////////////////////////


    ////////////////////////////////////////////////
    // Game anitmation
    animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);


        // Mouse follow circle + collision detection
        circle1.update();
        circle2.x = mouse.x;
        circle2.y = mouse.y;
        circle2.update();

    };
    ////////////////////////////////////////////////


    ////////////////////////////////////////////////
    // Run Game
    init();
    animate();
    ////////////////////////////////////////////////




});


