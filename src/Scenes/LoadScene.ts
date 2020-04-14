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

        this.load.tilemapTiledJSON('map', './assets/maps/underverse.json');
        this.load.image('UNDERVERSE_TILESET', './assets/maps/underverse-tileset.png')
        this.load.image('WATER_TILESET', './assets/maps/water-tileset.png');

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

        this.load.on('load', (file: Phaser.Loader.File) => {
            console.log(`Loaded ${file.key}.`);
        });
    }

    create() {
        this.anims.create({
            key: 'ANIMATED_TREE',
            frameRate: 10,
            frames: this.anims.generateFrameNames('TREE_SPRITE', {
                prefix: 'frame_',
                start: 1,
                end: 13,
                suffix: '.gif',
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_NORTH',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [1, 2, 3, 4, 5, 6, 7, 8]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_SOUTH',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [22, 23, 24, 25, 26, 27, 28, 29]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_EAST',
            frameRate: 20,
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_WEST',
            frameRate: 20,
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'BETSY_ANIMATION',
            frameRate: 3,
            frames: this.anims.generateFrameNames('SCHOOLGIRLS_SPRITE', {
                prefix: 'betsy-',
                start: 0,
                end: 2,
                suffix: '.png'
            }),
            repeat: -1
        });

        this.scene.start(CST.SCENES.MENU);
    }
}