class Player {
    constructor(startX, startY, centerDegree, flashlightWidth, radius, color, color2) {
        this.x = startX;
        this.y = startY;
        this.radius = radius;
        this.currentRadius = radius;
        this.color = color;
        this.color2 = color2;
        this.flashlightWidth = flashlightWidth;
        this.centerDegree = centerDegree;
        this.degreeOfRotation = 3;
        this.stepOfMovement = 1.5;
        this.directionFacing = (((this.centerDegree % 360) - 90) * Math.PI / 180);
        this.flashlightAngle = ((this.flashlightWidth) * Math.PI / 180);
        this.grad = c.createRadialGradient(this.x, this.y, radius / 5, this.x, this.y, radius);
        this.grad.addColorStop(0, color);
        this.grad.addColorStop(1, color2);
        this.startAngle = this.directionFacing - (this.flashlightAngle / 2);
        this.endAngle = this.directionFacing + (this.flashlightAngle / 2);

        this.drawPlayer = () => {
            const sprite = document.getElementById('sprite');
            c.drawImage(sprite, 0, 0, 305, 231, this.x, this.y, 60, 46);
        }
        this.drawFlashlight = (radius) => {
            c.beginPath(this.x, this.y);
            c.arc(this.x, this.y, radius, this.startAngle, this.endAngle, false);
            c.lineTo(this.x, this.y);
            c.fillStyle = this.grad;
            c.fill();
        };
        this.createGradient = (inputRadius) => {
            this.grad = c.createRadialGradient(this.x, this.y, inputRadius / 5, this.x, this.y, inputRadius);
            this.grad.addColorStop(0, this.color);
            this.grad.addColorStop(1, this.color2);
        };
        this.movePlayer = () => {
            if (38 in keysDown || 87 in keysDown) { // === UP
                if (this.y > 0) {
                    this.y -= this.stepOfMovement;
                }
            }
            if (40 in keysDown || 83 in keysDown) { // === DOWN
                if (this.y < innerHeight) {
                    this.y += this.stepOfMovement;
                }
            }
            if (37 in keysDown || 65 in keysDown) { // === LEFT
                if (this.x > 0) {
                    this.x -= this.stepOfMovement;
                }
            }
            if (39 in keysDown || 68 in keysDown) { // === RIGHT
                if (this.x < innerWidth) {
                    this.x += this.stepOfMovement;
                }
            }
        };
        this.moveFlashlight = () => {
            let theta = getTheta(mouse.x, mouse.y, this.x, this.y);
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
        this.improveFlashlight = () => {
            if (49 in keysDown) { // === 1
                this.currentRadius = this.radius * 2;
                console.log(this.currentRadius);
                this.createGradient(this.currentRadius);
                this.drawFlashlight(this.currentRadius);
            }
            else if (50 in keysDown) { // === 2
                this.currentRadius = this.radius;
                this.createGradient(this.currentRadius);
            }
        };
        this.update = () => {
            this.drawPlayer();
            this.movePlayer();
            this.moveFlashlight();
            this.improveFlashlight();
            this.createGradient(this.currentRadius);
            this.drawFlashlight(this.currentRadius);
        };
    }
}