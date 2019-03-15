function Player(context, startX, startY, centerDegree, flashlightWidth, radius, color, color2, map) {
        this.c = context;
        this.x = startX;
        this.y = startY;
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
            this.c.clearRect(0,0,0,0);
            this.c.save();
            this.c.drawImage(sprite, 0, 0, 305, 231, this.x -10, this.y - 10, 30, 23);		
            this.c.rotate(direction);
            this.c.setTransform(1, 0, 0, 1, 0, 0);
            this.c.translate(0,0);
            this.c.restore();
        };

        Player.prototype.drawFlashlight = (radius) => {
            this.c.save();
            this.c.beginPath(this.x, this.y);
            this.c.arc(this.x, this.y, radius, this.startAngle, this.endAngle, false);
            this.c.lineTo(this.x, this.y);
            this.c.fillStyle = this.grad;
            this.c.fill();
            this.c.restore();
        };

        Player.prototype.regenerate = () => {
            if (this.jumpPower < 100) {
                this.jumpPower += 1;
            }
        }

        Player.prototype.createGradient = (inputRadius) => {
            this.grad = this.c.createRadialGradient(this.x, this.y, inputRadius / 5, this.x, this.y, inputRadius);
            this.grad.addColorStop(0, this.color);
            this.grad.addColorStop(1, this.color2);
        };

        Player.prototype.movePlayer = () => {
            if (38 in keysDown || 87 in keysDown) { // === UP
                if (32 in keysDown && this.y > 0 && this.jumpPower > 5) {
                    this.y -= this.stepOfMovement * 3;
                    this.jumpPower -= 5;
                } else if (this.y > 0) {
                    this.y -= this.stepOfMovement;
                }
            }
            if (40 in keysDown || 83 in keysDown) { // === DOWN
                if (32 in keysDown && this.y < this.map.height && this.jumpPower > 5) {
                    this.y += this.stepOfMovement * 3;
                    this.jumpPower -= 5;
                } else if (this.y < this.map.height) {
                    this.y += this.stepOfMovement;
                }
            }
            if (37 in keysDown || 65 in keysDown) { // === LEFT
                if (32 in keysDown && this.x > 0 && this.jumpPower > 5) {
                    this.x -= this.stepOfMovement * 3;
                    this.jumpPower -= 5;
                } else if (this.x > 0) {
                    this.x -= this.stepOfMovement;
                }
            }
            if (39 in keysDown || 68 in keysDown) { // === RIGHT
                if (32 in keysDown && this.x < this.map.width && this.jumpPower > 5) {
                    this.x += this.stepOfMovement * 3;
                    this.jumpPower -= 5;
                } else if (this.x < this.map.width) {
                    this.x += this.stepOfMovement;
                }
            }
        };
        
        Player.prototype.getDistance = (x1, y1, x2, y2) => {
            let xDistance = x2-x1;
            let yDistance = y2-y1;
            return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) )
        }
    
        Player.prototype.getTheta = (cx, cy, ex, ey) => {
            let dy = ey - cy;
            let dx = ex - cx;
            let theta = Math.atan2(dy, dx);
            theta *= 180 / Math.PI;
            if (theta < 90) theta = 360 + theta;
            return (theta - 90);
        }

        Player.prototype.moveFlashlight = () => {
            let theta = this.getTheta(mouse.x, mouse.y, this.x, this.y);
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
            this.drawPlayer(this.directionFacing);
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
            console.log(this.x, this.y);
            
        };

        Player.prototype.draw = () => {
            this.createGradient(this.currentRadius);
            this.drawFlashlight(this.currentRadius);
            this.drawPlayer(this.directionFacing);
        };
    }

module.exports = Player;