let Player = require('./player');
let Zombie = require('./zombie');
let Map = require('./map');
let maps = require('./maps');

function Game(context){


    let colorArray = [
        '#080808',
        '#060606',
        '#040404',
        '#020202',
        '#000000',
    ];

    let player;
    let gameMap;
    Game.prototype.init = () => {

        gameMap = new Map(maps.map4);
        gameMap.generate();
        player = new Player(context, 0, 60, 150, '#797939', 'black', gameMap);
        // zombie = new Zombie(context, gameMap);
    };

    Game.prototype.update = () => {
        player.update();
        // zombie.update();
    };

    Game.prototype.draw = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.save();
        context.translate(player.x - canvasWidth, player.y - canvasHeight);
        context.restore(); 
        player.draw();
        // zombie.draw();
        context.drawImage(gameMap.image, player.x-canvasWidth/2, player.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);        
    }
    
    Game.prototype.animate = () => {
        requestAnimFrame(this.animate);
        this.update();
        this.draw();
        
    };  

}
module.exports = Game;