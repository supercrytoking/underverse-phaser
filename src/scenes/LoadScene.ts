import { CST } from '../CST';

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CST.SCENES.LOAD'
        });
    }

    loadImages() {
        this.load.setPath(`./assets/img`)
        for (var i in CST.IMAGES) {
            // console.log(`${i}, ${CST.IMAGES[i]}`);
            this.load.image(i, CST.IMAGES[i]);
        }
    }

    loadAudio() {
        this.load.setPath(`./assets/audio`);
        for (var i in CST.AUDIO) {
            // console.log(`${i}, ${CST.AUDIO[i]}`);
            this.load.audio(i, CST.AUDIO[i]);
        }
    }

    loadSprites() {
        this.load.setPath(`./assets/sprites`);
        this.load.atlas('PLAYER_SPRITEZ' 'player-sprites.png', 'player-sprites.json');
    }

    preload() {
        console.log('Loading...');
        this.loadImages();
        this.loadAudio();
        this.loadSprites();

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x700000
            }
        });

        this.load.on('progress', (percentage) => {
            loadingBar.fillRect(0, this.game.renderer.height - 20, this.game.renderer.width * percentage, 20)
        });

        this.load.on('complete', () => {
            this.scene.start(CST.SCENES.MENU);
            // this.scene.start(CST.SCENES.GAME);
        });

        this.load.on('load', (file: Phaser.Loader.File) => {
            console.log(`Loaded ${file.key}.`);
        });
    }
}