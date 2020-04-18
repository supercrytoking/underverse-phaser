import Pack from '../pack.json'
import AuthenticationModal from '../Components/AuthenticationModal/AuthenticationModal'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LOAD_SCENE'
        });
    }

    preload() {
        this.add.reactDom(AuthenticationModal, this)

        this.load.pack('images', Pack);
        this.load.tilemapTiledJSON('map', './assets/maps/underverse.json')
        
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x700000
            }
        });
        
        this.load.on('progress', (percentage: number) => {
            loadingBar.fillRect(0, 0, this.game.renderer.width * percentage, this.game.renderer.height)
        });

        // this.load.on('load', (file: Phaser.Loader.File) => {
        //     console.log(`Loaded ${file.key}.`);
        // });
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

        var startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'BUTTON_START')
        startButton.setInteractive()
        startButton.on('pointerdown', () => {
            this.scene.start('MENU_SCENE')
        })

        // this.scene.start('GAME_SCENE');
    }
}