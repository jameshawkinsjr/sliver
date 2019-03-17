var Sprite = require('./sprite');

function Map(inputMap){
        this.map = inputMap;
        this.rowWidth = 100;
        this.rowHeight = 100;
        this.width = inputMap[0].length * this.rowWidth;
        this.height = inputMap.length * this.rowHeight;
    
    Map.prototype.generate = () => {
        let context = document.createElement("canvas").getContext("2d");		
        context.canvas.width = this.width;
        context.canvas.height = this.height;
        
        let color = '#000000';
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
                }
            }
        }		
        context.restore();	
        this.image = new Image();
        this.image.src = context.canvas.toDataURL("image/png");
        context = null;
    }
};

module.exports = Map;