export class MenuScene extends Phaser.Scene {
    bg: any;
    constructor() {
        super({
            key: 'MENU_SCENE'
        });
    }
    preload() {}
    create() {
        var music = this.sound.play('MENU_MUSIC', {
            loop: true
        });

        this.bg = this.add.image(0, 0, 'MENU_BG').setOrigin(0);
        this.bg.alpha = 0.3;
        this.bg.displayWidth = this.game.renderer.width;
        this.bg.displayHeight = this.game.renderer.height;

        var logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'LOGO')
            .setInteractive();

        logo.on('pointerdown', () => {
            this.scene.start('GAME_SCENE');
            this.sound.stopAll();
        });

        // let loginButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 20, 'LOGIN_BTN').setOrigin(0.5, 1);
        // loginButton.setInteractive();
        // loginButton.on('pointerdown', () => {
        //     this.scene.start(CST.SCENES.GAME);
        //     this.sound.stopAll();
        // });

        // let registerButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 60, 'REGISTER_BTN').setOrigin(0.5, 1);
        // registerButton.setInteractive();
        // registerButton.on('pointerdown', () => {
        //     this.scene.start(CST.SCENES.GAME);
        //     this.sound.stopAll();
        // });
    }
}