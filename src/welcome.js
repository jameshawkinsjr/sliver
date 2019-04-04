function Welcome(context) {

    Welcome.prototype.winner = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="45px Arima Madurai";
        context.fillStyle = "white";
        context.fillText(`you won!`, 200, canvasHeight/2 + 50);
    }
    Welcome.prototype.loser = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="45px Arima Madurai";
        context.fillStyle = "white";
        context.fillText(`you got eaten by a zombie!`, 0, canvasHeight/2 + 50);
    }
    Welcome.prototype.welcome = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="30px Arima Madurai";
        context.fillStyle = "#b7b7b7";
        context.fillText(`this is sliver.`, 0, 200);
        context.fillText(`find the key.`, 0, 250);
        context.fillText(`find the way out.`, 0, 300);
    }

    Welcome.prototype.batteries = () => {
        context.fillText(`don't run out of batteries.`, 0, 350);
    }
    Welcome.prototype.zombies = () => {
        context.fillText(`don't let the zombies catch you.`, 0, 400);
    }
    Welcome.prototype.controls = () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font="45px Arima Madurai";
        context.fillStyle = "#b7b7b7";
        context.fillText(`controls`, canvasWidth/2-80, 100);
        context.font="30px Arima Madurai";
        context.fillText(`up (w)`, canvasWidth/2-45, 200);
        context.fillText(`left (a) / down (s) / right (d)`, canvasWidth/2-180, 250);
        context.fillText(`look around (mouse)`, canvasWidth/2-130, 350);
        context.fillText(`sprint (space)`, canvasWidth/2-80, 400);
        context.fillText(`items (numbers 1-9)`, canvasWidth/2-130, 500);
    }

    Welcome.prototype.draw = () => {
        this.welcome();
        setTimeout(this.batteries, 3000);
        setTimeout(this.zombies, 5000);
        setTimeout(this.controls, 8000);
    }
}
module.exports = Welcome;