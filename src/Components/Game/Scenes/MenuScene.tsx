export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MENU_SCENE'
        });
    }
    
    preload() {

    }
    
    create() {
        this.sound.play('MENU_MUSIC', {
            loop: true
        })

        var background = this.add.image(0, 0, 'MENU_BG').setOrigin(0);
        background.alpha = 0.3;
        background.displayWidth = this.game.renderer.width;
        background.displayHeight = this.game.renderer.height;

        var logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'LOGO')
            .setInteractive();

        logo.on('pointerdown', () => {
            this.scene.start('GAME_SCENE');
            this.sound.stopAll();
        });
    }
}