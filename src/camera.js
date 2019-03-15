
function Rectangle(left, top, width, height){
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    
    Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height;
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    };
    
    Rectangle.prototype.within = function(r) {
        return (r.left <= this.left && 
                r.right >= this.right &&
                r.top <= this.top && 
                r.bottom >= this.bottom);
    };		
    
    Rectangle.prototype.overlaps = function(r) {
        return (this.left < r.right && 
                r.left < this.right && 
                this.top < r.bottom &&
                r.top < this.bottom);
    };

}
function Camera(map) {

    this.x = 0;
    this.y = 0;
    this.xMovement = 0;
    this.yMovement = 0;

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    this.followed = null;

    this.viewportRect = new Rectangle(this.x, this.y, canvasWidth, canvasHeight);				
    this.worldRect = new Rectangle(0, 0, map.width, map.height);
    
    Camera.prototype.follow = function(player, xDeadZone, yDeadZone)
		{		
			this.followed = player;	
			this.xDeadZone = xDeadZone;
			this.yDeadZone = yDeadZone;
		}					
		
		Camera.prototype.update = function() {
			if(this.followed != null) {		
                this.x = this.followed.x;
                this.y = this.followed.y;
                // if(this.followed.x - this.x  + this.xDeadZone > canvasWidth) {
                //     this.x = this.followed.x - (canvasWidth - this.xDeadZone);
                // } else if (this.followed.x  - this.xDeadZone < this.x) {
                //     this.x = this.followed.x  - this.xDeadZone;
                // }
                // if(this.followed.y - this.y + this.yDeadZone > canvasHeight) {
                //     this.y = this.followed.y - (canvasHeight - this.yDeadZone);
                // } else if(this.followed.y - this.yDeadZone < this.y) {
                //     this.y = this.followed.y - this.yDeadZone;
                // }
                console.log(this.x, this.y);
            }
			
			// update viewportRect
			this.viewportRect.set(this.x, this.y);
			
			// don't let camera leaves the world's boundary
			// if(!this.viewportRect.within(this.worldRect))
			// {
			// 	if(this.viewportRect.left < this.worldRect.left)
			// 		this.x = this.worldRect.left;
			// 	if(this.viewportRect.top < this.worldRect.top)					
			// 		this.y = this.worldRect.top;
			// 	if(this.viewportRect.right > this.worldRect.right)
			// 		this.x = this.worldRect.right - canvasWidth;
			// 	if(this.viewportRect.bottom > this.worldRect.bottom)					
			// 		this.y = this.worldRect.bottom - canvasHeight;
			// }
			
		}	
    
}

module.exports = Camera;