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



    // Mouse Positioning
    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
    let mouse = {
        x: undefined,
        y: undefined,
    }
    window.addEventListener('mousemove', ( (e) => {
            let pos = getMousePos(canvas, e);
            mouse.x = pos.x;
            mouse.y = pos.y;
        } )
    );

    function getDistance(x1, y1, x2, y2) {
        let xDistance = x2-x1;
        let yDistance = y2-y1;
        return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) )
    }

    

    // window.addEventListener('resize', ( (e) => {
    //         canvas.width = window.innerWidth;
    //         canvas.width = window.innerHeight;
    //         init ();
    //     } )
    // );

    function Circle(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        


        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            // c.strokeStyle = "blue";
            // c.stroke();
        };

        this.grow = (maxRadius) => {

            this.minRadius = radius;
            this.maxRadius = maxRadius;


            if (    mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
                if (this.radius < this.maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) { 
                this.radius -= 1;
            }
        };

        this.update = () => {
            if (this.x + radius > innerWidth || this.x - radius < 0){
                this.dx = -this.dx;
            }
            if (this.y + radius > innerHeight|| this.y - radius < 0){
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

            this.grow(100);
            
            this.draw();
        }
    }



    // Creating a bunch of random circles
    let circleArray = [];
    function createRandomCircles(numCircles) {

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
    


    let circle1;
    let circle2;

    init = () => {

        circle1 = new Circle(250, 250, 1, 1, 30, 'red');
        circle2 = new Circle(undefined, undefined, 0, 0, 30, 'red');
        
        // createRandomCircles(500);

    };
    animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);

        // circle1.update();
        // circle2.x = mouse.x;
        // circle2.y = mouse.y;
        // circle2.update();

        // if (getDistance( circle1.x, circle1.y, circle2.x, circle2.y ) < circle1.radius + circle2.radius){
        //     circle1.color = 'blue';
        // } else {
        //     circle1.color = 'red';
        // }



        // Random Circles
        for (let i = 0; i < circleArray.length; i ++){
            circleArray[i].update();
        }
        
        
    };

    init();
    animate();




});





/////////////////////////////
// let bgReady = false;
// let bgImage = new Image();
// bgImage.onload = function () {
//     bgReady = true;
// };
// bgImage.src = url('https://github.com/lostdecade/simple_canvas_game/blob/master/images/background.png');

// let hero = {
//     speed: 256, // movement in pixels per second
//     x: 0,
//     y: 0
// };
// let monster = {
//     x: 0,
//     y: 0
// };
// let monstersCaught = 0;

// let keysDown = {};

// addEventListener("keydown", function (e) {
//     keysDown[e.keyCode] = true;
// }, false);

// addEventListener("keyup", function (e) {
//     delete keysDown[e.keyCode];
// }, false);


// let angle = .1*Math.PI*2;
// c.fillStyle = 'black';
// let grad = c.createRadialGradient( 250,250, 10, 250,250, 300);
// grad.addColorStop(0,"#797939"); 
// grad.addColorStop(1,'#000000'); 
// c.fillStyle = grad; 
// c.beginPath();
// c.moveTo(250,250);
// c.arc(250,250, 250, 0, angle, false);
// c.lineTo(250,250);
// c.fill();
// c.save();
// let rads = 240 * Math.PI*2.0/360.0;
// c.rotate(rads);
// c.restore();

// c.fillStyle = "black";
// c.fillRect(400,300, 100, 500);
// c.clip();
// c.fillStyle = 'black';
/////////////////////////////