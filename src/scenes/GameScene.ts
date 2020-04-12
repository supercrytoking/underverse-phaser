import { CST } from '../CST';

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
        this.scene.launch(CST.SCENES.VGP, this);

        // Create a map, terrain, and layers.
        let map = this.add.tilemap('map');
        let tileset = map.addTilesetImage('super-tileset', 'SUPER_TILESET', 32, 32, 1, 2);

        let floorLayer = map.createDynamicLayer('FloorLayer', [tileset], 0, 0);
        let grassLayer = map.createDynamicLayer('GrassLayer', [tileset], 0, 0);
        let waterLayer = map.createDynamicLayer('WaterLayer', [tileset], 0, 0);
        let bridgeLayer = map.createDynamicLayer('BridgeLayer', [tileset], 0, 0);

        // map.createFromObjects();

        // Create the player.
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn");
        this.player = this.physics.add.sprite(map.tileToWorldX(22), map.tileToWorldY(72), 'PLAYER_SPRITEZ', 'player-20.png');
        this.player.body.setSize(this.player.width, this.player.height / 2);
        this.player.setOffset(0, this.player.height / 2)
        this.player.setScale(2);
        // this.player.setCircle(this.player.height / 4, -this.player.width / 4, this.player.height / 2);

        this.npc = this.physics.add.sprite(map.tileToWorldX(20), map.tileToWorldY(72), 'PLAYER_SPRITEZ').setScale(2);;
        this.physics.add.collider(this.player, this.npc);
        this.npc.setImmovable(true);
        this.npc.setDepth(this.npc.y + this.npc.height / 2)
        
        // console.log(this.npc);
        this.obs = map.createFromTiles(51, -1, {key: 'TREE'}, this, this.cameras.main, grassLayer);
        for (var i in this.obs) {
            this.physics.add.existing(this.obs[i], true)
            this.obs[i].setDepth(this.obs[i].y + this.obs[i].height / 2);
        }

        // this.add.sprite(100, 100, 'TREE').setScrollFactor(0).setDepth(10);

        // Enabled colliding with objects in the top layer where collides = true.
        // this.physics.add.collider(this.player, layerTwo);
        // layerTwo.setCollisionByProperty({ collides: true })

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
                // Utils.addSpeechModal(this, ['Nice, it works!', `When you get close and press Q, I'll talk to you.`, 'SUCK ME!', 'WHAT UP!']);
                Utils.reactSpeechBubble(this, 'The King', ['Nice, it works!', `When you get close and press Q, I'll talk to you.`])

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
        // console.log(this.npc.depth, this.player.depth);
        this.player.depth = this.player.y + this.player.height / 2;

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

        if (this.inSpeech) {
            this.stopMovement();
        }

        this.player.body.velocity.normalize().scale(this.speed);
    }
}