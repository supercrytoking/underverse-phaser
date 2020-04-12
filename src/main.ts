import phaserReact from 'phaser3-react'

import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';
import { VirtualGamepadScene } from './scenes/VirtualGamepadScene';

var config = {
    type: Phaser.CANVAS,
    scale: {
        // mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [
        LoadScene, MenuScene, GameScene, VirtualGamepadScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    plugins: {
        global: [
          {
            key: 'phaser-react',
            plugin: phaserReact,
            start: true,
            data: { parent: 'react' }
          }
        ]
    }
}

let game = new Phaser.Game(config);

window.addEventListener('resize', function (event) {
    game.scale.resize(window.innerWidth, window.innerHeight);
}, false);