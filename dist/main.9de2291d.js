parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mOOU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CST={SCENES:{LOAD:"LOAD",MENU:"MENU",GAME:"GAME"},IMAGES:{MENU_BG:"menu-background.png",LOGIN_BTN:"login-button.png",REGISTER_BTN:"register-button.png",PLAYER:"player.png",TERRAIN_ATLAS:"terrain_atlas.png",GAMEPAD_A:"gamepad-a.png",GAMEPAD_B:"gamepad-b.png",GAMEPAD_X:"gamepad-x.png",GAMEPAD_Y:"gamepad-y.png"},AUDIO:{MENU_MUSIC:"menu-music.m4a"}};
},{}],"G1z3":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(o,e)};return function(o,e){function r(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var o=require("../CST"),e=function(e){function r(){return e.call(this,{key:"CST.SCENES.LOAD"})||this}return t(r,e),r.prototype.loadImages=function(){for(var t in this.load.setPath("./assets/img"),o.CST.IMAGES)this.load.image(t,o.CST.IMAGES[t])},r.prototype.loadAudio=function(){for(var t in this.load.setPath("./assets/audio"),o.CST.AUDIO)this.load.audio(t,o.CST.AUDIO[t])},r.prototype.loadSprites=function(){this.load.setPath("./assets/sprites"),this.load.atlas("PLAYER_SPRITEZ","player-sprites.png","player-sprites.json")},r.prototype.preload=function(){var t=this;console.log("Loading..."),this.loadImages(),this.loadAudio(),this.loadSprites();var e=this.add.graphics({fillStyle:{color:7340032}});this.load.on("progress",function(o){e.fillRect(0,t.game.renderer.height-20,t.game.renderer.width*o,20)}),this.load.on("complete",function(){t.scene.start(o.CST.SCENES.MENU)}),this.load.on("load",function(t){console.log("Loaded "+t.key+".")})},r}(Phaser.Scene);exports.LoadScene=e;
},{"../CST":"mOOU"}],"OuKZ":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../CST"),r=function(r){function n(){return r.call(this,{key:e.CST.SCENES.MENU})||this}return t(n,r),n.prototype.preload=function(){},n.prototype.create=function(){var t=this;this.bg=this.add.image(0,0,"MENU_BG").setOrigin(0),this.bg.alpha=.2,this.bg.displayWidth=this.game.renderer.width,this.bg.displayHeight=this.game.renderer.height;var r=setInterval(function(){1==t.bg.alpha&&clearInterval(r),t.bg.alpha=t.bg.alpha+.01},300),n=this.add.image(this.game.renderer.width/2,this.game.renderer.height-20,"LOGIN_BTN").setOrigin(.5,1);n.setInteractive(),n.on("pointerdown",function(){t.scene.start(e.CST.SCENES.GAME),t.sound.stopAll()});var i=this.add.image(this.game.renderer.width/2,this.game.renderer.height-60,"REGISTER_BTN").setOrigin(.5,1);i.setInteractive(),i.on("pointerdown",function(){t.scene.start(e.CST.SCENES.GAME),t.sound.stopAll()})},n}(Phaser.Scene);exports.MenuScene=r;
},{"../CST":"mOOU"}],"lJBV":[function(require,module,exports) {
"use strict";var e=this&&this.__extends||function(){var e=function(t,s){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s])})(t,s)};return function(t,s){function i(){this.constructor=t}e(t,s),t.prototype=null===s?Object.create(s):(i.prototype=s.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../CST"),s=function(s){function i(){return s.call(this,{key:t.CST.SCENES.GAME})||this}return e(i,s),i.prototype.preload=function(){this.load.tilemapTiledJSON("map","./assets/maps/map.json"),this.anims.create({key:"PLAYER_ANIMATION",frameRate:4,frames:this.anims.generateFrameNames("PLAYER_SPRITEZ",{prefix:"player-",start:1,end:4,suffix:".png"}),repeat:-1}),this.anims.create({key:"PLAYER_ANIMATION_NORTH",frameRate:4,frames:this.anims.generateFrameNames("PLAYER_SPRITEZ",{prefix:"player-",start:1,end:4,suffix:".png",frames:[1]})}),this.anims.create({key:"PLAYER_ANIMATION_SOUTH",frameRate:4,frames:this.anims.generateFrameNames("PLAYER_SPRITEZ",{prefix:"player-",start:1,end:4,suffix:".png",frames:[3]})}),this.anims.create({key:"PLAYER_ANIMATION_EAST",frameRate:4,frames:this.anims.generateFrameNames("PLAYER_SPRITEZ",{prefix:"player-",start:1,end:4,suffix:".png",frames:[2]})}),this.anims.create({key:"PLAYER_ANIMATION_WEST",frameRate:4,frames:this.anims.generateFrameNames("PLAYER_SPRITEZ",{prefix:"player-",start:1,end:4,suffix:".png",frames:[4]})})},i.prototype.create=function(){var e=this,t=this.add.sprite(this.game.renderer.width-40-80,this.game.renderer.height-40,"GAMEPAD_A").setDepth(4).setOrigin(1,1);t.setDisplaySize(80,80),t.setScrollFactor(0);var s=this.add.sprite(this.game.renderer.width-40,this.game.renderer.height-40-80,"GAMEPAD_B").setDepth(4).setOrigin(1,1);s.setDisplaySize(80,80),s.setScrollFactor(0);var i=this.add.sprite(40,this.game.renderer.height-40-80,"GAMEPAD_X").setDepth(4).setOrigin(0,1);i.setDisplaySize(80,80),i.setScrollFactor(0);var r=this.add.sprite(120,this.game.renderer.height-40,"GAMEPAD_Y").setDepth(4).setOrigin(0,1);r.setDisplaySize(80,80),r.setScrollFactor(0);var a=this.add.tilemap("map"),n=a.addTilesetImage("terrain_atlas","TERRAIN_ATLAS"),h=(a.createStaticLayer("FirstLayer",[n],0,0).setDepth(0),a.createStaticLayer("SecondLayer",[n],0,0).setDepth(2));this.player=this.physics.add.sprite(100,100,"PLAYER_SPRITEZ","player-1.png").setScale(2).setDepth(1),this.player.body.collideWorldBounds=!0,this.physics.add.collider(this.player,h),h.setCollisionByProperty({collides:!0}),this.cameras.main.startFollow(this.player),this.cameras.main.setBounds(0,0,a.widthInPixels,a.heightInPixels),this.physics.world.setBounds(0,0,a.widthInPixels,a.heightInPixels),this.keyboard=this.input.keyboard.addKeys("W, S, A, D"),this.input.on("pointerdown",function(t){e.startX=t.x,e.startY=t.y}),this.input.on("pointerup",function(t){e.swipe={}}),this.swipe={}},i.prototype.update=function(e,t){var s=this.game.input.activePointer;this.swipe.direction&&this.physics.moveTo(this.player,s.worldX,s.worldY,120),s.isDown&&(s.x>this.startX+40&&(this.swipe.right=!0,this.swipe.direction="right"),s.x<this.startX-40&&(this.swipe.left=!0,this.swipe.direction="left"),s.y>this.startY+40&&(this.swipe.down=!0,this.swipe.direction="down"),s.y<this.startY-40&&(this.swipe.up=!0,this.swipe.direction="up")),this.keyboard.W.isDown&&(this.player.setVelocityY(-Math.abs(120)),this.player.play("PLAYER_ANIMATION_NORTH")),this.keyboard.S.isDown&&(this.player.setVelocityY(120),this.player.play("PLAYER_ANIMATION_SOUTH")),this.keyboard.A.isDown&&(this.player.setVelocityX(-Math.abs(120)),this.player.play("PLAYER_ANIMATION_WEST")),this.keyboard.D.isDown&&(this.player.setVelocityX(120),this.player.play("PLAYER_ANIMATION_EAST")),this.keyboard.W.isUp&&this.keyboard.S.isUp&&!s.isDown&&this.player.setVelocityY(0),this.keyboard.A.isUp&&this.keyboard.D.isUp&&!s.isDown&&this.player.setVelocityX(0)},i}(Phaser.Scene);exports.GameScene=s;
},{"../CST":"mOOU"}],"jP6t":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./scenes/LoadScene"),n=require("./scenes/MenuScene"),r=require("./scenes/GameScene"),a={type:Phaser.CANVAS,scale:{mode:Phaser.Scale.FIT,width:window.innerWidth/1.3,height:window.innerHeight/1.3},scene:[e.LoadScene,n.MenuScene,r.GameScene],physics:{default:"arcade",arcade:{debug:!0}},pixelArt:!0},c=new Phaser.Game(a);
},{"./scenes/LoadScene":"G1z3","./scenes/MenuScene":"OuKZ","./scenes/GameScene":"lJBV"}]},{},["jP6t"], null)
//# sourceMappingURL=/main.9de2291d.js.map