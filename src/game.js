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
        // '#090909',
        // '#080808',
        '#060606',
        // '#040404',
        '#020202',
        // '#000000',
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
        gameMap = new Map(mapArray[level], colorArray[level]);
        gameMap.generate();
        player = new Player(context, 0, 60, 150, '#797939', 'black', gameMap, level);
    };

    Game.prototype.update = () => {
        player.update();
    };

    Game.prototype.draw = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        player.draw();
        context.drawImage(gameMap.image, player.x-canvasWidth/2, player.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);        
    }
    
    Game.prototype.animate = () => {
        requestAnimFrame(this.animate);
        this.update();
        this.draw();
        if (player.exit === true && this.level < 6) {
            this.level += 1;
            this.init(this.level);
            console.log("next level");
        }
        if (this.level === 6){
            console.log("You win");
        }
    };  

    Game.prototype.play = () => {
        this.init(0);
        this.animate();
        };
}
module.exports = Game;