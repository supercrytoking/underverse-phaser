import { Physics } from 'phaser';
import Utils from '../Utils.js';

import { GameScene } from '../Scenes/GameScene';

type Config = {
    x: number;
    y: number;
    name: string;
    texture: string;
    messages: string[];
}

export class NPC extends Physics.Arcade.Sprite {
    private messages: string[];

    constructor(scene: GameScene, config: Config) {
        const { x, y, texture, name, messages } = config;

        super(scene, x, y, texture);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setName(name);
        this.messages = messages;

        this.setDepth(this.y + this.height / 2);
        this.scene.physics.add.collider(scene.player, this);
        this.setImmovable(true);
        
        this.anims.play(texture);

        if (!this.messages.length) return;

        scene.actionKey.on('down', () => {
            if (Phaser.Math.Distance.Between(scene.player.x, scene.player.y, this.x, this.y) < 100) {
                Utils.reactSpeechBubble(this.scene, this.name, this.messages);
            }
        });

        this.scene.events.on('gamepad-a-down', () => {
            if (Phaser.Math.Distance.Between(scene.player.x, scene.player.y, this.x, this.y) < 100) {
                Utils.reactSpeechBubble(this.scene, this.name, this.messages);
            }
        });
    }
}