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
        this.load.atlas('PLAYER_SPRITE', 'player-animated-sprites.png', 'player-animated-sprites.json');
        this.load.atlas('TREE_SPRITE', 'animated-tree.png', 'animated-tree.json');
        this.load.atlas('SCHOOLGIRLS_SPRITE', 'schoolgirls-sprite.png', 'schoolgirls-sprite.json');
    }

    loadFonts() {
        this.load.setPath(`./assets/fonts`);
        this.load.bitmapFont('FONT_PRIMARY', 'game-over.png', 'game-over.fnt');
        // this.load.bitmapFont('FONT_PRIMARY', 'vcr-osd-mono.png', 'vcr-osd-mono.fnt');
    }

    preload() {
        console.log('Loading...');

        this.loadImages();
        this.loadAudio();
        this.loadSprites();
        this.loadFonts();

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x700000
            }
        });

        this.load.on('progress', (percentage: number) => {
            loadingBar.fillRect(0, 0, this.game.renderer.width * percentage, this.game.renderer.height)
        });

        this.load.on('complete', () => {
            // this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 100, 100, 0xFF0000);
            this.scene.start(CST.SCENES.MENU);
            // this.scene.start(CST.SCENES.GAME);
        });

        this.load.on('load', (file: Phaser.Loader.File) => {
            console.log(`Loaded ${file.key}.`);
        });
    }
}