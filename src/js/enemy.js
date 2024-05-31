import { Actor, Animation, CollisionType, Color, Keys, SpriteSheet, Vector, range } from "excalibur";
import { Resources } from "./resources";
import { Knight } from "./knight";
import { Goblin } from "./goblin";

export class Enemy extends Actor {
    constructor() {
        super({ width: Resources.Slime.width / 2, height: Resources.Slime.height / 2 })
        const walkSheet = SpriteSheet.fromImageSource({
            image: Resources.Slimewalk,
            grid: { rows: 1, columns: 11, spriteWidth: 58, spriteHeight: 51 }
        })
        const idle = walkSheet.sprites[0]
        const walk = Animation.fromSpriteSheet(walkSheet, range(0, 9), 50)
        this.graphics.add("idle", idle)
        this.graphics.add("walk", walk)
        var left = walk.clone();
        left.flipHorizontal = true;
        this.graphics.add("walkLeft", left)
        this.graphics.use('idle')
        walk.tint = new Color(Math.random() * 0, Math.random() * 255, Math.random() * 255);
        idle.tint = walk.tint;
        left.tint = walk.tint;

    }

    onInitialize() {
        this.pos = new Vector(Math.random() * 1200, Math.random() * 700)
        this.walkFunction();
        this.body.collisionType = CollisionType.Active;
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on("exitviewport", (event) => this.walkFlip())
    }

    hitSomething(event) {
        if (event.other instanceof Actor) {
            console.log('yikes')
           
            // if (this.vel.x > 0) {
            //     this.graphics.use('walkLeft');
            // } else {
            //     this.graphics.use('walk');
            // }
        }
        
           
       
    }

    onPostUpdate() {
        if(this.vel.x === 0) {
            this.vel = new Vector(Math.random() * 100 - 50, Math.random() * 10  -5)
            if ( this.vel.x > 0) {
                this.graphics.use('walkLeft');
            } else {
                this.graphics.use('walk');
            }
        }
    }


    walkFunction() {
        this.vel = new Vector(Math.random() * 100 - 50, Math.random() * 10  -5)
        this.graphics.use('walk')
        if ( this.vel.x > 0) {
            this.graphics.use('walkLeft');
        }
    }


    walkFlip() {
        if (this.pos.x <= 0 || this.pos.x >= 1200) {
            this.vel.x = -this.vel.x;
            if (this.vel.x > 0) {
                this.graphics.use('walkLeft');
            } else {
                this.graphics.use('walk');
            }
        }

        if (this.pos.y <= 0 || this.pos.y >= 700) {
            this.vel.y = -this.vel.y; 
        }
    }

}