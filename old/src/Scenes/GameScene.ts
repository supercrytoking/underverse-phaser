import { Player } from '../Classes/Player'
import { NPC } from '../Classes/NPC'
import { Mob } from '../Classes/Mob'
import { Weapon } from '../Classes/Weapon'
import { Physics } from 'phaser'

var R = require('random')

export class GameScene extends Phaser.Scene {
    actionKey: any
    player!: Player
    mobs!: Phaser.GameObjects.Group
    constructor() {
        super({
            key: 'GAME_SCENE'
        })
    }

    inSpeech = false

    create() {
        this.input.addPointer(2)
        this.actionKey = this.input.keyboard.addKey('Q')

        if (this.game.renderer.width <= 600) {
            this.scene.launch('VGP_SCENE', this)
        }

        let map = this.add.tilemap('map')
        let tileset = map.addTilesetImage('varniro-tileset', 'VARNIRO_TILESET', 32, 32, 0, 0)

        let floorLayer = map.createStaticLayer('Floor', [tileset], 0, 0).setScale(2)
        let foliageLayer = map.createStaticLayer('Foliage', [tileset], 0, 0).setScale(2)
        
        this.cameras.main.setBounds(0, 0, floorLayer.displayWidth, floorLayer.displayHeight)
        this.physics.world.setBounds(0, 0, floorLayer.displayWidth, floorLayer.displayHeight)

        // Create the player.
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn") as any
        this.player = new Player(this, {
            x: spawnPoint.x * 2,
            y: spawnPoint.y * 2,
        })
        this.player.addWeapon()
        
        this.physics.add.collider(this.player, floorLayer)
        floorLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.player, foliageLayer)
        foliageLayer.setCollisionByProperty({ collides: true })

        // this.obs = map.createFromTiles(51, -1, { key: 'TREE' }, this, this.cameras.main, treeLayer)
        // for (var i in this.obs) {
        //     this.obs[i].x = this.obs[i].x + r.int(0, 64)
        //     this.obs[i].y = this.obs[i].y + r.int(0, 64)
        //     this.obs[i].setScale(r.float(1, 2))
        //     this.physics.add.existing(this.obs[i], true)
        //     this.obs[i].setDepth(this.obs[i].y + this.obs[i].height / 2)
        //     this.obs[i].body.setSize(this.obs[i].body.width / 2, this.obs[i].body.height / 4)
        //     this.obs[i].body.setOffset(this.obs[i].body.width / 2, this.obs[i].body.height * 3)
        //     this.physics.add.collider(this.player, this.obs[i])
        //     this.obs[i].play('ANIMATED_TREE')
        // }

        // Enabled colliding with objects in the top layer where collides = true.
        // this.physics.add.collider(this.player, layerTwo)
        // layerTwo.setCollisionByProperty({ collides: true })

        var kingo = new NPC(this, {
            x: this.player.x + 200,
            y: this.player.y,
            name: 'Kingo',
            texture: 'BETSY_ANIMATION',
            messages: [
                'Don\'t talk to me.',
                '...',
                '?'
            ]
        })

        this.mobs = this.add.group()
        for (var i = 0 i < 10 i++) {
            var mob = new Mob(this, this.player.x + R.int(-200, 200), this.player.y + R.int(-200, 200), 'MOB_DUNNOT', 100, 100, 100, 200)
            mob.setBounce(0)
            this.mobs.add(mob)
        }

        this.physics.add.collider(this.mobs, this.mobs)
    }
    
    update(time: number, delta: number) {
        
    }
}