<p align="center">
      <a href="https://github.com/jameshawkinsjr/sliver">
    <img src="https://github.com/jameshawkinsjr/sliver/blob/master/dist/images/sliver_logo.png" alt="logo" width="150">
    </a>
</p>

[Play a live version here](https://jameshawkinsjr.github.io/sliver/dist/)

_sliver_ is a original concept, in browser game about finding a way out with limited sources of light.
    

## Technologies

* JavaScript // keeping control of game logic and state
* HTML5 Canvas // rendering the player, map, items, enemies, and player statistics
* Webpack // script bundling


## Game Features

* Limited viewport that follows the player's mouse in order to navigate the level
* Collsion detection with enemies that roam around the maze, looking for the player
* Sound effects based on an enemies proximity to the player
* Items spawn at various places on the map, allowing a player to pick up and use them
   
   <p align="center">
    <img src="https://github.com/jameshawkinsjr/sliver/blob/master/dist/images/sliver.gif" alt="gameplay" width="600">
   </p>
   
## Functionality

#### **Collision Detection**

In order to detect where a player can go, the map array is compared against the users current location and the following function determines whether a player's move is valid in relation to their position on the map. This is also used to pick up items and determine whether the player has been touched by an enemy zombie.

  ```js
          Player.prototype.intersectsMap = (x, y, map) => {
            let xTile = ~~(x/120);
            let yTile = ~~(y/120);
            
            if (map.map[yTile][xTile] === 1){
                return true;
            } else if (map.map[yTile][xTile] === 'b'){
                if (!this.mute) itemSound.play();
                this.items.push("[5] Battery");
                map.map[yTile][xTile]  = 0;
                this.c.drawImage(map.image, this.x-canvasWidth/2, this.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);   
                this.map.generate();
            } else if (map.map[yTile][xTile] === 'l'){
                if (!this.mute) itemSound.play();
                this.items.push("[4] Lantern");
                map.map[yTile][xTile]  = 0;
                this.c.drawImage(map.image, this.x-canvasWidth/2, this.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);   
                this.map.generate();
            } else if (map.map[yTile][xTile] === 'k'){
                if (!this.mute) itemSound.play();
                this.keys[0] = "In Inventory";
                this.items.push("Golden Key");
                map.map[yTile][xTile]  = 0;
                this.c.drawImage(map.image, this.x-canvasWidth/2, this.y-canvasWidth/2, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);   
                this.map.generate();
            } else if (map.map[yTile][xTile] === 'e' && this.keys[0] === "In Inventory"){
                this.exit = true;
                map.map[yTile][xTile]  = 0;
            }
            return false;
          };
   ```

#### **Limited Viewport**

To track the player's mouse movements and provide a limited view (flashlight) of the map, the theta angle between the mouse and the player's current position is calculated. With the theta angle, the degree of movement is determined and the player on-screen begins to turn towards the mouse. A rotation degree speed was introduced in order to slow the turning down, which allows for additional suspense.

  ```js
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
   ```
#### **Player Movement**

Using keypress event listeners, we can take the player's keyboard input and map it to a movement direction. In doing so, we validate whether the move is valid by checking to see if it intersects the map. If it does not intersect, the player moves in that direction. Additionally, if the player is holding the `shift` key and have enough power, they can also sprint in the direction they're moving.

  ```js
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
   ```