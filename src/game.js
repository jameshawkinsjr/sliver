let Player = require('./player');
let Zombie = require('./zombie');
let Map = require('./map');
let maps = require('./maps');
let Welcome = require('./welcome');
let Sound = require('./sound');

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
    let mapArray = [
        // maps.map0,
        maps.map1,
        maps.map2,
        maps.map3,
        maps.map4,
        maps.map5,
        maps.map6,
    ];

    let player;
    let gameMap;
    let zombie1;
    let welcome = new Welcome(context);
    Game.prototype.init = () => {
        zombieSound = new Sound('./images/zombie.m4a');
        dungeonSound = new Sound('./images/dripping.mp3');
        levelUpSound = new Sound('./images/teleport.wav');
        dungeonSound.play();
        gameMap = new Map(mapArray[this.level], '#000000');
        gameMap.generate();
        player = new Player(context, 0, 60, 300, '#797939', 'black', gameMap, this.level);
        let random = this.randomSpot();
        zombie1 = new Zombie(context, gameMap, player, random[0] + 50, random[1] + 50);
        console.log(zombie1);
        random = this.randomSpot();
        zombie2 = new Zombie(context, gameMap, player, random[0] + 50, random[1] + 50);

    };

    Game.prototype.randomSpot = () => {
        return gameMap.blankSpots[Math.floor(Math.random() * gameMap.blankSpots.length)];
    }

    Game.prototype.update = () => {
        player.update();
        zombie1.update();
        zombie2.update();

        let playerX = player.x;
        let playerY = player.y;
        let zombieX = ((zombie1.x + 300) - playerX);
        let zombieY = ((zombie1.y + 300) - playerY);
        if ( Math.abs(playerX - zombieX) < 60 && Math.abs(playerY - zombieY) < 60 ){
            this.level = -1;
        }
        if ( Math.abs(playerX - zombieX) < 400 && Math.abs(playerY - zombieY) < 400 ){
            zombieSound.play();
        } else {
            zombieSound.stop(); 
        }
    };

    Game.prototype.shade = () => {
        context.drawImage(gameMap.image, player.x-canvasWidth/2, player.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);   
        context.save();
            let gradient = context.createRadialGradient(
                canvasWidth/2, canvasHeight/2, player.currentRadius/5, 
                canvasWidth/2, canvasHeight/2, player.currentRadius);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "#000");
            context.beginPath(canvasWidth/2, canvasHeight/2);
            context.arc(canvasWidth/2, canvasHeight/2, canvasHeight, player.startAngle, player.endAngle, false);
            context.lineTo(canvasWidth/2, canvasHeight/2);
            context.fillStyle = gradient;
            context.fill();	
        context.restore();
        context.save();
            context.beginPath(canvasWidth/2, canvasHeight/2);
            context.arc(canvasWidth/2, canvasHeight/2, canvasHeight, player.endAngle, player.startAngle, false);
            context.lineTo(canvasWidth/2, canvasHeight/2);
            context.fillStyle = "#000";
            context.fill();	
        context.restore();
    }

    Game.prototype.draw = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);  
        player.draw();
        zombie1.draw();
        zombie2.draw();
        this.shade();
        player.drawSprite();
    } 
    
    Game.prototype.animate = () => {
        requestAnimFrame(this.animate);
        this.update();
        this.draw();
        if (player.exit === true && this.level < 6) {
            this.level += 1;
            levelUpSound.play();
            this.init(this.level);
        }
        if (this.level === 6){
            welcome.winner();
        }
        if (this.level === -1){
            let keysDown = {};
            addEventListener( "keydown",  (e) => { keysDown[e.keyCode] = true; } );
            addEventListener( "keyup",    (e) => { delete keysDown[e.keyCode]; } );
            welcome.loser();
            if (38 in keysDown || 87 in keysDown) { // === UP
                this.init(1);
                this.animate();
            }
        }
    };  
    ;
    Game.prototype.play = () => {
        welcome.draw();
        setTimeout(this.init, 13000);
        setTimeout(this.animate, 13500);
        // this.init();
        // this.animate();
        
    };
}
module.exports = Game;