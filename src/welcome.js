function Welcome() {

    const generate = () => {

        let canvas2 = document.getElementById("battery-level");
        let context2 = canvas2.getContext("2d");	
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.font="15px Arial";
        context2.fillStyle = "white";
        // context2.textAlign = "left";
        context2.fillText(`Sprint: ${this.jumpPower}`, 0, 50);
        context2.fillText(`Battery: ${Math.floor(this.batteryPower)}`, 0, 100);
        context2.fillText(`KEY | ITEM`, 200, 50);
        context2.fillText(`${this.startItems}`, 200, 100);
        context2.fillText(`${this.items}`, 200, 150);
    }
}
module.exports = Welcome;