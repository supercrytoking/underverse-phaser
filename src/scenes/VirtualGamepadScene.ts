import { CST } from '../CST';

import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import { DigitalGamepad } from '../DigitalGamepad';

const Utils = require('../Utils');

var test;

export class VirtualGamepadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.VGP
        });
    }

    parent = null;
    init = (data: any) => {
        parent = data;
    }

    preload() {
        console.log('Loading VGP...');
    }

    create() {
        var settingsButton = this.add.image(this.game.renderer.width - 20, 20, 'SETTINGS_BUTTON')
            .setOrigin(1, 0)
            .setDisplaySize(40, 40)
            .setInteractive();

         settingsButton.on('pointerdown', () => {
             console.log('Down!');
         });

        // VGP buttons.
        var gamepad = new DigitalGamepad(this);
        gamepad.load();

        gamepad.aButton.on('pointerdown', () => {
            if (Phaser.Math.Distance.Between(parent.player.x, parent.player.y, parent.npc.x, parent.npc.y) < 50) {
                console.log('CLOSE!')
                Utils.reactSpeechBubble(this, 'The King', ['Nice, it works!', `When you get close and press Q, I'll talk to you.`])
                // Utils.addSpeechModal(this, ['Nice, it works!', `When you get close and press Q, I'll talk to you.`]);
            } else {
                console.log('FAR!');
            }
        });

        // VGP joystick.
        var joystickBase = this.add.circle(0, 0, 50, 0xFFFFFF, 0.1).setDepth(10);
        var joystickThumb = this.add.circle(0, 0, 25, 0xFFFFFF, 0.1).setDepth(10);

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
        });

        let joystickMoved = 0;
        this.joystick.on('update', () => {
            if (this.joystick.force >= 200) {
                joystickMoved++;
                this.joystick.x = this.joystick.pointerX;
                this.joystick.y = this.joystick.pointerY;
            }

            if (joystickMoved >= 1) {
                this.speed = 240;
                joystickBase.fillColor = 0xFF0000;
            } else {
                this.speed = 120;
            }
        });

        var joystickArea = this.add.rectangle(0, 0, window.innerWidth / 2, window.innerHeight, 0xFF0000, 0).setScrollFactor(0).setDepth(4).setOrigin(0, 0);
        joystickArea.setInteractive()

        joystickArea.on('pointerdown', (pointer) => {
            // Enable joystick on clickdown.
            this.joystick.x = pointer.x;
            this.joystick.y = pointer.y;
            this.joystick.enable = true;
        });

        this.input.on('pointerup', (pointer) => {
            // Disable joystick on clickup.
            parent.stopMovement();
            // this.joystick.enable = false;
            joystickMoved = 0;
            joystickBase.fillColor = 0xFFFFFF;
        })
    }

    update() {
        if (this.joystick.up) {
            parent.moveNorth();
        }
        if (this.joystick.down) {
            parent.moveSouth();
        }
        if (this.joystick.left) {
            parent.moveWest();
        }
        if (this.joystick.right) {
            parent.moveEast();
        }

        if (this.inSpeech) {
            parent.stopMovement();
        }
    }
}