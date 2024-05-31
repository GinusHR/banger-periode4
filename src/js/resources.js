import { ImageSource, Sound, Resource, Loader, ImageWrapping, FontSource } from 'excalibur'


// voeg hier jouw eigen resources toe
const Resources = {
    Knight: new ImageSource('./images/ridder1.png'),
    Goblin: new ImageSource('./images/goblin1.png'),
    Background : new ImageSource('./images/bg1.png'),
    Dance1 : new ImageSource('./images/ridder-dance.png'),
    Dance2 : new ImageSource('./images/goblin-dance.png'),
    Slimewalk : new ImageSource('./images/slime-walk.png'),
    Slime : new ImageSource('./images/slime.png'),
    Start : new ImageSource('./images/startscreen.jpg'),
    Spear : new ImageSource('./images/spear.png'),
    Apple : new ImageSource('./images/apple-sheet.png'),
    Death : new ImageSource('./images/deathscreen.jpg'),
    Tutorial : new ImageSource('./images/tutorialscreen.jpg')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }