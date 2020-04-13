import { throws } from "assert";

var Utils = require('../Utils.js');

export class NPC {
    scene: Phaser.Scene;
    x: number;
    y: number;
    name: string;
    messages: string[];
    npc!: Phaser.Physics.Arcade.Sprite;
    // constructor(scene: Phaser.Scene, x: any, y: any, name: string, sprite: string, messages: Array<string>) {
    constructor(scene: Phaser.Scene, npcObject: any) {
        this.scene = scene;
        this.x = npcObject.x;
        this.y = npcObject.y;
        this.name = npcObject.name;
        this.messages = npcObject.messages;

        this.add(this.x, this.y, this.name, 'PLAYER_SPRITE', this.messages);
    }

    get getNPC() {
        return this.npc;
    }

    add = (x: any, y: any, name: string, sprite: string, messages: Array<string>) => {
        this.x = x;
        this.y = y;
        this.name = name;
        this.messages = messages;

        this.npc = this.scene.physics.add.sprite(
            x,
            y,
            sprite).setScale(4);
        
        this.npc.setDepth(this.npc.y + this.npc.height / 2);
        this.scene.physics.add.collider(this.scene.player, this.npc);
        this.npc.setImmovable(true);

        if (!this.messages.length) return;

        // var actionKey = this.scene.input.keyboard.addKey('Q');
        this.scene.actionKey.on('down', () => {
            if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.npc.x, this.npc.y) < 100) {
                Utils.reactSpeechBubble(this.scene, this.name, this.messages);
            }

            console.log(this.messages);
        });
    }

    animate = () => {
        this.scene.anims.create({
            key: 'BETSY_ANIMATION',
            frameRate: 3,
            frames: this.scene.anims.generateFrameNames('SCHOOLGIRLS_SPRITE', {
                prefix: 'betsy-',
                start: 0,
                end: 2,
                suffix: '.png'
            }),
            repeat: -1
        });

        this.npc.play('BETSY_ANIMATION');
    }
}
