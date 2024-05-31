import { Keys, Scene, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";
import { Startscreen } from "./startbackground";
import { TutorialScreen } from "./tutorialscreen";

export class Tutorial extends Scene {
    onInitialize(engine) {
       let start = new TutorialScreen
       this.add(start)
    }

    onPreUpdate(engine) {
        if(engine.input.keyboard.isHeld(Keys.Enter)) {
            this.engine.goToScene('arena');
        }
    }

}