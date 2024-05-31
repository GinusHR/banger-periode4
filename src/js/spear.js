import { Actor, CollisionType, Sprite, Vector } from "excalibur";
import { Enemy } from "./enemy";
import { Resources } from "./resources";

export class Spear extends Actor {
    constructor(pos, vel, direction, arena) {
        super({
            height: 20,
            width: 50,
            name: 'spear',
            collisionType: CollisionType.Passive
        })
        this.pos = pos
        this.vel = new Vector(vel.x, vel.y)
        this.arena = arena
        this.graphics.add(Resources.Spear.toSprite());
        if (direction.x > 0) {
            this.rotation = 0;
        } else if (direction.x < 0) {
            this.rotation = Math.PI; 
        } else if (direction.y > 0) {
            this.rotation = Math.PI / 2; 
        } else if (direction.y < 0) {
            this.rotation = -Math.PI / 2; 
        }
    }

    onInitialize(engine) {
        this.on('collisionstart', (event, engine) => this.hitSomething(event, engine));
        

    }

    hitSomething(event,arena) {
        if (event.other instanceof Enemy) {
            event.other.kill();
            this.kill(); 
            this.arena.updateScore();
          
                      
        }
    }

    

    onPostUpdate(engine, delta) {

        if (this.pos.x > engine.drawWidth || this.pos.x < 0) {
            this.kill();
            
        }
    }

}