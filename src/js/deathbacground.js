import { Actor, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class DeathScreen extends Actor {
    onInitialize(engine) {
        let sprite = new Sprite({
            image: Resources.Death,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        })
        this.anchor = Vector.Zero;
        this.graphics.use(sprite)
    }
}
