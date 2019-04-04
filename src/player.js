let Sound = require('./sound');

function Player(context, centerDegree, flashlightWidth, radius, color, color2, map, level, mute) {
        this.c = context;
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.radius = radius;
        this.currentRadius = radius;
        this.color = color;
        this.color2 = color2;
        this.map = map;
        this.startItems = [' [1] Off', ' [2] Hi-Beam', ' [3] Normal'];
        this.items = [];
        this.keys = [];
        this.exit = false;
        this.mute = false;
        this.continue = false;
        this.zombieNearby = false;
        this.level = level;
        this.flashlightWidth = flashlightWidth;
        this.centerDegree = centerDegree;
        this.degreeOfRotation = 4;
        this.stepOfMovement = 3; // 1.7;
        this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
        this.directionFacing = (((this.centerDegree % 360) - 90) * Math.PI / 180);
        this.startAngle = this.directionFacing - (this.flashlightAngle / 2);
        this.endAngle = this.directionFacing + (this.flashlightAngle / 2);
        this.jumpPower = 100;
        this.batteryPower = 200;
        this.batteryDrain = 0.01;

        let itemSound = new Sound('./images/item.mp3');
        
        let keysDown = {};
        addEventListener( "keydown",  (e) => { keysDown[e.keyCode] = true; } );
        addEventListener( "keyup",    (e) => { delete keysDown[e.keyCode]; } );
        
        Player.prototype.drawPlayer = () => {
            this.c.save();
            this.c.beginPath(canvasWidth/2, canvasHeight/2);
            this.c.arc(canvasWidth/2, canvasHeight/2, this.currentRadius, this.startAngle, this.endAngle, false);
            this.c.lineTo(canvasWidth/2, canvasHeight/2);
            this.c.fillStyle = this.grad;
            this.c.fill();		
            this.c.restore();
        };

        Player.prototype.drawSprite = () => {
            let sprite = new Image();
            sprite.src = './images/player.png';
            this.c.save();
            this.c.translate((canvasWidth+3)/2, (canvasHeight-6)/2);
            this.c.rotate(this.directionFacing);
            this.c.drawImage(sprite, 0, 0, 305, 231, -40, -14, 40, 30);
            this.c.restore();
        }

        Player.prototype.regenerate = () => {
            if (this.batteryPower > 0){
                this.batteryPower -= this.batteryDrain;
            } else {
                this.batteryPower = 0;
                this.currentRadius = 0;
                this.batteryDrain = 0;
            }
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
            let xTile = ~~(x/120);
            let yTile = ~~(y/120);
            
            if (map.map[yTile][xTile] === 1){
                return true;
            } else if (map.map[yTile][xTile] === 'b'){
                this.items.push("[5] Battery");
                map.map[yTile][xTile]  = 0;
                this.map.generate();
                if (!this.mute) itemSound.play();
            } else if (map.map[yTile][xTile] === 'l'){
                this.items.push("[4] Lantern");
                if (!this.mute) itemSound.play();
                map.map[yTile][xTile]  = 0;
                this.map.generate();
            } else if (map.map[yTile][xTile] === 'k'){
                this.keys[0] = "In Inventory";
                this.items.push("Golden Key");
                if (!this.mute) itemSound.play();
                map.map[yTile][xTile]  = 0;
                this.map.generate();
            } else if (map.map[yTile][xTile] === 'e' && this.keys[0] === "In Inventory"){
                this.exit = true;
                map.map[yTile][xTile]  = 0;
            }
            return false;
        };
            
        Player.prototype.movePlayer = () => {
            if (13 in keysDown && this.level === -1){
                this.continue = true;
            }
            if (38 in keysDown || 87 in keysDown) { // === UP
                if (this.y > 5 && this.intersectsMap(this.x, this.y - 10, this.map) === false) {
                    if ( (32 in keysDown || 16 in keysDown) && this.jumpPower > 6) {
                        this.y -= this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.y -= this.stepOfMovement;
                    }
                }
            }
            if (40 in keysDown || 83 in keysDown) { // === DOWN
                if (this.y < this.map.height-5 &&  this.intersectsMap(this.x, this.y + 10, this.map) === false) {
                    if ((32 in keysDown || 16 in keysDown) && this.jumpPower > 5) {
                        this.y += this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.y += this.stepOfMovement;
                    }
                }
            }
            if (37 in keysDown || 65 in keysDown) { // === LEFT
                if (this.x > 5  && this.intersectsMap(this.x - 10, this.y, this.map) === false) {
                    if ((32 in keysDown || 16 in keysDown) && this.jumpPower > 5) {
                        this.x -= this.stepOfMovement * 2;
                        this.jumpPower -= 5;
                    } else {
                        this.x -= this.stepOfMovement;
                    }
                }
            }
            if (39 in keysDown || 68 in keysDown) { // === RIGHT
                if (this.x < this.map.width-5 &&  this.intersectsMap(this.x + 10, this.y, this.map) === false) {
                    if ((32 in keysDown || 16 in keysDown) && this.jumpPower > 5) {
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
                    // this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
                    this.batteryDrain = 0;
                } else if (50 in keysDown) { // === 2
                    this.currentRadius = this.radius * 2;
                    this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
                    this.batteryDrain = 0.05;
                } else if (51 in keysDown) { // === 3
                    this.currentRadius = this.radius;
                    this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
                    this.batteryDrain = 0.01;
                } else if (52 in keysDown && this.items.includes("[4] Lantern") ) { // === 4
                    this.currentRadius = this.radius * 0.7;
                    this.flashlightAngle = ((360) * Math.PI / 180);
                }
            }
            if (53 in keysDown && this.items.includes("[5] Battery")) { // === 5
                this.batteryPower += 50;
                this.items.splice( this.items.indexOf("[5] Battery"), 1 );

            }
        };

        Player.prototype.drawStats = () => {
            let canvas2 = document.getElementById("canvas-left");
            let context2 = canvas2.getContext("2d");	
            let canvas3 = document.getElementById("canvas-right");
            let context3 = canvas3.getContext("2d");	
            let canvas4 = document.getElementById("canvas-bottom");
            let context4 = canvas4.getContext("2d");	
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            context4.clearRect(0, 0, canvas4.width, canvas4.height);
            context2.font="20px Arima Madurai";
            context2.fillStyle = "white";
            context3.font="20px Arima Madurai";
            context3.fillStyle = "white";
            context4.font="20px Arima Madurai";
            context4.fillStyle = "white";
            context4.fillText(`Level: ${this.level + 1}`, 0, 25);
            context4.fillText(`Sprint:`, 100, 25);
            context4.fillText(`Key:`, 375, 25);
            context4.fillText(`Battery:`, 240, 25);
            if (this.batteryPower < 50){
                context4.fillStyle = "red";
            } else if (this.batteryPower < 100){
                context4.fillStyle = "yellow";
            } else if (this.batteryPower > 150) {
                context4.fillStyle = "#63d26e";
            }
            context4.fillText(`${Math.floor(this.batteryPower)}`, 315, 25);
            if (this.jumpPower < 25){
                context4.fillStyle = "red";
            } else {
                context4.fillStyle = "white";
            }
            context4.fillText(`${Math.floor(this.jumpPower)}`, 165, 25);
            if (this.keys[0] === 'In Inventory'){
                context4.fillStyle = "#63d26e";
                context4.fillText( this.keys[0], 420, 25);
            } else {
                context4.fillStyle = "red";
                context4.fillText( "Missing", 420, 25);
            }
            if (this.zombieNearby){
                context4.fillStyle = "red";
                context4.fillText(`CAUTION: ZOMBIE NEARBY`, 0, 75);
                context4.fillStyle = "white";
            }
            context2.fillStyle = "white";
            context3.fillText(`${this.startItems[0]}`, 0, 50);
            context3.fillText(`${this.startItems[1]}`, 0, 75);
            context3.fillText(`${this.startItems[2]}`, 0, 100);
            context3.fillText(`${this.items[0] || ""}`, 0, 175);
            context3.fillText(`${this.items[1] || ""}`, 0, 200);
            context3.fillText(`${this.items[2] || ""}`, 0, 225);
            context3.fillText(`${this.items[3] || ""}`, 0, 250);
            context3.fillText(`${this.items[4] || ""}`, 0, 275);
            context2.fillText(`Up: W`, 0, 150);
            context2.fillText(`Left: A`, 0, 175);
            context2.fillText(`Down: S`, 0, 200);
            context2.fillText(`Right: D`, 0, 225);
            context2.fillText(`Sprint: Shift`, 0, 250);
            context2.fillText(`Items: 1-5`, 0, 275);
            if (this.keys[0] === 'Key: In Inventory'){
                context2.fillStyle = "#323537";
                context2.fillText(`Find the Key`, 0, 50);
                var text = context2.measureText("Find the Key");
                context2.fillRect(0, 45, text.width, 2);
                context2.fillStyle = "#63d26e";
                context2.fillText(`Find the Exit`, 0, 75); 
            } else {
                context2.fillStyle = "#63d26e";
                context2.fillText(`Find the Key`, 0, 50);
                context2.fillStyle = "white";
                context2.fillText(`Find the Exit`, 0, 75); 
            }
            context2.fillStyle = "yellow";
            context3.fillStyle = "yellow";
            context3.fillText(`Flashlight`, 0, 25);
            context3.fillText(`Items`, 0, 150);
            context2.fillText(`Objectives`, 0, 25);
            context2.fillText(`Controls`, 0, 125);
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