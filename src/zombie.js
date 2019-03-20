function Zombie(context, map, player) {
    this.c = context;
    this.x = 450;
    this.y = 450;
    // this.x = this.x - context.canvas.width/2;
    // this.posY = this.y - context.canvas.height/2;
    this.map = map;
    this.stepOfMovement = 4; // 1.7;
    this.timeSinceUpdate = 0;
    this.random = 3;
    
    Zombie.prototype.drawZombie = (direction) => {
        const zombie = document.getElementById('zombie');
        this.c.save();
        this.c.translate((this.x + 300) - player.x, (this.y + 300) - player.y);
        this.c.rotate(this.directionFacing);
        this.c.drawImage(zombie, 0, 0, 305, 231, -15, -12, 30, 23);
        this.c.restore();
    };

    Zombie.prototype.intersectsMap = (x, y, map) => {
        let xTile = ~~(x/100);
        let yTile = ~~(y/100);
        if (map.map[yTile][xTile] === 1){
            return true;
        } else {
            return false;
        }
    };
        
    Zombie.prototype.moveZombie = (input) => {
        switch(input){
             case 0:
                if (this.y > 5 && this.intersectsMap(this.x, this.y - 15, this.map) === false) {
                    this.y -= this.stepOfMovement; // UP
                    this.directionFacing = (((0 % 360) - 90) * Math.PI / 180);
                } else {
                    this.timeSinceUpdate = 100;
                }
                break;
            case 1:
                if (this.y < this.map.height-5 &&  this.intersectsMap(this.x, this.y + 15, this.map) === false) {
                    this.y += this.stepOfMovement; // DOWN
                    this.directionFacing = (((180 % 360) - 90) * Math.PI / 180);
                }else {
                    this.timeSinceUpdate = 100;
                }
                break;
            case 2:
                if (this.x > 5  && this.intersectsMap(this.x - 15, this.y, this.map) === false) {
                    this.x -= this.stepOfMovement; // LEFT
                    this.directionFacing = (((270 % 360) - 90) * Math.PI / 180);
                }else {
                    this.timeSinceUpdate = 100;
                }
                break;
            case 3:
                if (this.x < this.map.width-5 &&  this.intersectsMap(this.x + 15, this.y, this.map) === false) {
                    this.x += this.stepOfMovement; // RIGHT
                    this.directionFacing = (((90 % 360) - 90) * Math.PI / 180);
                }else {
                    this.timeSinceUpdate = 100;
                }
                break;
        }
    };
    
    Zombie.prototype.update = () => {
        if (this.timeSinceUpdate > 40){
            this.random = Math.floor(Math.random() * 4);
            this.timeSinceUpdate = 0;
        } else {
            this.timeSinceUpdate += 1;
        }
        console.log(this.timeSinceUpdate, this.random);
        this.moveZombie(this.random);
    };
    
    Zombie.prototype.draw = () => {
        this.drawZombie(this.directionFacing);
    };
}

module.exports = Zombie;