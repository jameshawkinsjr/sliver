var Sprite = require('./sprite');

function Map(inputMap, color){
        this.map = inputMap;
        this.rowWidth = 100;
        this.rowHeight = 100;
        this.width = inputMap[0].length * this.rowWidth;
        this.height = inputMap.length * this.rowHeight;
        this.color = color;
        this.blankSpots = [];
    
    Map.prototype.generate = () => {
        let context = document.createElement("canvas").getContext("2d");		
        context.canvas.width = this.width;
        context.canvas.height = this.height;
        
        let color = this.color;
        context.save();
        for (let x = 0, i = 0; i < this.map[0].length; x+=this.rowWidth, i++) {
            for (let y = 0, j=0; j < this.map.length; y+=this.rowHeight, j++) {            
                if (this.map[j][i] === 1) {
                    context.beginPath();			
                    context.rect(x, y, this.rowWidth, this.rowHeight);
                    context.fillStyle = color;
                    context.fill();
                    context.closePath();
                } else if (this.map[j][i] === 2) {
                    context.beginPath();			
                    context.rect(x, y, this.rowWidth, this.rowHeight);
                    context.fillStyle = "#333838";
                    context.fill();
                    context.closePath();
                } else if (this.map[j][i] === 'b') {
                    let battery = document.getElementById('battery');
                    context.save();
                    context.drawImage(battery, 0, 0, 30, 30, (i * 100 + 35), (j * 100 + 35), 30, 30);
                    context.restore();
                } else if (this.map[j][i] === 'l') {
                    let lantern = document.getElementById('lantern');
                    context.save();
                    context.drawImage(lantern, 0, 0, 46, 43, (i * 100 + 35), (j * 100 + 30), 46, 43);
                    context.restore();
                } else if (this.map[j][i] === 'k') {
                    let key = document.getElementById('key');
                    context.save();
                    context.drawImage(key, 0, 0, 40, 48, (i * 100 + 35), (j * 100 + 30), 40, 48);
                    context.restore();
                } else if (this.map[j][i] === 'e' || this.map[j][i] === 'p' ) {
                    let portal = document.getElementById('portal');
                    context.save();
                    context.drawImage(portal, 0, 0, 50, 50, (i * 100 + 35), (j * 100 + 30), 50, 50);
                    context.restore();
                } else {
                    this.blankSpots.push([x,y]);
                }
            }
        }		
        context.restore();	
        this.image = new Image();
        this.image.src = context.canvas.toDataURL("image/png");
        context = null;
    };
    
};

module.exports = Map;