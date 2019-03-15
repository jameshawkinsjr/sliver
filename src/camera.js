function Camera(map) {

    this.x = 0;
    this.y = 0;
    this.xMovement = 0;
    this.yMovement = 0;

    this.xDeadZone = canvasWidth/2;
    this.yDeadZone = canvasHeight/2;

    this.followed = null;

    this.worldRect = new Map(map);
}



module.exports = Camera;