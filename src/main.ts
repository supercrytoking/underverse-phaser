import 'phaser'
import phaserReact from 'phaser3-react'

import { LoadScene } from './Scenes/LoadScene';
import { MenuScene } from './Scenes/MenuScene';
import { GameScene } from './Scenes/GameScene';
import { VirtualGamepadScene } from './Scenes/VirtualGamepadScene';

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
            // debug: true
        }
    },
    pixelArt: true,
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

    if (game.scene.isActive('VGP')) {
        game.scene.getScene('VGP').scene.restart();
    }
}, false);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}