import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

var config = {
    type: Phaser.CANVAS,
    scale: {
        // mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [
        LoadScene, MenuScene, GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

window.addEventListener('resize', function (event) {
    game.scale.resize(window.innerWidth, window.innerHeight);
}, false);