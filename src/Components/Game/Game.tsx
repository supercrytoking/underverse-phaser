import React from 'react'
import Phaser from 'phaser'

import LoadScene from './Scenes/LoadScene'
import MenuScene from './Scenes/MenuScene'
import GameScene from './Scenes/GameScene'

var config = {
    type: Phaser.CANVAS,
    parent: 'game',
    touch: 'true',
    scale: {
        // mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    pixelArt: true,
    scene: [LoadScene, MenuScene, GameScene]
}

new Phaser.Game(config);

type GameState = {}
type GameProps = {}
class Game extends React.Component<GameState, GameProps> {
    constructor(props: GameState) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className="game" id="game"></div>
        )
    }
}

export default Game