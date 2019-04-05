var Sprite = require('./sprite');

function Map(inputMap, color){
        this.map = [].concat(inputMap);
        this.rowWidth = 120;
        this.rowHeight = 120;
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
                        context.save();
                        // let battery = new Image();
                        // battery.src = './images/battery.png';
                        let battery = document.getElementById("battery");
                        context.drawImage(battery, 0, 0, 120, 120, (i * 120), (j * 120), 120, 120);
                        context.restore();
                    } else if (this.map[j][i] === 'l') {
                        context.save();
                        // let lantern = new Image();
                        // lantern.src = './images/lantern.png';
                        let lantern = document.getElementById("lantern");
                        context.drawImage(lantern, 0, 0, 120, 120, (i * 120), (j * 120), 120, 120);
                        context.restore();
                    } else if (this.map[j][i] === 'k') {
                        context.save();
                        // let key = new Image();
                        // key.src = './images/key.png';
                        let key = document.getElementById("key");
                        context.drawImage(key, 0, 0, 120, 120, (i * 120), (j * 120), 120, 120);
                        context.restore();
                    } else if (this.map[j][i] === 'e' || this.map[j][i] === 'p' ) {
                        context.save();
                        // let portal = new Image();
                        // portal.src = './images/portal.png';
                        let portal = document.getElementById("portal");
                        context.drawImage(portal, 0, 0, 120, 120, (i * 120), (j * 120), 120, 120);
                        context.restore();
                    } else {
                        context.save();
                        // let battery = new Image();
                        // battery.src = './images/battery.png';
                        let floor = document.getElementById("floor");
                        context.drawImage(floor, 0, 0, 60, 60, (i * 120), (j * 120), 60, 60);
                        context.drawImage(floor, 0, 0, 60, 60, (i * 120), (j * 120+60), 60, 60);
                        context.drawImage(floor, 0, 0, 60, 60, (i * 120+60), (j * 120), 60, 60);
                        context.drawImage(floor, 0, 0, 60, 60, (i * 120+60), (j * 120+60), 60, 60);
                        context.restore();
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