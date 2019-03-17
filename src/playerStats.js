function PlayerStats(){
    
    let canvas2 = document.getElementById("battery-level");
    let context2 = canvas2.getContext("2d");

    PlayerStats.prototype.draw = () => {
        context2.save();
        context2.beginPath();			
        context2.rect(0,0, 50, 50);
        context2.fillStyle = "#ffffff";
        context2.fill();
        context2.closePath();
        context2.restore();
    }

}