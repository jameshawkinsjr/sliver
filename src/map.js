function Map(inputMap){
        this.map = inputMap;
        this.rowWidth = 100;
        this.rowHeight = 100;
        this.width = inputMap.length * this.rowWidth;
        this.height = inputMap.length * this.rowHeight;
        
        this.floor = null;
        this.wall = null;
    }
    
    // generate an example of a large map
    Map.prototype.generate = function(){
        let context = document.createElement("canvas").getContext("2d");		
        context.canvas.width = this.width;
        context.canvas.height = this.height;		
        
        let color = "#000000";
        context.save();
        for (let x = 0, i = 0; i < this.map.length; x+=this.rowWidth, i++) {
            for (let y = 0, j=0; j < this.map.length; y+=this.rowHeight, j++) {            
                if (this.map[j][i] === 1) {
                    context.beginPath();			
                    context.rect(x, y, this.rowWidth, this.rowHeight);
                    context.fillStyle = color;
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
    
    // draw the map adjusted to camera
    Map.prototype.draw = function(context, xView, yView){					
        // easiest way: draw the entire map changing only the destination coordinate in canvas
        // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
        //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
        
        // didactic way:
        
        let sx, sy, dx, dy;
        let sWidth, sHeight, dWidth, dHeight;
        
        // offset point to crop the image
        sx = xView;
        sy = yView;
        
        // dimensions of cropped image			
        sWidth =  canvasWidth;
        sHeight = canvasHeight;

        // if cropped image is smaller than canvas we need to change the source dimensions
        if(this.image.width - sx < sWidth){
            sWidth = this.image.width - sx;
        }
        if(this.image.height - sy < sHeight){
            sHeight = this.image.height - sy; 
        }
        
        // location on canvas to draw the croped image
        dx = 0;
        dy = 0;
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;									
        
        context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);			
};

module.exports = Map;