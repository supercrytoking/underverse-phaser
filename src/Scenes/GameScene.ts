import { CST } from '../CST';
import { NPC } from '../classes/npc';
import { Player } from '../classes/player';
import { spawn } from 'child_process';

export class GameScene extends Phaser.Scene {
    actionKey: any;
    player!: Player;
    obs: any;
    kingo!: NPC;
    constructor() {
        super({
            key: 'GAME_SCENE'
        });
    }

    inSpeech = false;

    create() {
        this.scene.launch(CST.SCENES.VGP, this);

        this.actionKey = this.input.keyboard.addKey('Q');

        // Create a map, terrain, and layers.
        let map = this.add.tilemap('map')
        let tileset = map.addTilesetImage('underverse-tileset', 'UNDERVERSE_TILESET', 32, 32, 0, 0);
        let waterTileset = map.addTilesetImage('water-tileset', 'WATER_TILESET', 32, 32, 0, 0);

        let floorLayer = map.createStaticLayer('Floor', [tileset, waterTileset], 0, 0).setScale(2);
        let foilageLayer = map.createStaticLayer('Foilage', [tileset, waterTileset], 0, 0).setScale(2);
        // let grassLayer = map.createStaticLayer('GrassLayer', [tileset, underTileset], 0, 0).setScale(2);
        // let treeLayer = map.createStaticLayer('TreeLayer', [tileset, underTileset], 0, 0).setScale(2);
        // let waterLayer = map.createStaticLayer('WaterLayer', [tileset, underTileset], 0, 0).setScale(2);
        // let bridgeLayer = map.createStaticLayer('BridgeLayer', [tileset, underTileset], 0, 0).setScale(2);
        this.cameras.main.setBounds(0, 0, floorLayer.displayWidth, floorLayer.displayHeight);
        this.physics.world.setBounds(0, 0, floorLayer.displayWidth, floorLayer.displayHeight);

        // Create the player.
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn") as any;
        this.player = new Player(this, {
            x: spawnPoint.x * 2,
            y: spawnPoint.y * 2,
        });

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

        this.kingo = new NPC(this, {
            x: this.player.x + 200,
            y: this.player.y,
            name: 'Kingo',
            texture: 'BETSY_ANIMATION',
            messages: [
                'Don\'t talk to me.',
                '...',
                '?'
            ]
        });
    }
    
    update(time: number, delta: number) {}
}