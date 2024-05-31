import { Vector, Timer, Scene, Label, Font, FontUnit, Color } from "excalibur"
import { Background } from './background.js'
import { Knight } from './knight.js'
import { Goblin } from './goblin.js'
import { Enemy } from './enemy.js'
import { Apple } from "./apple.js"

export class Arena extends Scene {

    score = 0;
    mylabel;
    knight;
    goblin;

    onInitialize(engine) {
        let background = new Background;
        this.add(background);

        this.knight = new Knight;
        this.add(this.knight);

        this.goblin = new Goblin;
        this.add(this.goblin);



        this.timer = new Timer({
            fcn: () => this.spawn(),
            interval: 1500,
            repeats: true
        })

        this.add(this.timer)
        this.timer.start()

        this.timer2 = new Timer({
            fcn: () => this.spawnApple(),
            interval: 9000,
            repeats: true
        })

        this.add(this.timer2)
        this.timer2.start()

        this.score = 0
        this.mylabel = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(100, 100),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.add(this.mylabel);

        this.knight.on('kill', () => this.checkGameOver(engine));
        this.goblin.on('kill', () => this.checkGameOver(engine));


    }
    updateScore() {
        this.score++
        this.mylabel.text = `Score: ${this.score}`
    }
    spawnApple() {
        this.add(new Apple())
    }
    spawn() {
        this.add(new Enemy())
    }

    checkGameOver(engine) {
        if (this.knight.isKilled() && this.goblin.isKilled()) {
           engine.goToScene("death");
        }

    }
}
