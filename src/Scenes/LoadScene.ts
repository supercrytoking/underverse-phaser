import Pack from '../pack.json'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LOAD_SCENE'
        });
    }

    preload() {
        this.load.pack('images', Pack);

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
            this.scene.start('MENU_SCENE');
            // this.scene.start('GAME_SCENE');
        });

        this.load.on('load', (file: Phaser.Loader.File) => {
            console.log(`Loaded ${file.key}.`);
        });
    }
}