import { CST } from '../CST';

import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import { DigitalGamepad } from '../DigitalGamepad';

const Utils = require('../Utils');

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });
    }
    preload() {
        this.load.tilemapTiledJSON('map', './assets/maps/sammoland.json');

        this.anims.create({
            key: 'PLAYER_ANIMATION',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_NORTH',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [1, 2, 3, 4, 5, 6, 7, 8]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_SOUTH',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [22, 23, 24, 25, 26, 27, 28, 29]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_EAST',
            frameRate: 20,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_WEST',
            frameRate: 20,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 41,
                suffix: '.png',
                frames: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
            }),
            repeat: -1
        });
    }

    inSpeech = false;

    create = () => {
        // Utils.loadGamepad(this);
        // Utils.addSpeechModal(this, ['Nice, it works!', `When you get close and press Q, I'll talk to you.`]);

        var gamepad = new DigitalGamepad(this);
        gamepad.load();

        gamepad.aButton.on('pointerdown', () => {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y) < 50) {
                console.log('CLOSE!')
                Utils.addSpeechModal(this, ['Nice, it works!', `When you get close and press Q, I'll talk to you.`]);
            } else {
                console.log('FAR!');
            }
        });

        // Create Joystick
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
            this.stopMovement();
            // this.joystick.enable = false;
            joystickMoved = 0;
            joystickBase.fillColor = 0xFFFFFF;
        })

        // Create a map, terrain, and layers.
        let map = this.add.tilemap('map');
        let tileset = map.addTilesetImage('super-tileset', 'SUPER_TILESET', 32, 32, 1, 2);

        let floorLayer = map.createDynamicLayer('FloorLayer', [tileset], 0, 0);
        let grassLayer = map.createDynamicLayer('GrassLayer', [tileset], 0, 0);
        let layerTwo = map.createDynamicLayer('LayerTwo', [tileset], 0, 0).setDepth(2);

        // Create the player.
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn");
        this.player = this.physics.add.sprite(map.tileToWorldX(22), map.tileToWorldY(72), 'PLAYER_SPRITEZ', 'player-20.png').setDepth(2);
        // this.player = this.physics.add.sprite(spawnPoint.x + (Math.random() * 100), spawnPoint.y + (Math.random() * 100), 'PLAYER_SPRITEZ', 'player-20.png').setDepth(2);
        // this.player = this.physics.add.sprite(100, 100, 'PLAYER_SPRITEZ', 'player-20.png').setDepth(2);
        this.player.body.setSize(this.player.body.width * 0.6, this.player.body.height * 0.6, true);
        this.player.body.setOffset(this.player.body.width * 0.4, this.player.body.height * 0.6, true);
        this.player.setScale(2);

        this.npc = this.physics.add.sprite(map.tileToWorldX(20), map.tileToWorldY(72), 'PLAYER_SPRITEZ');
        this.physics.add.collider(this.player, this.npc);
        this.npc.setImmovable(true);

        // Enabled colliding with objects in the top layer where collides = true.
        this.physics.add.collider(this.player, layerTwo);
        layerTwo.setCollisionByProperty({ collides: true })

        // Lock the camera and set the bounds.
        this.player.body.collideWorldBounds = true;
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Keyboard handling...
        this.keyboard = this.input.keyboard.addKeys('W, S, A, D');

        for (var i in this.keyboard) {
            eval(`this.keyboard.${i}`).on('up', (e) => {
                this.stopMovement();
            });
        }

        var actionKey = this.input.keyboard.addKey('Q');
        actionKey.on('down', (e) => {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y) < 50) {
                console.log('CLOSE!')
                Utils.addSpeechModal(this, ['Nice, it works!', `When you get close and press Q, I'll talk to you.`]);
            } else {
                console.log('FAR!');
            }
        });

        this.speed = 120;
        var shiftKey = this.input.keyboard.addKey('SHIFT');
        shiftKey.on('down', (event) => {
            this.speed = 240;
        });
        shiftKey.on('up', (event) => {
            this.speed = 120;
        });
        var tabKey = this.input.keyboard.addKey('TAB');
        tabKey.on('down', (event) => {
            this.speed = 540;
        });
        tabKey.on('up', (event) => {
            this.speed = 120;
        });
    }

    moveNorth = () => {
        this.player.body.velocity.y = -Math.abs(this.speed);
        this.player.play('PLAYER_ANIMATION_NORTH', true);
    }
    moveSouth = () => {
        this.player.body.velocity.y = this.speed;
        this.player.play('PLAYER_ANIMATION_SOUTH', true);
    }
    moveWest = () => {
        this.player.body.velocity.x = -Math.abs(this.speed);
        this.player.play('PLAYER_ANIMATION_WEST', true);
    }
    
    moveEast = () => {
        this.player.body.velocity.x = this.speed;
        this.player.play('PLAYER_ANIMATION_EAST', true);
    }

    stopMovement = () => {
        this.player.anims.stop();
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        // this.speed = 120;
    }

    update(time, delta) {
        // WSAD movement.
        if (this.keyboard.W.isDown) {
            this.moveNorth();
        }
        if (this.keyboard.S.isDown) {
            this.moveSouth();
        }
        if (this.keyboard.A.isDown) {
            this.moveWest();
        }
        if (this.keyboard.D.isDown) {
            this.moveEast();
        }

        if (this.joystick.up) {
            this.moveNorth();
        }
        if (this.joystick.down) {
            this.moveSouth();
        }
        if (this.joystick.left) {
            this.moveWest();
        }
        if (this.joystick.right) {
            this.moveEast();
        }

        if (this.inSpeech) {
            this.stopMovement();
        }

        this.player.body.velocity.normalize().scale(this.speed);
    }
}