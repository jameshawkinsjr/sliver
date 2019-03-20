let Player = require('./player');
let Zombie = require('./zombie');
let Map = require('./map');
let maps = require('./maps');

function Game(context){
    this.level = 0;

    let requestAnimFrame = ( () => { 
        return  window.requestAnimationFrame       ||  
                window.webkitRequestAnimationFrame ||  
                window.mozRequestAnimationFrame    ||  
                window.oRequestAnimationFrame      ||  
                window.msRequestAnimationFrame     ||  
                function( callback ){ 
                  window.setTimeout(callback, 1000 / 60); 
                }; 
      })(); 

    let colorArray = [
        '#060606',
        '#020202',
        '#000000',
        '#000000',
        '#000000',
        '#000000',
    ];

    let mapArray = [
        maps.map1,
        maps.map2,
        maps.map3,
        maps.map4,
        maps.map5,
        maps.map6,
    ];

    let player;
    let gameMap;
    Game.prototype.init = (level) => {
        gameMap = new Map(mapArray[this.level], colorArray[this.level]);
        gameMap.generate();
        player = new Player(context, 0, 60, 200, '#797939', 'black', gameMap, this.level);
        zombie = new Zombie(context, gameMap, player);
    };

    Game.prototype.update = () => {
        player.update();
        zombie.update();
    };

    Game.prototype.draw = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        player.draw();
        zombie.draw();
        context.drawImage(gameMap.image, player.x-canvasWidth/2, player.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);        
        context.save();
        let gradient = context.createRadialGradient(
            canvasWidth/2, canvasHeight/2, player.currentRadius/5, 
            canvasWidth/2, canvasHeight/2, player.currentRadius);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "#000");
        context.beginPath(canvasWidth/2, canvasHeight/2);
        context.arc(canvasWidth/2, canvasHeight/2, 360, 90, 180, false);
        context.lineTo(canvasWidth/2, canvasHeight/2);
        context.fillStyle = gradient;
        context.fill();	
        context.restore();
        
    }
    Game.prototype.winner = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="45px Arima Madurai";
        context.fillStyle = "white";
        context.fillText(`You won!`, 200, canvasHeight/2 + 50);
    }
    Game.prototype.welcome = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="30px Arima Madurai";
        context.fillStyle = "#b7b7b7";
        context.fillText(`this is sliver.`, 0, 200);
        context.fillText(`find the key.`, 0, 250);
        context.fillText(`find the way out.`, 0, 300);
    }

    Game.prototype.batteries = () => {
        context.fillText(`don't run out of batteries.`, 0, 350)
    }
    Game.prototype.controls = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="45px Arima Madurai";
        context.fillStyle = "#b7b7b7";
        context.fillText(`controls`, canvasWidth/2-80, 100);
        context.font="30px Arima Madurai";
        context.fillText(`up (w)`, canvasWidth/2-45, 200);
        context.fillText(`left (a) / down (s) / right (d)`, canvasWidth/2-180, 250);
        context.fillText(`look around (mouse)`, canvasWidth/2-130, 350);
        context.fillText(`sprint (space)`, canvasWidth/2-80, 400);
        context.fillText(`items (numbers 1-9)`, canvasWidth/2-130, 500);
    }
    
    Game.prototype.animate = () => {
        requestAnimFrame(this.animate);
        this.update();
        this.draw();
        if (player.exit === true && this.level < 6) {
            this.level += 1;
            this.init(this.level);
        }
        if (this.level === 6){
            this.winner();
        }
    };  

    Game.prototype.play = () => {
        // this.welcome();
        // setTimeout(this.batteries, 3000);
        // setTimeout(this.controls, 7000);
        // setTimeout(this.init, 12000);
        // setTimeout(this.animate, 13000);
        this.init();
        this.animate();
        
    };
}
module.exports = Game;