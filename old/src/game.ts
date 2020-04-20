import ReactDOM from 'react-dom'
import React from 'react'
import 'phaser'
import phaserReact from 'phaser3-react'

// import AuthenticationModal from './Components/AuthenticationModal/'

import './game.css'
import 'reset-css'

import { LoadScene } from './Scenes/LoadScene';
import { MenuScene } from './Scenes/MenuScene';
import { GameScene } from './Scenes/GameScene';
import { VirtualGamepadScene } from './Scenes/VirtualGamepadScene';

var config = {
    type: Phaser.CANVAS,
    touch: true,
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

window.addEventListener('resize', (e) => {
    game.scale.resize(window.innerWidth, window.innerHeight);

    if (game.scene.isActive('VGP_SCENE')) {
        game.scene.getScene('VGP_SCENE').scene.restart();
    }
}, false)

// game.input.enabled = false;