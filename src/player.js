function Player(context, centerDegree, flashlightWidth, radius, color, color2, map) {
        this.c = context;
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.radius = radius;
        this.currentRadius = radius;
        this.color = color;
        this.color2 = color2;
        this.map = map;
        this.startItems = [' [1] No Flashlight', ' [2] High Beams', ' [3] Normal Flashlight'];
        this.items = [];
        this.flashlightWidth = flashlightWidth;
        this.centerDegree = centerDegree;
        this.degreeOfRotation = 4;
        this.stepOfMovement = 4; // 1.7;
        this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
        this.jumpPower = 100;
        this.batteryPower = 200;
        this.batteryDrain = .01;
        
        Player.prototype.drawPlayer = (direction) => {
            // const sprite = document.getElementById('sprite');
            this.c.save();
            this.c.beginPath(canvasWidth/2, canvasHeight/2);
            this.c.arc(canvasWidth/2, canvasHeight/2, this.currentRadius, this.startAngle, this.endAngle, false);
            this.c.lineTo(canvasWidth/2, canvasHeight/2);
            this.c.fillStyle = this.grad;
            this.c.fill();		
            this.drawSprite();
            this.c.restore();
            if (this.batteryPower > 0){
                this.batteryPower -= this.batteryDrain;
            } else {
                this.batteryPower = 0;
                this.currentRadius = 0;
                this.batteryDrain = 0;
            }
        };

        Player.prototype.drawSprite = () => {
            const sprite = document.getElementById('sprite');
            this.c.save();
            this.c.translate((canvasWidth+3)/2, (canvasHeight-6)/2);
            this.c.rotate(this.directionFacing);
            this.c.drawImage(sprite, 0, 0, 305, 231, -34,-12, 30, 23);
            this.c.restore();
        }

        Player.prototype.regenerate = () => {
            if (this.jumpPower < 100) {
                this.jumpPower += 1;
            }
        }

        Player.prototype.createGradient = (inputRadius, color1, color2) => {
            this.grad = this.c.createRadialGradient(canvasWidth/2, canvasHeight/2, inputRadius / 5, canvasWidth/2, canvasHeight/2,  inputRadius);
            this.grad.addColorStop(0, color1);
            this.grad.addColorStop(1, color2); 
        };

        Player.prototype.intersectsMap = (x, y, map) => {
            let xTile = ~~(x/100);
            let yTile = ~~(y/100);
            if (map.map[yTile][xTile] === 1){
                return true;
            } else if (map.map[yTile][xTile] === 'b'){
                this.items.push("[5] battery");
                map.map[yTile][xTile]  = 0;
                return false;
            } else {
                return false;
            }
        }
            
        Player.prototype.movePlayer = () => {
            if (38 in keysDown || 87 in keysDown) { // === UP
                if (this.y > 5 && this.intersectsMap(this.x, this.y - 10, this.map) === false) {
                    if (32 in keysDown && this.jumpPower > 6) {
                        this.y -= this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.y -= this.stepOfMovement;
                    }
                }
            }
            if (40 in keysDown || 83 in keysDown) { // === DOWN
                if (this.y < this.map.height-5 &&  this.intersectsMap(this.x, this.y + 10, this.map) === false) {
                    if (32 in keysDown && this.jumpPower > 5) {
                        this.y += this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.y += this.stepOfMovement;
                    }
                }
            }
            if (37 in keysDown || 65 in keysDown) { // === LEFT
                if (this.x > 5  && this.intersectsMap(this.x - 10, this.y, this.map) === false) {
                    if (32 in keysDown && this.jumpPower > 5) {
                        this.x -= this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.x -= this.stepOfMovement;
                    }
                }
            }
            if (39 in keysDown || 68 in keysDown) { // === RIGHT
                if (this.x < this.map.width-5 &&  this.intersectsMap(this.x + 10, this.y, this.map) === false) {
                    if (32 in keysDown && this.jumpPower > 5) {
                        this.x += this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.x += this.stepOfMovement;
                    }
                }
            }
        };

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

        Player.prototype.useItems = () => {
            if (this.batteryPower > 0) {
                if (49 in keysDown) { // === 1
                    this.currentRadius = 0;
                    this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
                    this.batteryDrain = 0
                } else if (50 in keysDown) { // === 2
                    this.currentRadius = this.radius * 2;
                    this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
                    this.batteryDrain = .05
                } else if (51 in keysDown) { // === 3
                    this.currentRadius = this.radius;
                    this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
                    this.batteryDrain = .01;
                } else if (52 in keysDown) { // === 4
                    this.currentRadius = this.radius * 0.7;
                    this.flashlightAngle = ((360) * Math.PI / 180);
                }
            }
            if (53 in keysDown && this.items.includes("[5] battery")) { // === 5
                this.batteryPower += 50;
                this.items.splice( this.items.indexOf("[5] battery"), 1 );

            }
        };

        Player.prototype.drawStats = () => {
            let canvas2 = document.getElementById("battery-level");
            let context2 = canvas2.getContext("2d");	
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            context2.font="15px Arial";
            context2.fillStyle = "white";
            // context2.textAlign = "left";
            context2.fillText(`sprint: ${this.jumpPower}`, 0, 50);
            context2.fillText(`battery: ${Math.floor(this.batteryPower)}`, 0, 100);
            context2.fillText(`${this.startItems}`, 200, 50);
            context2.fillText(`${this.items}`, 200, 100);
        }
        
        Player.prototype.update = () => {
            this.movePlayer();
            this.moveFlashlight();
            this.useItems();
            this.regenerate();
            this.createGradient(this.currentRadius, this.color, this.color2);
        };
        
        Player.prototype.draw = () => {
            this.drawPlayer(this.directionFacing);
            this.drawStats();
        };
    }

module.exports = Player;