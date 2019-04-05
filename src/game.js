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
          maps.map1,
          maps.map2,
          maps.map3,
          maps.map4,
          maps.map5,
          maps.map6,
        ];
    
    let originalMaps = [
        JSON.parse(JSON.stringify(maps.map1)),
        JSON.parse(JSON.stringify(maps.map2)),
        JSON.parse(JSON.stringify(maps.map3)),
        JSON.parse(JSON.stringify(maps.map4)),
        JSON.parse(JSON.stringify(maps.map5)),
        JSON.parse(JSON.stringify(maps.map6))
    ];

    let mute = false;
    let player;
    let gameMap;
    let zombie1;
    let welcome = new Welcome(context);
    let zombieSound = new Sound('./images/zombie.m4a');
    let dungeonSound = new Sound('./images/dripping.mp3');
    let levelUpSound = new Sound('./images/teleport.wav');
    let canvasMute = document.getElementById("canvas-mute");
    canvasMute.addEventListener('click', (e) => {
        mute = !mute;
        player.mute = !player.mute;
        if (!mute){
            dungeonSound.play(); 
        } else {
            dungeonSound.stop(); 
        }
    });

    Game.prototype.init = () => {

        if (!mute) dungeonSound.play();
        gameMap = new Map(mapArray[this.level], '#000000');
        gameMap.generate();
        player = new Player(context, 0, 60, 300, gameMap, this.level, mute);
        let random = this.randomSpot();
        zombie1 = new Zombie(context, gameMap, player, random[0] + 50, random[1] + 50);
    };

    Game.prototype.randomSpot = () => {
        return gameMap.blankSpots[Math.floor(Math.random() * gameMap.blankSpots.length)];
    }

    Game.prototype.update = () => {
        zombie1.update();
        if ( Math.abs(player.x - zombie1.x) < 30 && Math.abs(player.y - zombie1.y) < 30 ){
            this.level = -1;
            player.level = -1;
        }
        if ( Math.abs(player.x - zombie1.x) < 400 && Math.abs(player.y - zombie1.y) < 400 ){
            player.zombieNearby = true;
            if (mute){
                zombieSound.stop(); 
            } else {
                zombieSound.play();
            }
        } else {
            zombieSound.stop(); 
            player.zombieNearby = false;
        }
        let canvasMute = document.getElementById("canvas-mute");
        let context4 = canvasMute.getContext('2d')
        context4.clearRect(0, 0, canvasWidth, canvasHeight);  
        context4.font="25px Arima Madurai";
        context4.fillStyle = "white";
        if (mute){
            context4.fillText(`🔇`, 50, 25);
        } else {
            context4.fillText(`🔈`, 50, 25);
        }
    };

    Game.prototype.shade = () => {
        context.drawImage(gameMap.image, player.x-canvasWidth/2, player.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);   
        zombie1.draw();
        context.save();
            let gradient = context.createRadialGradient(
                canvasWidth/2, canvasHeight/2, player.currentRadius/5, 
                canvasWidth/2, canvasHeight/2, player.currentRadius);
            if ((Math.floor(Math.random() * 50) === 5)){
                gradient.addColorStop(0, "#000");
            } else {
                gradient.addColorStop(0, "transparent");
            }
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
        this.shade();
        player.drawSprite();
    } 
    
    Game.prototype.animate = () => {
        requestAnimFrame(this.animate);
        this.update();
        this.draw();
        if (player.exit === true && this.level < 6) {
            this.level += 1;
            if (!mute) levelUpSound.play();
            this.init();
        }
        if (this.level === 6){
            welcome.winner();
        }
        if (player.continue === true && this.level === -1) {
            this.level = 0;
            mapArray[0] = JSON.parse(JSON.stringify(originalMaps[0]));
            mapArray[1] = JSON.parse(JSON.stringify(originalMaps[1]));
            mapArray[2] = JSON.parse(JSON.stringify(originalMaps[2]));
            mapArray[3] = JSON.parse(JSON.stringify(originalMaps[3]));
            mapArray[4] = JSON.parse(JSON.stringify(originalMaps[4]));
            mapArray[5] = JSON.parse(JSON.stringify(originalMaps[5]));
            if (!mute) levelUpSound.play();
            this.init();
        }
        if (this.level === -1){
            welcome.loser();
        }
    };  
    ;
    Game.prototype.play = () => {
        welcome.draw();
        setTimeout(this.init, 10000);
        setTimeout(this.animate, 10500);
        // this.init();
        // this.animate();
        
    };
}
module.exports = Game;