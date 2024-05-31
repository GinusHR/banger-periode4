import { Scene, Label, Vector, Font, FontUnit, Color, Sprite } from "excalibur";
import { Resources } from "./resources";
import { DeathScreen } from "./deathbacground";

export class Death extends Scene {
   constructor(score) {
    super()
    this.score = score
    
   }
   
    onInitialize(engine) {
        let background = new DeathScreen;
        this.add(background);
        
        const deathLabel = new Label({
            text: "Game Over",
            pos: new Vector(engine.drawWidth / 3, engine.drawHeight / 4),
            font: new Font({
                family: 'impact',
                size: 60,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        deathLabel.anchor.setTo(0.5, 0.5);
        this.add(deathLabel);

        
       
    }

   
}