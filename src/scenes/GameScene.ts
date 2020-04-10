import { CST } from '../CST';

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
            frameRate: 4,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 4,
                suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_NORTH',
            frameRate: 4,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 4,
                suffix: '.png',
                frames: [1]
            })
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_SOUTH',
            frameRate: 4,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 4,
                suffix: '.png',
                frames: [3]
            })
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_EAST',
            frameRate: 4,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 4,
                suffix: '.png',
                frames: [2]
            })
        });

        this.anims.create({
            key: 'PLAYER_ANIMATION_WEST',
            frameRate: 4,
            frames: this.anims.generateFrameNames('PLAYER_SPRITEZ', {
                prefix: 'player-',
                start: 1,
                end: 4,
                suffix: '.png',
                frames: [4]
            })
        });
    }

    speed = 200;

    moveNorth = () => {
        this.player.setVelocityY(-Math.abs(this.speed));
        this.player.play('PLAYER_ANIMATION_NORTH');
    }
    moveSouth = () => {
        this.player.setVelocityY(this.speed);
        this.player.play('PLAYER_ANIMATION_SOUTH');
    }
    moveWest = () => {
        this.player.setVelocityX(-Math.abs(this.speed));
        this.player.play('PLAYER_ANIMATION_WEST');
    }
    
    moveEast = () => {
        this.player.setVelocityX(this.speed);
        this.player.play('PLAYER_ANIMATION_EAST');
    }

    create() {
        // Create a map, terrain, and layers.
        let map = this.add.tilemap('map');
        let terrain = map.addTilesetImage('super-tileset', 'SUPER_TILESET');
        let terrainTwo = map.addTilesetImage('futuristic_tileset', 'DARK_TILESET');
        let bottomLayer = map.createStaticLayer('FirstLayer', [terrain, terrainTwo], 0, 0).setDepth(0);
        let topLayer = map.createStaticLayer('SecondLayer', [terrain], 0, 0).setDepth(2);

        // Create the player.
        this.player = this.physics.add.sprite(100, 100, 'PLAYER_SPRITEZ', 'player-3.png').setScale(2).setDepth(1);

        // Enabled colliding with objects in the top layer where collides = true.
        this.player.body.collideWorldBounds = true;
        this.physics.add.collider(this.player, topLayer);
        topLayer.setCollisionByProperty({ collides: true })

        // Lock the camera and set the bounds.
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Create the on-screen buttons used in mobile.
        // var buttonPadding = 40;
        // var buttonMargin = 80;
        // var buttonSize = 80;

        // var abtn = this.add.sprite(this.game.renderer.width - buttonPadding - buttonMargin, this.game.renderer.height - buttonPadding, 'GAMEPAD_A').setDepth(4).setOrigin(1, 1);
        // abtn.setDisplaySize(buttonSize, buttonSize);
        // abtn.setScrollFactor(0);

        // var bbtn = this.add.sprite(this.game.renderer.width - buttonPadding, this.game.renderer.height - buttonPadding - buttonMargin, 'GAMEPAD_B').setDepth(4).setOrigin(1, 1);
        // bbtn.setDisplaySize(buttonSize, buttonSize);
        // bbtn.setScrollFactor(0);

        // var xbtn = this.add.sprite(0 + buttonPadding, this.game.renderer.height - buttonPadding - buttonMargin, 'GAMEPAD_X').setDepth(4).setOrigin(0, 1);
        // xbtn.setDisplaySize(buttonSize, buttonSize);
        // xbtn.setScrollFactor(0);

        // var ybtn = this.add.sprite(0 + buttonPadding + buttonMargin, this.game.renderer.height - buttonPadding, 'GAMEPAD_Y').setDepth(4).setOrigin(0, 1);
        // ybtn.setDisplaySize(buttonSize, buttonSize);
        // ybtn.setScrollFactor(0);

        // Player movement.
        this.keyboard = this.input.keyboard.addKeys('W, S, A, D, SHIFT');
        var shiftKey = this.input.keyboard.addKey('SHIFT');

        shiftKey.on('down', (event) => {
            this.speed = 400;
        });

        shiftKey.on('up', (event) => {
            this.speed = 200;
        });

        this.input.on('pointerdown', (pointer) => {
            this.startX = pointer.x;
            this.startY = pointer.y;
        })
        this.swipe = {}
        this.input.on('pointerup', (pointer) => {
            this.swipe = {}
        })

    }

    update(time, delta) {
        // Player movement.
        var pointer = this.game.input.activePointer;
        var threshold = 40;

        if (this.swipe.direction) {
            this.physics.moveTo(this.player, pointer.worldX, pointer.worldY, this.speed);
        }
        if (pointer.isDown) {
            console.log(this.swipe);
            // console.log(`Start: ${this.startX} ${this.startY}, Current: ${pointer.x} ${pointer.y}`);
            if (pointer.x > (this.startX + threshold)) {
                this.swipe.right = true;
                this.swipe.direction = 'right';
            }
            if (pointer.x < (this.startX - threshold)) {
                this.swipe.left = true;
                this.swipe.direction = 'left';
            }
            if (pointer.y > (this.startY + threshold)) {
                this.swipe.down = true;
                this.swipe.direction = 'down';
            }
            if (pointer.y < (this.startY - threshold)) {
                this.swipe.up = true;
                this.swipe.direction = 'up';
            }
        }

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

        if (this.keyboard.SHIFT.isDown) {
            console.log('SHIFT');
        }

        // Movement reset.
        if (this.keyboard.W.isUp && this.keyboard.S.isUp && !pointer.isDown) {
            this.player.setVelocityY(0);
        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp && !pointer.isDown) {
            this.player.setVelocityX(0);
        }
    }
}