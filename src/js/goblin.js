import { Actor, Animation, CollisionType, Engine, Keys, SpriteSheet, Timer, Vector, VectorView, range } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { Spear } from "./spear";
import { Apple } from "./apple";



export class Goblin extends Actor {

    constructor(engine) {

        super({
            
            width: Resources.Goblin.width / 1.3,
            height: Resources.Goblin.height
        })
        console.log('Goblin time')
        const danceSheet = SpriteSheet.fromImageSource({
            image: Resources.Dance2,
            grid: { rows: 1, columns: 10, spriteWidth: 56.3, spriteHeight: 58 }
        })
        const idle = danceSheet.sprites[0];
        const dance = Animation.fromSpriteSheet(danceSheet, range(0, 7), 100);
        const run = Animation.fromSpriteSheet(danceSheet, range(8, 9), 100);


        this.graphics.add("idle", idle);
        this.graphics.add("dance2", dance);
        this.graphics.add("runRight", run);

        const left = run.clone();
        left.flipHorizontal = true;
        this.graphics.add("runLeft", left);

        this.graphics.use('idle');
        this.pos = new Vector(600, 400);
        this.health = 3;
        this.lastDirection = new Vector(1, 0);
    }

    onInitialize(engine) {

        this.on('collisionstart', (event) => this.hitSomething(event));
        this.body.collisionType = CollisionType.Active;
    }

    hitSomething(event) {
        if (event.other instanceof Enemy) {
            this.health -= 1;

            if (this.health <= 0) {
                console.log('Game Over');
                this.kill();

            } else {
                console.log('Health remaining: ' + this.health);
            }
        }

        if (event.other instanceof Apple) {
            event.other.kill();
            this.health += 1;
            console.log('Health remaining: ' + this.health);
        }
    }


    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -200;
            this.graphics.use('runLeft');
            this.lastDirection = new Vector(-1, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 200;
            this.graphics.use('runRight');
            this.lastDirection = new Vector(1, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -200;
            this.lastDirection = new Vector(0, -1);
        }
        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 200;
            this.lastDirection = new Vector(0, 1);
        }
        if (engine.input.keyboard.isHeld(Keys.Right) && engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = 0;
        }
        if (engine.input.keyboard.isHeld(Keys.Up) && engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 0;
        }
        this.vel = new Vector(xspeed, yspeed);

        if (engine.input.keyboard.isHeld(Keys.ShiftRight)) {
            this.throwWeapon(engine);

        }

    }
    throwWeapon(engine) {
        const spearVelocity = this.lastDirection.scale(300);
        const spear = new Spear(this.pos.clone(), spearVelocity, this.lastDirection, engine.currentScene);
        engine.add(spear);

    }
}