import { CST } from '../CST'

// @ts-ignore
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js'
import { DigitalGamepad } from '../Classes/DigitalGamepad'

const Utils = require('../Utils')

var test

export class VirtualGamepadScene extends Phaser.Scene {
    parent: any
    joystick: any
    speed: number
    inSpeech: any
    constructor() {
        super({
            key: CST.SCENES.VGP
        })
        
        this.speed = 120
    }

    init = (data: any) => {
        this.parent = data
    }

    preload() {
        console.log('Loading VGP...')
    }

    create() {
        var settingsButton = this.add.image(this.game.renderer.width - 20, 20, 'SETTINGS_BUTTON')
            .setOrigin(1, 0)
            .setDisplaySize(40, 40)
            .setInteractive()

         settingsButton.on('pointerdown', () => {
             console.log('Down!')
         })

        // VGP buttons.
        var gamepad = new DigitalGamepad(this)
        gamepad.load()

        // VGP joystick.
        var joystickBase = this.add.circle(0, 0, 50, 0xFFFFFF, 0.1).setDepth(10)
        var joystickThumb = this.add.circle(0, 0, 25, 0xFFFFFF, 0.1).setDepth(10)

        this.joystick = new VirtualJoystick(this, {
            x: 200,
            y: 200,
            radius: 50,
            base: joystickBase,
            thumb: joystickThumb,
            // dir: '8dir',
            // forceMin: 16,
            // fixed: true,
            enable: false
        })

        let joystickMoved = 0
        this.joystick.on('update', () => {
            if (this.joystick.force >= 200) {
                joystickMoved++
                this.joystick.x = this.joystick.pointerX
                this.joystick.y = this.joystick.pointerY
            }

            if (joystickMoved >= 1) {
                this.speed = 240
                joystickBase.fillColor = 0xFF0000
            } else {
                this.speed = 120
            }
        })

        var joystickArea = this.add.rectangle(0, 0, window.innerWidth / 2, window.innerHeight, 0xFF0000, 0).setScrollFactor(0).setDepth(4).setOrigin(0, 0)
        joystickArea.setInteractive()

        joystickArea.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Enable joystick on click down.
            this.joystick.x = pointer.x
            this.joystick.y = pointer.y
            this.joystick.enable = true
        })

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            joystickMoved = 0
            joystickBase.fillColor = 0xFFFFFF
        })
    }

    update() {
        if (this.joystick.up) {
            this.parent.player.body.velocity.y = -Math.abs(this.speed)
        }
        if (this.joystick.down) {
            this.parent.player.body.velocity.y = this.speed
        }
        if (this.joystick.left) {
            this.parent.player.body.velocity.x = -Math.abs(this.speed)
        }
        if (this.joystick.right) {
            this.parent.player.body.velocity.x = this.speed
        }
    }
}