function Zombie(context, map) {
    this.c = context;
    this.x = canvasWidth-40;
    this.y = canvasHeight-40;
    this.map = map;
    this.stepOfMovement = 4; // 1.7;
    
    Zombie.prototype.drawZombie = (direction) => {
        const zombie = document.getElementById('zombie');
        this.c.save();
        // this.c.rotate(this.directionFacing);
        this.c.drawImage(zombie, 0, 0, 305, 231, 0, 0, 30, 23);
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
    }
        
    Zombie.prototype.moveZombie = () => {
        switch((Math.floor(Math.random()) * 4)){
             case 0:
                if (this.y > 5 && this.intersectsMap(this.x, this.y - 10, this.map) === false) {
                    this.y -= this.stepOfMovement; // UP
                }
                break;
                case 1:
                if (this.y < this.map.height-5 &&  this.intersectsMap(this.x, this.y + 10, this.map) === false) {
                    this.y += this.stepOfMovement; // DOWN
                }
                break;
                case 2:
                if (this.x > 5  && this.intersectsMap(this.x - 10, this.y, this.map) === false) {
                    this.x -= this.stepOfMovement; // LEFT
                }
                break;
                case 3:
                if (this.x < this.map.width-5 &&  this.intersectsMap(this.x + 10, this.y, this.map) === false) {
                    this.x += this.stepOfMovement; // RIGHT
                };
                break;
        }
    };

    Zombie.prototype.moveFlashlight = () => {
        let delta = (this.centerDegree - theta) % 360;
        this.directionFacing = (((this.centerDegree % 360) - 90) * Math.PI / 180);
    };
    
    Zombie.prototype.update = () => {
        this.moveZombie();
        console.log(this.x, this.y)
    };
    
    Zombie.prototype.draw = () => {
        this.drawZombie(this.directionFacing);
    };
}

module.exports = Zombie;