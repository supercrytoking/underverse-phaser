// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = {
  SCENES: {
    LOAD: 'LOAD',
    MENU: 'MENU',
    GAME: 'GAME'
  },
  IMAGES: {
    MENU_BG: 'menu-background.png',
    LOGIN_BTN: 'login-button.png',
    REGISTER_BTN: 'register-button.png',
    PLAYER: 'player.png',
    TERRAIN_ATLAS: 'terrain_atlas.png',
    GAMEPAD_A: 'gamepad-a.png',
    GAMEPAD_B: 'gamepad-b.png',
    GAMEPAD_X: 'gamepad-x.png',
    GAMEPAD_Y: 'gamepad-y.png'
  },
  AUDIO: {
    MENU_MUSIC: 'menu-music.mp3'
  }
};
},{}],"src/scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: 'CST.SCENES.LOAD'
    }) || this;
  }

  LoadScene.prototype.loadImages = function () {
    this.load.setPath("./assets/img");

    for (var i in CST_1.CST.IMAGES) {
      // console.log(`${i}, ${CST.IMAGES[i]}`);
      this.load.image(i, CST_1.CST.IMAGES[i]);
    }
  };

  LoadScene.prototype.loadAudio = function () {
    this.load.setPath("./assets/audio");

    for (var i in CST_1.CST.AUDIO) {
      // console.log(`${i}, ${CST.AUDIO[i]}`);
      this.load.audio(i, CST_1.CST.AUDIO[i]);
    }
  };

  LoadScene.prototype.loadSprites = function () {
    this.load.setPath("./assets/sprites");
    this.load.atlas('PLAYER_SPRITEZ', 'player-sprites.png', 'player-sprites.json');
  };

  LoadScene.prototype.preload = function () {
    var _this = this;

    console.log('Loading...');
    this.loadImages();
    this.loadAudio();
    this.loadSprites();
    var loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x700000
      }
    });
    this.load.on('progress', function (percentage) {
      loadingBar.fillRect(0, _this.game.renderer.height - 20, _this.game.renderer.width * percentage, 20);
    });
    this.load.on('complete', function () {
      _this.scene.start(CST_1.CST.SCENES.MENU); // this.scene.start(CST.SCENES.GAME);

    });
    this.load.on('load', function (file) {
      console.log("Loaded " + file.key + ".");
    });
  };

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.ts"}],"src/scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.preload = function () {};

  MenuScene.prototype.create = function () {
    var _this = this;

    this.sound.play('MENU_MUSIC', {
      loop: true
    });
    this.bg = this.add.image(0, 0, 'MENU_BG').setOrigin(0);
    this.bg.alpha = 0.2;
    this.bg.displayWidth = this.game.renderer.width;
    this.bg.displayHeight = this.game.renderer.height;
    var opacityTimer = setInterval(function () {
      if (_this.bg.alpha == 1) clearInterval(opacityTimer); // console.log(`Menu opacity: ${this.bg.alpha}`);

      _this.bg.alpha = _this.bg.alpha + 0.01;
    }, 300);
    var loginButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 20, 'LOGIN_BTN').setOrigin(0.5, 1);
    loginButton.setInteractive();
    loginButton.on('pointerdown', function () {
      _this.scene.start(CST_1.CST.SCENES.GAME);

      _this.sound.stopAll();
    });
    var registerButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 60, 'REGISTER_BTN').setOrigin(0.5, 1);
    registerButton.setInteractive();
    registerButton.on('pointerdown', function () {
      _this.scene.start(CST_1.CST.SCENES.GAME);

      _this.sound.stopAll();
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.ts"}],"src/scenes/GameScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var GameScene =
/** @class */
function (_super) {
  __extends(GameScene, _super);

  function GameScene() {
    var _this = _super.call(this, {
      key: CST_1.CST.SCENES.GAME
    }) || this;

    _this.speed = 200;

    _this.moveNorth = function () {
      _this.player.setVelocityY(-Math.abs(_this.speed));

      _this.player.play('PLAYER_ANIMATION_NORTH');
    };

    _this.moveSouth = function () {
      _this.player.setVelocityY(_this.speed);

      _this.player.play('PLAYER_ANIMATION_SOUTH');
    };

    _this.moveWest = function () {
      _this.player.setVelocityX(-Math.abs(_this.speed));

      _this.player.play('PLAYER_ANIMATION_WEST');
    };

    _this.moveEast = function () {
      _this.player.setVelocityX(_this.speed);

      _this.player.play('PLAYER_ANIMATION_EAST');
    };

    return _this;
  }

  GameScene.prototype.preload = function () {
    this.load.tilemapTiledJSON('map', './assets/maps/map.json');
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
  };

  GameScene.prototype.create = function () {
    var _this = this; // Create a map, terrain, and layers.


    var map = this.add.tilemap('map');
    var terrain = map.addTilesetImage('terrain_atlas', 'TERRAIN_ATLAS');
    var bottomLayer = map.createStaticLayer('FirstLayer', [terrain], 0, 0).setDepth(0);
    var topLayer = map.createStaticLayer('SecondLayer', [terrain], 0, 0).setDepth(2); // Create the player.

    this.player = this.physics.add.sprite(100, 100, 'PLAYER_SPRITEZ', 'player-3.png').setScale(2).setDepth(1); // Enabled colliding with objects in the top layer where collides = true.

    this.player.body.collideWorldBounds = true;
    this.physics.add.collider(this.player, topLayer);
    topLayer.setCollisionByProperty({
      collides: true
    }); // Lock the camera and set the bounds.

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Create the on-screen buttons used in mobile.
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

    this.keyboard = this.input.keyboard.addKeys('W, S, A, D');
    this.input.on('pointerdown', function (pointer) {
      _this.startX = pointer.x;
      _this.startY = pointer.y;
    });
    this.swipe = {};
    this.input.on('pointerup', function (pointer) {
      _this.swipe = {};
    });
  };

  GameScene.prototype.update = function (time, delta) {
    // Player movement.
    var pointer = this.game.input.activePointer;
    var threshold = 40;

    if (this.swipe.direction) {
      this.physics.moveTo(this.player, pointer.worldX, pointer.worldY, this.speed);
    }

    if (pointer.isDown) {
      console.log(this.swipe); // console.log(`Start: ${this.startX} ${this.startY}, Current: ${pointer.x} ${pointer.y}`);

      if (pointer.x > this.startX + threshold) {
        this.swipe.right = true;
        this.swipe.direction = 'right';
      }

      if (pointer.x < this.startX - threshold) {
        this.swipe.left = true;
        this.swipe.direction = 'left';
      }

      if (pointer.y > this.startY + threshold) {
        this.swipe.down = true;
        this.swipe.direction = 'down';
      }

      if (pointer.y < this.startY - threshold) {
        this.swipe.up = true;
        this.swipe.direction = 'up';
      }
    } // WSAD movement.


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
    } // Movement reset.


    if (this.keyboard.W.isUp && this.keyboard.S.isUp && !pointer.isDown) {
      this.player.setVelocityY(0);
    }

    if (this.keyboard.A.isUp && this.keyboard.D.isUp && !pointer.isDown) {
      this.player.setVelocityX(0);
    }
  };

  return GameScene;
}(Phaser.Scene);

exports.GameScene = GameScene;
},{"../CST":"src/CST.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoadScene_1 = require("./scenes/LoadScene");

var MenuScene_1 = require("./scenes/MenuScene");

var GameScene_1 = require("./scenes/GameScene");

var config = {
  type: Phaser.CANVAS,
  scale: {
    mode: Phaser.Scale.FIT,
    width: window.innerWidth / 1.3,
    height: window.innerHeight / 1.3
  },
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, GameScene_1.GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  pixelArt: true
};
var game = new Phaser.Game(config);
},{"./scenes/LoadScene":"src/scenes/LoadScene.ts","./scenes/MenuScene":"src/scenes/MenuScene.ts","./scenes/GameScene":"src/scenes/GameScene.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56013" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map