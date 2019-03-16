function Player(context, centerDegree, flashlightWidth, radius, color, color2, map) {
        this.c = context;
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.radius = radius;
        this.currentRadius = radius;
        this.color = color;
        this.color2 = color2;
        this.map = map;
        this.flashlightWidth = flashlightWidth;
        this.centerDegree = centerDegree;
        this.degreeOfRotation = 4;
        this.stepOfMovement = 5; // 1.7;
        this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
        this.jumpPower = 100;
        
        Player.prototype.drawPlayer = function(direction){
            const sprite = document.getElementById('sprite');
            this.c.save();
            this.c.drawImage(sprite, 0, 0, 305, 231, canvasWidth/2-10, canvasHeight/2-10, 30, 23);
            this.c.beginPath(canvasWidth/2, canvasHeight/2);
            this.c.arc(canvasWidth/2, canvasHeight/2, radius, this.startAngle, this.endAngle, false);
            this.c.lineTo(canvasWidth/2, canvasHeight/2);
            this.c.fillStyle = this.grad;
            this.c.fill();		
            this.c.rotate(direction);
            this.c.restore();
        };

        Player.prototype.regenerate = () => {
            if (this.jumpPower < 100) {
                this.jumpPower += 1;
            }
        }

        Player.prototype.createGradient = (inputRadius) => {
            this.grad = this.c.createRadialGradient(canvasWidth/2, canvasHeight/2, inputRadius / 5, canvasWidth/2, canvasHeight/2,  inputRadius);
            this.grad.addColorStop(0, this.color);
            this.grad.addColorStop(1, this.color2);
        };

        Player.prototype.intersectsMap = (x, y, map) => {
            let xTile = ~~(x/100);
            let yTile = ~~(y/100);
            if (map.map[yTile][xTile] === 1){
                return true;
            } else {
                return false;
            }
        }
            
        Player.prototype.movePlayer = () => {
            if (38 in keysDown || 87 in keysDown) { // === UP
                if (this.y > 5 && this.intersectsMap(this.x, this.y - 10, this.map) === false) {
                    this.y -= this.stepOfMovement;
                }
            }
            if (40 in keysDown || 83 in keysDown) { // === DOWN
                if (this.y < this.map.height-5 &&  this.intersectsMap(this.x, this.y + 10, this.map) === false) {
                    this.y += this.stepOfMovement;
                }
            }
            if (37 in keysDown || 65 in keysDown) { // === LEFT
                if (this.x > 5  && this.intersectsMap(this.x - 10, this.y, this.map) === false) {
                    this.x -= this.stepOfMovement;
                }
            }
            if (39 in keysDown || 68 in keysDown) { // === RIGHT
                if (this.x < this.map.width-5 &&  this.intersectsMap(this.x + 10, this.y, this.map) === false) {
                    this.x += this.stepOfMovement;
                }
            }
        };
        // Player.prototype.movePlayer = () => {
        //     if (38 in keysDown || 87 in keysDown) { // === UP
        //         if (32 in keysDown && this.y > 0 && this.jumpPower > 5) {
        //             this.y -= this.stepOfMovement * 3;
        //             this.jumpPower -= 5;
        //         } else if (this.y > 0) {
        //             this.y -= this.stepOfMovement;
        //         }
        //     }
        //     if (40 in keysDown || 83 in keysDown) { // === DOWN
        //         if (32 in keysDown && this.y < this.map.height && this.jumpPower > 5) {
        //             this.y += this.stepOfMovement * 3;
        //             this.jumpPower -= 5;
        //         } else if (this.y < this.map.height) {
        //             this.y += this.stepOfMovement;
        //         }
        //     }
        //     if (37 in keysDown || 65 in keysDown) { // === LEFT
        //         if (32 in keysDown && this.x > 0 && this.jumpPower > 5) {
        //             this.x -= this.stepOfMovement * 3;
        //             this.jumpPower -= 5;
        //         } else if (this.x > 0) {
        //             this.x -= this.stepOfMovement;
        //         }
        //     }
        //     if (39 in keysDown || 68 in keysDown) { // === RIGHT
        //         if (32 in keysDown && this.x < this.map.width && this.jumpPower > 5) {
        //             this.x += this.stepOfMovement * 3;
        //             this.jumpPower -= 5;
        //         } else if (this.x < this.map.width) {
        //             this.x += this.stepOfMovement;
        //         }
        //     }
        // };
    
        Player.prototype.getTheta = (cx, cy, ex, ey) => {
            let dy = ey - cy;
            let dx = ex - cx;
            let theta = Math.atan2(dy, dx);
            theta *= 180 / Math.PI;
            if (theta < 90) theta = 360 + theta;
            return (theta - 90);
        }

        Player.prototype.moveFlashlight = () => {
            let theta = this.getTheta(mouse.x, mouse.y, canvasWidth/2, canvasHeight/2);
            let delta = (this.centerDegree - theta) % 360;
            if (delta <= -355 && delta <= 5) {
                this.centerDegree += theta;
            }
            else if ((delta > -180 && delta < -5) || (delta > 180 && delta < 360)) {
                this.centerDegree += this.degreeOfRotation;
            }
            else if ((delta <= -180 && delta > -355) || (delta > 5 && delta < 180)) {
                this.centerDegree -= this.degreeOfRotation;
            }
            this.directionFacing = (((this.centerDegree % 360) - 90) * Math.PI / 180);
            this.startAngle = this.directionFacing - (this.flashlightAngle / 2);
            this.endAngle = this.directionFacing + (this.flashlightAngle / 2);
        };

        Player.prototype.changeFlashlight = () => {
            if (49 in keysDown) { // === 1
                this.currentRadius = this.radius * 2;
                this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
            } else if (50 in keysDown) { // === 2
                this.currentRadius = this.radius;
                this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
            } else if (51 in keysDown) { // === 3
                this.flashlightAngle = ((360) * Math.PI / 180);
                this.currentRadius = this.radius * .7;
            }
        };
        
        Player.prototype.update = () => {
            this.movePlayer();
            this.moveFlashlight();
            this.changeFlashlight();
            this.regenerate();
            this.createGradient(this.currentRadius);
            
        };
        
        Player.prototype.draw = () => {
            this.drawPlayer(this.directionFacing);
        };
    }

module.exports = Player;