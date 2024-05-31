import { Actor, Animation, SpriteSheet, Vector, range } from "excalibur";
import { Resources } from "./resources";

export class Apple extends Actor {
    constructor() {
        super({
            width: Resources.Apple.width / 4,
            height: Resources.Apple.height
        })
        const spinSheet = SpriteSheet.fromImageSource ({
            image: Resources.Apple,
            grid: {rows: 1, columns: 4, spriteWidth: 40, spriteHeight: 40}
        })
        const spin = Animation.fromSpriteSheet(spinSheet, range(0,3), 40 )
        this.graphics.add('spin', spin)
    }

    onInitialize() {
        this.graphics.use('spin');
        this.pos = new Vector(Math.random() *1150, Math.random() * 650)
    }
} 