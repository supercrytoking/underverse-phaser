exports.addSpeechModal = (scene, string) => {
    if (scene.inSpeech) return;
    scene.inSpeech = true;

    var screenWidth = scene.game.renderer.width;
    var screenHeight = scene.game.renderer.height;

    var height = screenHeight / 4;
    var margin = 50;
    var padding = 20;
    var fontSize = 75;

    var actionKey = scene.input.keyboard.addKey('Q');

    if (screenWidth <= 600) {
        margin = 20;
        padding = 10;
        fontSize = 50;
    }

    scene.sound.play('CONFIRMATION_OO2', {volume: 0.01});

    var openSpeech = (string) => {
        if (!string.length) {
            scene.inSpeech = false;
            return;
        }
        var speechBox = scene.add.rectangle(margin, screenHeight - margin, screenWidth - (margin * 2), height, 0x000000).setOrigin(0, 1).setDepth(10).setScrollFactor(0).setAlpha(0.5);
        var speechBoxText = scene.add.bitmapText(margin + padding, screenHeight - height - margin + padding, 'FONT_PRIMARY', string[0]).setDepth(10).setMaxWidth(screenWidth - 120).setFontSize(fontSize).setScrollFactor(0);
        speechBox.setInteractive();

        var destroySpeech = () => {
            scene.sound.play('QUESTION_004', {volume: 0.01});
            speechBox.destroy();
            speechBoxText.destroy();

            if (string.length) {
                string.shift();
                openSpeech(string);
            }
        }

        speechBox.on('pointerdown', () => {
            destroySpeech();
        });
        actionKey.once('down', () => {
            destroySpeech();
        });
    }
    openSpeech(string);
}