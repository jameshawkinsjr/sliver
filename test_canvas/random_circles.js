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



    ///////////////////////////////////
    ///////////////////////////////////
    // Window Resizing
    // window.addEventListener('resize', ( (e) => {
    //         canvas.width = window.innerWidth;
    //         canvas.width = window.innerHeight;
    //         init ();
    //     } )
    // );
    ///////////////////////////////////
    ///////////////////////////////////


    ///////////////////////////////////
    ///////////////////////////////////
    // Mouse Positioning
    getMousePos = (canvas, e) => {
        let canvasBound = canvas.getBoundingClientRect();
        return {
          x: e.clientX - canvasBound.left,
          y: e.clientY - canvasBound.top
        };
    };
    let mouse = {
        x: undefined,
        y: undefined,
    };

    window.addEventListener('mousemove', ( (e) => {
            let pos = getMousePos(canvas, e);
            mouse.x = pos.x;
            mouse.y = pos.y;
        } )
    );
    ///////////////////////////////////
    ///////////////////////////////////


    ///////////////////////////////////
    ///////////////////////////////////
    // Collision Detection
    getDistance = (x1, y1, x2, y2) => {
        let xDistance = x2-x1;
        let yDistance = y2-y1;
        return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) )
    }
    ///////////////////////////////////
    ///////////////////////////////////

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

        this.grow = (maxRadius) => {

            this.minRadius = radius;
            this.maxRadius = maxRadius;


            if ( mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
                if (this.radius < this.maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) { 
                this.radius -= 1;
            }
        };


        this.update = () => {

            this.move();
            this.grow(100);
            this.draw();
        }
    }

    let circleArray = [];
    createRandomCircles = (numCircles) => {

        let colorArray = [
            '#F67280',
            '#F8B195',
            '#C06C84',
            '#6C5B7B',
            '#355C7D',
        ]
        
        for (let i = 0; i < numCircles; i++) {
            let radius = (Math.random() * 10)+1;
            let x = Math.random() * (innerWidth-radius * 2) + radius;
            let y = Math.random() * (innerHeight-radius * 2) + radius;
            let dx = (Math.random() - 0.5 * 2);
            let dy = (Math.random() - 0.5 * 2);
            let color = colorArray[Math.floor(Math.random() * colorArray.length)];
            circleArray.push(new Circle(x, y, dx, dy, radius, color));
        }
    }


    ////////////////////////////////////////////////
    // Game initialization
    init = () => {

        createRandomCircles(500);

    };
    ////////////////////////////////////////////////


    ////////////////////////////////////////////////
    // Game anitmation
    animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);

        // Random Circles
        for (let i = 0; i < circleArray.length; i ++){
            circleArray[i].update();
        }

    };
    ////////////////////////////////////////////////


    ////////////////////////////////////////////////
    // Run Game
    init();
    animate();
    ////////////////////////////////////////////////




});



