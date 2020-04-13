import { CST } from '../CST';
import { NPC } from '../Classes/NPC';

const Utils = require('../Utils');
var r = require('random');

export class GameScene extends Phaser.Scene {
    actionKey: any;
    player: any;
    obs: any;
    speed: number;
    kingo!: NPC;
    movementKeys: object | any;
    constructor() {
        super({
            key: CST.SCENES.GAME
        });

        this.speed = 120;
    }
    preload() {
        this.load.tilemapTiledJSON('map', './assets/maps/underverse.json');
        this.load.image('UNDERVERSE_TILESET', './assets/maps/underverse-tileset.png')
        this.load.image('WATER_TILESET', './assets/maps/water-tileset.png')

        this.anims.create({
            key: 'ANIMATED_TREE',
            frameRate: 10,
            frames: this.anims.generateFrameNames('TREE_SPRITE', {
                prefix: 'frame_',
                start: 1,
                end: 13,
                suffix: '.gif',
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION',
            frameRate: 10,
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
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
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
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
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
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
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
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
            frames: this.anims.generateFrameNames('PLAYER_SPRITE', {
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

        this.actionKey = this.input.keyboard.addKey('Q');

        // Create a map, terrain, and layers.
        let map = this.add.tilemap('map')
        let tileset = map.addTilesetImage('underverse-tileset', 'UNDERVERSE_TILESET', 32, 32, 0, 0);
        let waterTileset = map.addTilesetImage('water-tileset', 'WATER_TILESET', 32, 32, 0, 0);

        let floorLayer = map.createStaticLayer('Floor', [tileset, waterTileset], 0, 0);
        // let grassLayer = map.createStaticLayer('GrassLayer', [tileset, underTileset], 0, 0).setScale(2);
        // let treeLayer = map.createStaticLayer('TreeLayer', [tileset, underTileset], 0, 0).setScale(2);
        // let waterLayer = map.createStaticLayer('WaterLayer', [tileset, underTileset], 0, 0).setScale(2);
        // let bridgeLayer = map.createStaticLayer('BridgeLayer', [tileset, underTileset], 0, 0).setScale(2);
        this.cameras.main.setBounds(0, 0, floorLayer.displayWidth, floorLayer.displayHeight);
        this.physics.world.setBounds(0, 0, floorLayer.displayWidth, floorLayer.displayHeight);

        // Create the player.
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn") as any;
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'PLAYER_SPRITE', 'player-20.png');
        this.player.body.setSize(this.player.width, this.player.height / 4);
        this.player.setOffset(0, this.player.height - (this.player.height / 4))

        // this.obs = map.createFromTiles(51, -1, { key: 'TREE' }, this, this.cameras.main, treeLayer);
        // for (var i in this.obs) {
        //     this.obs[i].x = this.obs[i].x + r.int(0, 64);
        //     this.obs[i].y = this.obs[i].y + r.int(0, 64);
        //     this.obs[i].setScale(r.float(1, 2));
        //     this.physics.add.existing(this.obs[i], true)
        //     this.obs[i].setDepth(this.obs[i].y + this.obs[i].height / 2);
        //     this.obs[i].body.setSize(this.obs[i].body.width / 2, this.obs[i].body.height / 4);
        //     this.obs[i].body.setOffset(this.obs[i].body.width / 2, this.obs[i].body.height * 3);
        //     this.physics.add.collider(this.player, this.obs[i]);
        //     this.obs[i].play('ANIMATED_TREE');
        // }


        // Enabled colliding with objects in the top layer where collides = true.
        // this.physics.add.collider(this.player, layerTwo);
        // layerTwo.setCollisionByProperty({ collides: true })

        // Lock the camera and set the bounds.
        this.player.body.collideWorldBounds = true;
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Keyboard handling...
        this.movementKeys = this.input.keyboard.addKeys({
            W: 'W',
            S: 'S',
            A: 'A',
            D: 'D'
        });

        var shiftKey = this.input.keyboard.addKey('SHIFT');
        shiftKey.on('down', () => {
            this.speed = 240;
        });
        shiftKey.on('up', () => {
            this.speed = 120;
        });
        var tabKey = this.input.keyboard.addKey('TAB');
        tabKey.on('down', () => {
            this.speed = 540;
        });
        tabKey.on('up', () => {
            this.speed = 120;
        });

        // var beeps = new NPC(this, {
        //     x: this.player.x,
        //     y: this.player.y,
        //     name: 'Beeps',
        //     sprite: 'PLAYER_SPRITE',
        //     messages: [
        //         'Hi!, I\' Beeps.'
        //     ]
        // });

        this.kingo = new NPC(this, {
            x: this.player.x + 200,
            y: this.player.y,
            name: 'Kingo',
            sprite: 'PLAYER_SPRITE',
            messages: [
                'Don\'t talk to me.',
                '...',
                '?'
            ]
        });

        this.kingo.animate();
    }
    
    update(time: number, delta: number) {
        this.player.setDepth(this.player.y + this.player.height);

        // WSAD movement.
        if (this.movementKeys.W.isDown) {
            this.player.body.velocity.y = -Math.abs(this.speed);
        }
        if (this.movementKeys.S.isDown) {
            this.player.body.velocity.y = this.speed;
        }
        if (this.movementKeys.A.isDown) {
            this.player.body.velocity.x = -Math.abs(this.speed);
        }
        if (this.movementKeys.D.isDown) {
            this.player.body.velocity.x = this.speed;
        }

        if (this.inSpeech) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }
        
        if (this.player.body.velocity.x > 0) {
            this.player.play('PLAYER_ANIMATION_EAST', true);
        }
        
        if (this.player.body.velocity.x < 0) {
            this.player.play('PLAYER_ANIMATION_WEST', true);
        }

        if (this.player.body.velocity.y > 0 && this.player.body.velocity.x == 0) {
            this.player.play('PLAYER_ANIMATION_SOUTH', true);
        }
        
        if (this.player.body.velocity.y < 0 && this.player.body.velocity.x == 0) {
            this.player.play('PLAYER_ANIMATION_NORTH', true);
        }

        if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
            this.player.anims.stop();
        }

        if (this.movementKeys.W.isUp && this.movementKeys.S.isUp) {
            this.player.body.velocity.y = 0;
        }

        if (this.movementKeys.A.isUp && this.movementKeys.D.isUp) {
            this.player.body.velocity.x = 0;
        }

        this.player.body.velocity.normalize().scale(this.speed);
    }
}