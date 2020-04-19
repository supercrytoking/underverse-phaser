// @ts-ignore
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js'
import { DigitalGamepad } from '../Classes/DigitalGamepad'

export class VirtualGamepadScene extends Phaser.Scene {
    parent: any
    movementJoystick: VirtualJoystick
    weaponJoystick: VirtualJoystick
    speed: number
    inSpeech: any
    buttonPadding: number
    buttonMargin: number
    buttonSize: number
    aButton: any
    bButton: any
    constructor() {
        super({
            key: 'VGP_SCENE'
        })

        this.speed = 120;
        this.buttonPadding = 40;
        this.buttonMargin = 80;
        this.buttonSize = 80;
    }

    init(data: any) {
        this.parent = data;
    }

    preload() {}

    create() {
        var settingsButton = this.add.image(this.game.renderer.width - 20, 20, 'SETTINGS_BUTTON')
            .setOrigin(1, 0)
            .setDisplaySize(40, 40)
            .setInteractive()

        settingsButton.on('pointerdown', () => {
            console.log('Down!')
        })

        if (this.game.renderer.width <= 600) {
            this.buttonPadding = 20;
            this.buttonMargin = 50;
            this.buttonSize = 60;
        }

        this.aButton = this.add.sprite(this.game.renderer.width - this.buttonPadding - this.buttonMargin, this.game.renderer.height - this.buttonPadding, 'GAMEPAD_A').setOrigin(1, 1);
        this.aButton.setDisplaySize(this.buttonSize, this.buttonSize);
        this.aButton.setScrollFactor(0);
        this.aButton.setInteractive();

        this.bButton = this.add.sprite(this.game.renderer.width - this.buttonPadding, this.game.renderer.height - this.buttonPadding - this.buttonMargin, 'GAMEPAD_B').setOrigin(1, 1);
        this.bButton.setDisplaySize(this.buttonSize, this.buttonSize);
        this.bButton.setScrollFactor(0);
        this.bButton.setInteractive();

        this.aButton.on('pointerdown', () => {
            this.parent.events.emit('gamepad-a-down');
        });

        this.aButton.on('pointerup', () => {
            this.parent.events.emit('gamepad-a-up');
        });

        this.bButton.on('pointerdown', () => {
            this.parent.events.emit('gamepad-b-down');
        });

        this.bButton.on('pointerup', () => {
            this.parent.events.emit('gamepad-b-up');
        });

        // VGP buttons.
        var gamepad = new DigitalGamepad(this)
        gamepad.load(this.parent)

        // VGP joystick.
        var movementJoystickBase = this.add.circle(0, 0, 50, 0xFFFFFF, 0).setDepth(10)
        var movementJoystickThumb = this.add.circle(0, 0, 25, 0xFFFFFF, 0).setDepth(10)

        this.movementJoystick = new VirtualJoystick(this, {
            x: 200,
            y: 200,
            radius: 50,
            base: movementJoystickBase,
            thumb: movementJoystickThumb,
            // dir: '8dir',
            // forceMin: 16,
            // fixed: true,
            enable: false
        })

        let joystickMoved = 0
        this.movementJoystick.on('update', () => {
            if (this.movementJoystick.force >= 200) {
                joystickMoved++
                this.movementJoystick.x = this.movementJoystick.pointerX
                this.movementJoystick.y = this.movementJoystick.pointerY
            }

            if (joystickMoved >= 1) {
                this.speed = 240
                movementJoystickBase.fillColor = 0xFF0000
            } else {
                this.speed = 120
            }
        })

        var movementJoystickArea = this.add.rectangle(0, 0, window.innerWidth / 2, window.innerHeight, 0xFF0000, 0.1).setScrollFactor(0).setDepth(4).setOrigin(0, 0)
        movementJoystickArea.setInteractive()

        movementJoystickArea.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Enable joystick on click down.
            this.movementJoystick.x = pointer.x
            this.movementJoystick.y = pointer.y
            this.movementJoystick.enable = true
        })

        var weaponJoystickArea = this.add.rectangle(window.innerWidth /2, 0, window.innerWidth / 2, window.innerHeight, 0xFFFF00, 0.1).setScrollFactor(0).setDepth(4).setOrigin(0, 0)
        weaponJoystickArea.setInteractive()

        var weaponJoystickBase = this.add.circle(0, 0, 50, 0xFFFF00, 0.2).setDepth(10)
        var weaponJoystickThumb = this.add.circle(0, 0, 25, 0xFFFF00, 0.2).setDepth(10)
        this.weaponJoystick = new VirtualJoystick(this, {
            x: 200,
            y: 200,
            radius: 50,
            base: weaponJoystickBase,
            thumb: weaponJoystickThumb,
            // dir: '8dir',
            // forceMin: 16,
            // fixed: true,
            enable: false
        })

        weaponJoystickArea.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Enable joystick on click down.
            this.weaponJoystick.x = pointer.x
            this.weaponJoystick.y = pointer.y
            this.weaponJoystick.enable = true
        })

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            joystickMoved = 0
            movementJoystickBase.fillColor = 0xFFFFFF
        })

        this.movementJoystick.on('update', () => {
            this.parent.player.keys.W.isDown = false;
            this.parent.player.keys.W.isUp = true;
            this.parent.player.keys.S.isDown = false;
            this.parent.player.keys.S.isUp = true;
            this.parent.player.keys.A.isDown = false;
            this.parent.player.keys.A.isUp = true;
            this.parent.player.keys.D.isDown = false;
            this.parent.player.keys.D.isUp = true;
        })

        console.log(this.parent.player.x, this.parent.player.y)
        this.add.rectangle(this.parent.player.body.x, this.parent.player.body.y, 10, 10, 0xFF00FF).setDepth(4)
    }

    update() {
        if (this.weaponJoystick.force > 0) {
            this.parent.player.weapon.shoot(null, null, this.weaponJoystick.angle)
        }

        if (this.movementJoystick.up) {
            // this.parent.player.body.velocity.y = -Math.abs(this.speed)
            this.parent.player.keys.W.isDown = true;
            this.parent.player.keys.W.isUp = false;
        }
        if (this.movementJoystick.down) {
            // this.parent.player.body.velocity.y = this.speed
            this.parent.player.keys.S.isDown = true;
            this.parent.player.keys.S.isUp = false;
        }
        if (this.movementJoystick.left) {
            // this.parent.player.body.velocity.x = -Math.abs(this.speed)
            this.parent.player.keys.A.isDown = true;
            this.parent.player.keys.A.isUp = false;
        }
        if (this.movementJoystick.right) {
            // this.parent.player.body.velocity.x = -Math.abs(this.speed)
            this.parent.player.keys.D.isDown = true;
            this.parent.player.keys.D.isUp = false;
        }
    }
}