import { Keys, Scene, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";
import { Startscreen } from "./startbackground";

export class Start extends Scene {
    onInitialize(engine) {
       let start = new Startscreen
       this.add(start)
    }

    onActivate() {
        console.log('activate')
    }

    onPreUpdate(engine) {
        if(engine.input.keyboard.isHeld(Keys.Enter)) {
            this.engine.goToScene('tutorial');
        }
    }
}