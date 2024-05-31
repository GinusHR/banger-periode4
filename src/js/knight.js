import { Actor, Animation, CollisionType, Keys, SpriteSheet, Vector, range } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { Spear } from "./spear";
import { Apple } from "./apple";
import { vector } from "excalibur/build/dist/Util/DrawUtil";


export class Knight extends Actor {

    constructor() {

        super({ 
           
            width: Resources.Knight.width / 1.3,
            height: Resources.Knight.height
         })
        console.log('Knight Knight')
        const danceSheet = SpriteSheet.fromImageSource({
            image: Resources.Dance1,
            grid: { rows: 1, columns: 10, spriteWidth: 55.9, spriteHeight: 58 }
        })
        const idle = danceSheet.sprites[0] // geen animatie
        const dance = Animation.fromSpriteSheet(danceSheet, range(0, 7), 100)
        const run = Animation.fromSpriteSheet(danceSheet, range(8, 9), 100)


        this.graphics.add("idle", idle)
        this.graphics.add("dance1", dance)
        this.graphics.add("runRight", run)
        var left = run.clone();
        left.flipHorizontal = true;
        this.graphics.add("runLeft", left)
        this.graphics.use('idle');
        this.pos = new Vector(600, 300);

        this.health = 4;
        this.lastDirection = new Vector(1, 0);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.body.collisionType = CollisionType.Active;
        this.lives = 4
    }

    hitSomething(event) {
        if (event.other instanceof Enemy) {
            console.log('hit enemy')
            this.health -= 1;

            if (this.health <= 0) {
                console.log('Game Over');
                this.kill();

            } else {
                console.log('Health remaining: ' + this.health);
            }
        }
        if(event.other instanceof Apple) {
            event.other.kill();
            this.health += 1
            console.log('Health remaining: ' + this.health);
        }

    }



    onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0
        let sprite = this.graphics.current;
        if (engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -150
            this.graphics.use('runLeft');
            this.lastDirection = new Vector(-1, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 150
            this.graphics.use('runRight');
            this.lastDirection = new Vector(1, 0);

        }
        if (engine.input.keyboard.isHeld(Keys.W)) {
            yspeed = -150
            this.lastDirection = new Vector(0, -1);
        }
        if (engine.input.keyboard.isHeld(Keys.S)) {
            yspeed = 150
            this.lastDirection = new Vector(0, 1);
        }

        if (engine.input.keyboard.isHeld(Keys.D) && engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = 0
        }
        if (engine.input.keyboard.isHeld(Keys.W) && engine.input.keyboard.isHeld(Keys.S)) {
            yspeed = 0
        }
        this.vel = new Vector(xspeed, yspeed)
        if (engine.input.keyboard.isHeld(Keys.F)) {
            this.throwWeapon(engine)
        }

    }
    throwWeapon(engine) {
        const spearVelocity = this.lastDirection.scale(300)
        const spear = new Spear(this.pos.clone(), spearVelocity, this.lastDirection, engine.currentScene);
        engine.add(spear);
    }
}