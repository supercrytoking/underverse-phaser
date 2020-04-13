export class DigitalGamepad {
    constructor(scene) {
        this.scene = scene;
        this.buttonPadding = 40;
        this.buttonMargin = 80;
        this.buttonSize = 80;

        if (scene.game.renderer.width <= 600) {
            this.buttonPadding = 40;
            this.buttonMargin = 40;
            this.buttonSize = 40;
        }
    }

    load() {
        this.aButton = this.scene.add.sprite(this.scene.game.renderer.width - this.buttonPadding - this.buttonMargin, this.scene.game.renderer.height - this.buttonPadding, 'GAMEPAD_A').setDepth(4).setOrigin(1, 1);
        this.aButton.setDisplaySize(this.buttonSize, this.buttonSize);
        this.aButton.setScrollFactor(0);
        this.aButton.setInteractive();

        this.bButton = this.scene.add.sprite(this.scene.game.renderer.width - this.buttonPadding, this.scene.game.renderer.height - this.buttonPadding - this.buttonMargin, 'GAMEPAD_B').setDepth(4).setOrigin(1, 1);
        this.bButton.setDisplaySize(this.buttonSize, this.buttonSize);
        this.bButton.setScrollFactor(0);
        this.bButton.setInteractive();
    }
    
    get size() {
        return this.buttonSize;
    }

    set size(x) {
        this.buttonSize = x;
    }
}