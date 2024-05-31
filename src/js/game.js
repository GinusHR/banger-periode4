import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, BoundingBox, Timer, FadeInOut, Color, Label, Font, FontUnit } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Arena } from './arena.js'
import { Start } from './start.js'
import { Death } from './death.js'
import { Tutorial } from './turorial.js'


export class Game extends Engine {
    // score
    // mylabel

    constructor() {
        super({
            width: 1200,
            height: 700,
            maxFps: 30,
            // displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        let transitions = {
            in: new FadeInOut({ duration: 400, direction: 'in', color: Color.Black }),
            out: new FadeInOut({ duration: 400, direction: 'out', color: Color.Black })
        }
        this.add('start', { scene: new Start(), transitions })
        this.add('tutorial',{ scene : new Tutorial(), transitions})
        this.add('arena', { scene: new Arena(), transitions })
        this.add('death', { scene: new Death(), transitions })


        this.goToScene('start')


    }

}

new Game()
