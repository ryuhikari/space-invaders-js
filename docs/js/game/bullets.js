/*
 * Function Bullet: bullet object constructor.
 *
 * Inputs:
 * 	x: initial horizontal position.
 * 	y: initial vertical position.
 */
function Bullet(x, y){
	this.x = x;
	this.y = y;
	this.r = 2;
	this.color = "#00FFF0";
	this.hit = false;
	this.speed = 4;
	this.dead = false;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	this.alienHit = function(ufo){
		var nextPosition = this.y + this.r + this.speed;
		if(this.x >= ufo.x*scale && this.x <= ufo.x*scale + ufo.width*scale){
			if(nextPosition >= ufo.y*scale && nextPosition <= ufo.y*scale + ufo.height*scale){
				this.hit = true;
			}
		}
		return this.hit;
	}

	this.move = function(){
		this.y -= this.speed;
	}

	this.kill = function(){
		this.dead = true;
	}
}

/**
 * Function shoot: create the bullets.
 */
function shoot(){
    for(var i = 0; i < bullets.length; i++){
        bullets[i].draw();
        bullets[i].move();
        for(var j = 0; j < enemies.length; j++){
            if(bullets[i].alienHit(enemies[j])){
                enemies[j].kill();
                bullets[i].kill();
                break;
            }
        }
    }
    for(var k = bullets.length - 1; k>=0; k--){
        if(bullets[k].dead){
            bullets.splice(k, 1);
        }
    }
}