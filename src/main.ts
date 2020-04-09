import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

var config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        width: window.innerWidth / 1.3,
        height: window.innerHeight / 1.3
    },
    scene: [
        LoadScene, MenuScene, GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    pixelArt: true
}

let game = new Phaser.Game(config);