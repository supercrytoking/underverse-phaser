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
    SUPER_TILESET: 'super-tileset-extruded.png',
    GAMEPAD_A: 'gamepad-a.png',
    GAMEPAD_B: 'gamepad-b.png',
    GAMEPAD_X: 'gamepad-x.png',
    GAMEPAD_Y: 'gamepad-y.png'
  },
  AUDIO: {
    MENU_MUSIC: 'menu-music.mp3',
    CONFIRMATION_OO2: 'confirmation_002.mp3',
    QUESTION_004: 'question_004.mp3'
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
    this.load.atlas('PLAYER_SPRITEZ', 'player-animated-sprites.png', 'player-animated-sprites.json');
  };

  LoadScene.prototype.loadFonts = function () {
    this.load.setPath("./assets/fonts");
    this.load.bitmapFont('FONT_PRIMARY', 'game-over.png', 'game-over.fnt'); // this.load.bitmapFont('FONT_PRIMARY', 'vcr-osd-mono.png', 'vcr-osd-mono.fnt');
  };

  LoadScene.prototype.preload = function () {
    var _this = this;

    console.log('Loading...');
    this.loadImages();
    this.loadAudio();
    this.loadSprites();
    this.loadFonts();
    var loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x700000
      }
    });
    this.load.on('progress', function (percentage) {
      loadingBar.fillRect(0, 0, _this.game.renderer.width * percentage, _this.game.renderer.height);
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
},{"../CST":"src/CST.ts"}],"node_modules/phaser3-rex-plugins/plugins/utils/input/CursorKeys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Key = Phaser.Input.Keyboard.Key;

class CursorKeys {
  constructor() {
    this.cursorKeys = {
      up: new Key(),
      down: new Key(),
      left: new Key(),
      right: new Key()
    };
    this.noKeyDown = true;
  }

  createCursorKeys() {
    return this.cursorKeys;
  }

  setKeyState(keyName, isDown) {
    var key = this.cursorKeys[keyName];

    if (!key.enabled) {
      return this;
    }

    if (isDown) {
      this.noKeyDown = false;
    }

    if (key.isDown !== isDown) {
      fakeEvent.timeDown = Date.now();

      if (isDown) {
        key.onDown(fakeEvent);
      } else {
        key.onUp(fakeEvent);
      }
    }

    return this;
  }

  clearAllKeysState() {
    this.noKeyDown = true;

    for (var keyName in this.cursorKeys) {
      this.setKeyState(keyName, false);
    }

    return this;
  }

  getKeyState(keyName) {
    return this.cursorKeys[keyName];
  }

  get upKeyDown() {
    return this.cursorKeys.up.isDown;
  }

  get downKeyDown() {
    return this.cursorKeys.down.isDown;
  }

  get leftKeyDown() {
    return this.cursorKeys.left.isDown;
  }

  get rightKeyDown() {
    return this.cursorKeys.right.isDown;
  }

  get anyKeyDown() {
    return !this.noKeyDown;
  }

}

var fakeEvent = {
  altKey: false,
  ctrlKey: false,
  shiftKey: false,
  metaKey: false,
  location: 0
};
var _default = CursorKeys;
exports.default = _default;
},{}],"node_modules/phaser3-rex-plugins/plugins/utils/math/RadToDeg.js":[function(require,module,exports) {
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var RAD_TO_DEG = 180 / Math.PI;

/**
 * Convert the given angle in radians, to the equivalent angle in degrees.
 *
 * @function Phaser.Math.RadToDeg
 * @since 3.0.0
 *
 * @param {number} radians - The angle in radians to convert ot degrees.
 *
 * @return {integer} The given angle converted to degrees.
 */
var RadToDeg = function (radians)
{
    return radians * RAD_TO_DEG;
};

module.exports = RadToDeg;

},{}],"node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/Const.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'up&down': 0,
  'left&right': 1,
  '4dir': 2,
  '8dir': 3
};
exports.default = _default;
},{}],"node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/AngleToDirections.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var AngleToDirections = function (angle, dirMode, out) {
  if (out === undefined) {
    out = {};
  } else if (out === true) {
    out = tmpOut;
  }

  out.left = false;
  out.right = false;
  out.up = false;
  out.down = false;
  angle = (angle + 360) % 360;

  switch (dirMode) {
    case 0:
      // up & down
      if (angle < 180) {
        out.down = true;
      } else {
        out.up = true;
      }

      break;

    case 1:
      // left & right
      if (angle > 90 && angle <= 270) {
        out.left = true;
      } else {
        out.right = true;
      }

      break;

    case 2:
      // 4 dir
      if (angle > 45 && angle <= 135) {
        out.down = true;
      } else if (angle > 135 && angle <= 225) {
        out.left = true;
      } else if (angle > 225 && angle <= 315) {
        out.up = true;
      } else {
        out.right = true;
      }

      break;

    case 3:
      // 8 dir
      if (angle > 22.5 && angle <= 67.5) {
        out.down = true;
        out.right = true;
      } else if (angle > 67.5 && angle <= 112.5) {
        out.down = true;
      } else if (angle > 112.5 && angle <= 157.5) {
        out.down = true;
        out.left = true;
      } else if (angle > 157.5 && angle <= 202.5) {
        out.left = true;
      } else if (angle > 202.5 && angle <= 247.5) {
        out.left = true;
        out.up = true;
      } else if (angle > 247.5 && angle <= 292.5) {
        out.up = true;
      } else if (angle > 292.5 && angle <= 337.5) {
        out.up = true;
        out.right = true;
      } else {
        out.right = true;
      }

      break;
  }

  return out;
};

var tmpOut = {};
var _default = AngleToDirections;
exports.default = _default;
},{}],"node_modules/phaser3-rex-plugins/plugins/utils/input/VectorToCursorKeys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CursorKeys = _interopRequireDefault(require("./CursorKeys.js"));

var _RadToDeg = _interopRequireDefault(require("../math/RadToDeg.js"));

var _Const = _interopRequireDefault(require("../math/angle/angletodirections/Const.js"));

var _AngleToDirections = _interopRequireDefault(require("../math/angle/angletodirections/AngleToDirections.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GetValue = Phaser.Utils.Objects.GetValue;
const GetDist = Phaser.Math.Distance.Between;
const GetAngle = Phaser.Math.Angle.Between;

class VectorToCursorKeys extends _CursorKeys.default {
  constructor(config) {
    super();
    this.resetFromJSON(config);
  }

  resetFromJSON(o) {
    if (this.start == undefined) {
      this.start = {};
    }

    if (this.end == undefined) {
      this.end = {};
    }

    this.setEnable(GetValue(o, 'enable', true));
    this.setMode(GetValue(o, 'dir', '8dir'));
    this.setDistanceThreshold(GetValue(o, 'forceMin', 16));
    var startX = GetValue(o, "start.x", null);
    var startY = GetValue(o, "start.y", null);
    var endX = GetValue(o, "end.x", null);
    var endY = GetValue(o, "end.y", null);
    this.setVector(startX, startY, endX, endY);
    return this;
  }

  toJSON() {
    return {
      enable: this.enable,
      dir: this.dirMode,
      forceMin: this.forceMin,
      start: {
        x: this.start.x,
        y: this.start.y
      },
      end: {
        x: this.end.x,
        y: this.end.y
      }
    };
  }

  setMode(m) {
    if (typeof m === 'string') {
      m = _Const.default[m];
    }

    this.dirMode = m;
    return this;
  }

  setEnable(e) {
    if (e == undefined) {
      e = true;
    } else {
      e = !!e;
    }

    if (e === this.enable) {
      return;
    }

    if (e === false) {
      this.clearVector();
    }

    this.enable = e;
    return this;
  }

  setDistanceThreshold(d) {
    if (d < 0) {
      d = 0;
    }

    this.forceMin = d;
    return this;
  }

  clearVector() {
    this.start.x = 0;
    this.start.y = 0;
    this.end.x = 0;
    this.end.y = 0;
    this.clearAllKeysState();
    return this;
  }

  setVector(x0, y0, x1, y1) {
    this.clearVector();

    if (!this.enable) {
      return this;
    }

    if (x0 === null) {
      return this;
    }

    if (x1 === undefined) {
      x1 = x0;
      x0 = 0;
      y1 = y0;
      y0 = 0;
    }

    this.start.x = x0;
    this.start.y = y0;
    this.end.x = x1;
    this.end.y = y1;

    if (this.forceMin > 0 && this.force < this.forceMin) {
      return this;
    }

    var dirStates = (0, _AngleToDirections.default)(this.angle, this.dirMode, true);

    for (var dir in dirStates) {
      if (dirStates[dir]) {
        this.setKeyState(dir, true);
      }
    }

    return this;
  }

  get forceX() {
    return this.end.x - this.start.x;
  }

  get forceY() {
    return this.end.y - this.start.y;
  }

  get force() {
    return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  get rotation() {
    return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  get angle() {
    return (0, _RadToDeg.default)(this.rotation); // -180 ~ 180
  }

  get octant() {
    var octant = 0;

    if (this.rightKeyDown) {
      octant = this.downKeyDown ? 45 : 0;
    } else if (this.downKeyDown) {
      octant = this.leftKeyDown ? 135 : 90;
    } else if (this.leftKeyDown) {
      octant = this.upKeyDown ? 225 : 180;
    } else if (this.upKeyDown) {
      octant = this.rightKeyDown ? 315 : 270;
    }

    return octant;
  }

}

var _default = VectorToCursorKeys;
exports.default = _default;
},{"./CursorKeys.js":"node_modules/phaser3-rex-plugins/plugins/utils/input/CursorKeys.js","../math/RadToDeg.js":"node_modules/phaser3-rex-plugins/plugins/utils/math/RadToDeg.js","../math/angle/angletodirections/Const.js":"node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/Const.js","../math/angle/angletodirections/AngleToDirections.js":"node_modules/phaser3-rex-plugins/plugins/utils/math/angle/angletodirections/AngleToDirections.js"}],"node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  setEventEmitter(eventEmitter, EventEmitterClass) {
    if (EventEmitterClass === undefined) {
      EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
    }

    this._privateEE = eventEmitter === undefined;
    this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
    return this;
  },

  destroyEventEmitter() {
    if (this._eventEmitter && this._privateEE) {
      this._eventEmitter.shutdown();
    }

    return this;
  },

  getEventEmitter() {
    return this._eventEmitter;
  },

  on: function () {
    if (this._eventEmitter) {
      this._eventEmitter.on.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  once: function () {
    if (this._eventEmitter) {
      this._eventEmitter.once.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  off: function () {
    if (this._eventEmitter) {
      this._eventEmitter.off.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  emit: function (event) {
    if (this._eventEmitter && event) {
      this._eventEmitter.emit.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  addListener: function () {
    if (this._eventEmitter) {
      this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  removeListener: function () {
    if (this._eventEmitter) {
      this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  removeAllListeners: function () {
    if (this._eventEmitter) {
      this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
    }

    return this;
  },
  listenerCount: function () {
    if (this._eventEmitter) {
      return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
    }

    return 0;
  },
  listeners: function () {
    if (this._eventEmitter) {
      return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
    }

    return [];
  }
};
exports.default = _default;
},{}],"node_modules/phaser3-rex-plugins/plugins/input/touchcursor/TouchCursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VectorToCursorKeys = _interopRequireDefault(require("../../utils/input/VectorToCursorKeys.js"));

var _EventEmitterMethods = _interopRequireDefault(require("../../utils/eventemitter/EventEmitterMethods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GetValue = Phaser.Utils.Objects.GetValue;
const CircleClass = Phaser.Geom.Circle;
const CircleContains = Phaser.Geom.Circle.Contains;

class TouchCursor extends _VectorToCursorKeys.default {
  constructor(gameObject, config) {
    super(config); //this.resetFromJSON(config); // this function had been called in super(config)
    // Event emitter

    var eventEmitter = GetValue(config, 'eventEmitter', undefined);
    var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
    this.setEventEmitter(eventEmitter, EventEmitterClass);
    this.scene = gameObject.scene;
    this.gameObject = gameObject;
    this.radius = GetValue(config, 'radius', 100);
    gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, this.radius), CircleContains);
    this.boot();
  }

  resetFromJSON(o) {
    super.resetFromJSON(o);
    this.pointer = undefined;
    return this;
  }

  toJSON() {
    var o = super.toJSON();
    o.radius = this.radius;
    return o;
  }

  boot() {
    this.gameObject.on('pointerdown', this.onKeyDownStart, this);
    this.gameObject.on('pointerover', this.onKeyDownStart, this);
    this.scene.input.on('pointermove', this.onKeyDown, this);
    this.scene.input.on('pointerup', this.onKeyUp, this);
    this.gameObject.on('destroy', this.destroy, this);
  }

  shutdown() {
    if (this.scene) {
      this.scene.input.off('pointermove', this.onKeyDown, this);
      this.scene.input.off('pointerup', this.onKeyUp, this);
    } // gameObject events will be removed when this gameObject destroyed 


    this.destroyEventEmitter();
    this.pointer = undefined;
    this.scene = undefined;
    this.gameObject = undefined;
  }

  destroy() {
    this.shutdown();
  }

  onKeyDownStart(pointer) {
    if (!pointer.isDown || this.pointer !== undefined) {
      return;
    }

    this.pointer = pointer;
    this.onKeyDown(pointer);
  }

  onKeyDown(pointer) {
    if (this.pointer !== pointer) {
      return;
    }

    var p0 = this.gameObject,
        p1 = pointer;
    this.setVector(p0.x, p0.y, p1.x, p1.y);
    this.emit('update');
  }

  onKeyUp(pointer) {
    if (this.pointer !== pointer) {
      return;
    }

    this.pointer = undefined;
    this.clearVector();
    this.emit('update');
  }

}

Object.assign(TouchCursor.prototype, _EventEmitterMethods.default);
var _default = TouchCursor;
exports.default = _default;
},{"../../utils/input/VectorToCursorKeys.js":"node_modules/phaser3-rex-plugins/plugins/utils/input/VectorToCursorKeys.js","../../utils/eventemitter/EventEmitterMethods.js":"node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js"}],"node_modules/phaser3-rex-plugins/plugins/touchcursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TouchCursor = _interopRequireDefault(require("./input/touchcursor/TouchCursor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _TouchCursor.default;
exports.default = _default;
},{"./input/touchcursor/TouchCursor.js":"node_modules/phaser3-rex-plugins/plugins/input/touchcursor/TouchCursor.js"}],"node_modules/phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _touchcursor = _interopRequireDefault(require("../../touchcursor.js"));

var _EventEmitterMethods = _interopRequireDefault(require("../../utils/eventemitter/EventEmitterMethods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GetValue = Phaser.Utils.Objects.GetValue;

class VirtualJoyStick {
  constructor(scene, config) {
    if (config === undefined) {
      config = {};
    } // Event emitter


    var eventEmitter = GetValue(config, 'eventEmitter', undefined);
    var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
    this.setEventEmitter(eventEmitter, EventEmitterClass);
    config.eventEmitter = this.getEventEmitter();
    this.scene = scene;
    this.base = undefined;
    this.thumb = undefined;
    this.touchCursor = undefined;
    this.setRadius(GetValue(config, 'radius', 100));
    this.addBase(GetValue(config, 'base', undefined), config);
    this.addThumb(GetValue(config, 'thumb', undefined));
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    this.base.setPosition(x, y);
    this.thumb.setPosition(x, y);

    if (GetValue(config, 'fixed', true)) {
      this.setScrollFactor(0);
    }

    this.boot();
  }

  destroy() {
    this.destroyEventEmitter();
    this.base.destroy(); // Also destroy touchCursor behavior

    this.thumb.destroy();
    this.base = undefined;
    this.thumb = undefined;
    this.touchCursor = undefined;
  }

  createCursorKeys() {
    return this.touchCursor.createCursorKeys();
  }

  get forceX() {
    return this.touchCursor.forceX;
  }

  get forceY() {
    return this.touchCursor.forceY;
  }

  get force() {
    return this.touchCursor.force;
  }

  get rotation() {
    return this.touchCursor.rotation;
  }

  get angle() {
    return this.touchCursor.angle; // -180 ~ 180
  }

  get up() {
    return this.touchCursor.upKeyDown;
  }

  get down() {
    return this.touchCursor.downKeyDown;
  }

  get left() {
    return this.touchCursor.leftKeyDown;
  }

  get right() {
    return this.touchCursor.rightKeyDown;
  }

  get noKey() {
    return this.touchCursor.noKeyDown;
  }

  get pointerX() {
    return this.touchCursor.end.x;
  }

  get pointerY() {
    return this.touchCursor.end.y;
  }

  get pointer() {
    return this.touchCursor.pointer;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  set x(x) {
    this.base.x = x;
  }

  set y(y) {
    this.base.y = y;
  }

  get x() {
    return this.base.x;
  }

  get y() {
    return this.base.y;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  get visible() {
    return this.base.visible;
  }

  set visible(visible) {
    this.base.visible = visible;
    this.thumb.visible = visible;
  }

  setEnable(value) {
    this.enable = value;
    return this;
  }

  toggleEnabl() {
    this.enable = !this.enable;
  }

  get enable() {
    return this.touchCursor.enable;
  }

  set enable(value) {
    this.touchCursor.setEnable(value);
  }

  setRadius(radius) {
    this.radius = radius;
    return this;
  }

  setVisible(visible) {
    this.visible = visible;
    return this;
  }

  addBase(gameObject, config) {
    if (this.base) {
      this.base.destroy(); // Also destroy touchCursor behavior
    }

    if (gameObject === undefined) {
      gameObject = this.scene.add.circle(0, 0, this.radius).setStrokeStyle(3, 0x0000ff);
    }

    this.touchCursor = new _touchcursor.default(gameObject, config);
    this.base = gameObject;
    return this;
  }

  addThumb(gameObject) {
    if (this.thumb) {
      this.thumb.destroy();
    }

    if (gameObject === undefined) {
      gameObject = this.scene.add.circle(0, 0, 40).setStrokeStyle(3, 0x00ff00);
    }

    this.thumb = gameObject;
    return this;
  }

  setScrollFactor(scrollFactor) {
    this.base.setScrollFactor(scrollFactor);
    this.thumb.setScrollFactor(scrollFactor);
  }

  boot() {
    this.touchCursor.on('update', this.update, this);
  }

  update() {
    var touchCursor = this.touchCursor;

    if (touchCursor.anyKeyDown) {
      if (touchCursor.force > this.radius) {
        var rad = touchCursor.rotation;
        this.thumb.x = touchCursor.start.x + Math.cos(rad) * this.radius;
        this.thumb.y = touchCursor.start.y + Math.sin(rad) * this.radius;
      } else {
        this.thumb.x = touchCursor.end.x;
        this.thumb.y = touchCursor.end.y;
      }
    } else {
      this.thumb.x = this.base.x;
      this.thumb.y = this.base.y;
    }

    return this;
  }

}

Object.assign(VirtualJoyStick.prototype, _EventEmitterMethods.default);
var _default = VirtualJoyStick;
exports.default = _default;
},{"../../touchcursor.js":"node_modules/phaser3-rex-plugins/plugins/touchcursor.js","../../utils/eventemitter/EventEmitterMethods.js":"node_modules/phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitterMethods.js"}],"node_modules/phaser3-rex-plugins/plugins/virtualjoystick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VirtualJoyStick = _interopRequireDefault(require("./input/virtualjoystick/VirtualJoyStick.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _VirtualJoyStick.default;
exports.default = _default;
},{"./input/virtualjoystick/VirtualJoyStick.js":"node_modules/phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick.js"}],"src/DigitalGamepad.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DigitalGamepad =
/** @class */
function () {
  function DigitalGamepad(scene) {
    this.scene = scene;
    this.buttonPadding = 40;
    this.buttonMargin = 80;
    this.buttonSize = 80;

    if (scene.game.renderer.width <= 600) {
      this.buttonPadding = 20;
      this.buttonMargin = 40;
      this.buttonSize = 40;
    }
  }

  DigitalGamepad.prototype.load = function () {
    this.aButton = this.scene.add.sprite(this.scene.game.renderer.width - this.buttonPadding - this.buttonMargin, this.scene.game.renderer.height - this.buttonPadding, 'GAMEPAD_A').setDepth(4).setOrigin(1, 1);
    this.aButton.setDisplaySize(this.buttonSize, this.buttonSize);
    this.aButton.setScrollFactor(0);
    this.aButton.setInteractive();
    this.bButton = this.scene.add.sprite(this.scene.game.renderer.width - this.buttonPadding, this.scene.game.renderer.height - this.buttonPadding - this.buttonMargin, 'GAMEPAD_B').setDepth(4).setOrigin(1, 1);
    this.bButton.setDisplaySize(this.buttonSize, this.buttonSize);
    this.bButton.setScrollFactor(0);
    this.bButton.setInteractive();
  };

  Object.defineProperty(DigitalGamepad.prototype, "size", {
    get: function get() {
      return this.buttonSize;
    },
    set: function set(x) {
      this.buttonSize = x;
    },
    enumerable: true,
    configurable: true
  });
  return DigitalGamepad;
}();

exports.DigitalGamepad = DigitalGamepad;
},{}],"src/Utils.js":[function(require,module,exports) {
exports.addSpeechModal = function (scene, string) {
  if (scene.inSpeech) return;
  scene.inSpeech = true;
  var screenWidth = scene.game.renderer.width;
  var screenHeight = scene.game.renderer.height;
  var height = screenHeight / 4;
  var margin = 50;
  var padding = 20;
  var fontSize = 75;
  var actionKey = scene.input.keyboard.addKey('Q');

  if (screenWidth <= 600) {
    margin = 20;
    padding = 10;
    fontSize = 50;
  }

  scene.sound.play('CONFIRMATION_OO2', {
    volume: 0.01
  });

  var openSpeech = function openSpeech(string) {
    if (!string.length) {
      scene.inSpeech = false;
      return;
    }

    var speechBox = scene.add.rectangle(margin, screenHeight - margin, screenWidth - margin * 2, height, 0x000000).setOrigin(0, 1).setDepth(10).setScrollFactor(0).setAlpha(0.5);
    var speechBoxText = scene.add.bitmapText(margin + padding, screenHeight - height - margin + padding, 'FONT_PRIMARY', string[0]).setDepth(10).setMaxWidth(screenWidth - 120).setFontSize(fontSize).setScrollFactor(0);
    speechBox.setInteractive();

    var destroySpeech = function destroySpeech() {
      scene.sound.play('QUESTION_004', {
        volume: 0.01
      });
      speechBox.destroy();
      speechBoxText.destroy();

      if (string.length) {
        string.shift();
        openSpeech(string);
      }
    };

    speechBox.on('pointerdown', function () {
      destroySpeech();
    });
    actionKey.once('down', function () {
      destroySpeech();
    });
  };

  openSpeech(string);
};
},{}],"src/scenes/GameScene.ts":[function(require,module,exports) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var virtualjoystick_js_1 = __importDefault(require("phaser3-rex-plugins/plugins/virtualjoystick.js"));

var DigitalGamepad_1 = require("../DigitalGamepad");

var Utils = require('../Utils');

var GameScene =
/** @class */
function (_super) {
  __extends(GameScene, _super);

  function GameScene() {
    var _this = _super.call(this, {
      key: CST_1.CST.SCENES.GAME
    }) || this;

    _this.inSpeech = false;

    _this.create = function () {
      // Utils.loadGamepad(this);
      // Utils.addSpeechModal(this, ['Nice, it works!', `When you get close and press Q, I'll talk to you.`]);
      var gamepad = new DigitalGamepad_1.DigitalGamepad(_this);
      gamepad.load();
      gamepad.aButton.on('pointerdown', function () {
        if (Phaser.Math.Distance.Between(_this.player.x, _this.player.y, _this.npc.x, _this.npc.y) < 50) {
          console.log('CLOSE!');
          Utils.addSpeechModal(_this, ['Nice, it works!', "When you get close and press Q, I'll talk to you."]);
        } else {
          console.log('FAR!');
        }
      }); // Create Joystick

      var joystickBase = _this.add.circle(0, 0, 50, 0xFFFFFF, 0.1).setDepth(10);

      var joystickThumb = _this.add.circle(0, 0, 25, 0xFFFFFF, 0.1).setDepth(10);

      _this.joystick = new virtualjoystick_js_1.default(_this, {
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
      var joystickMoved = 0;

      _this.joystick.on('update', function () {
        if (_this.joystick.force >= 200) {
          joystickMoved++;
          _this.joystick.x = _this.joystick.pointerX;
          _this.joystick.y = _this.joystick.pointerY;
        }

        if (joystickMoved >= 1) {
          _this.speed = 240;
          joystickBase.fillColor = 0xFF0000;
        } else {
          _this.speed = 120;
        }
      });

      var joystickArea = _this.add.rectangle(0, 0, window.innerWidth / 2, window.innerHeight, 0xFF0000, 0).setScrollFactor(0).setDepth(4).setOrigin(0, 0);

      joystickArea.setInteractive();
      joystickArea.on('pointerdown', function (pointer) {
        // Enable joystick on clickdown.
        _this.joystick.x = pointer.x;
        _this.joystick.y = pointer.y;
        _this.joystick.enable = true;
      });

      _this.input.on('pointerup', function (pointer) {
        // Disable joystick on clickup.
        _this.stopMovement(); // this.joystick.enable = false;


        joystickMoved = 0;
        joystickBase.fillColor = 0xFFFFFF;
      }); // Create a map, terrain, and layers.


      var map = _this.add.tilemap('map');

      var tileset = map.addTilesetImage('super-tileset', 'SUPER_TILESET', 32, 32, 1, 2);
      var floorLayer = map.createDynamicLayer('FloorLayer', [tileset], 0, 0);
      var grassLayer = map.createDynamicLayer('GrassLayer', [tileset], 0, 0);
      var layerTwo = map.createDynamicLayer('LayerTwo', [tileset], 0, 0).setDepth(2); // Create the player.

      var spawnPoint = map.findObject("Objects", function (obj) {
        return obj.name === "Spawn";
      });
      _this.player = _this.physics.add.sprite(map.tileToWorldX(22), map.tileToWorldY(72), 'PLAYER_SPRITEZ', 'player-20.png').setDepth(2); // this.player = this.physics.add.sprite(spawnPoint.x + (Math.random() * 100), spawnPoint.y + (Math.random() * 100), 'PLAYER_SPRITEZ', 'player-20.png').setDepth(2);
      // this.player = this.physics.add.sprite(100, 100, 'PLAYER_SPRITEZ', 'player-20.png').setDepth(2);

      _this.player.body.setSize(_this.player.body.width * 0.6, _this.player.body.height * 0.6, true);

      _this.player.body.setOffset(_this.player.body.width * 0.4, _this.player.body.height * 0.6, true);

      _this.player.setScale(2);

      _this.npc = _this.physics.add.sprite(map.tileToWorldX(20), map.tileToWorldY(72), 'PLAYER_SPRITEZ');

      _this.physics.add.collider(_this.player, _this.npc);

      _this.npc.setImmovable(true); // Enabled colliding with objects in the top layer where collides = true.


      _this.physics.add.collider(_this.player, layerTwo);

      layerTwo.setCollisionByProperty({
        collides: true
      }); // Lock the camera and set the bounds.

      _this.player.body.collideWorldBounds = true;

      _this.cameras.main.startFollow(_this.player, true, 0.05, 0.05);

      _this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      _this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Keyboard handling...


      _this.keyboard = _this.input.keyboard.addKeys('W, S, A, D');

      for (var i in _this.keyboard) {
        eval("this.keyboard." + i).on('up', function (e) {
          _this.stopMovement();
        });
      }

      var actionKey = _this.input.keyboard.addKey('Q');

      actionKey.on('down', function (e) {
        if (Phaser.Math.Distance.Between(_this.player.x, _this.player.y, _this.npc.x, _this.npc.y) < 50) {
          console.log('CLOSE!');
          Utils.addSpeechModal(_this, ['Nice, it works!', "When you get close and press Q, I'll talk to you."]);
        } else {
          console.log('FAR!');
        }
      });
      _this.speed = 120;

      var shiftKey = _this.input.keyboard.addKey('SHIFT');

      shiftKey.on('down', function (event) {
        _this.speed = 240;
      });
      shiftKey.on('up', function (event) {
        _this.speed = 120;
      });

      var tabKey = _this.input.keyboard.addKey('TAB');

      tabKey.on('down', function (event) {
        _this.speed = 540;
      });
      tabKey.on('up', function (event) {
        _this.speed = 120;
      });
    };

    _this.moveNorth = function () {
      _this.player.body.velocity.y = -Math.abs(_this.speed);

      _this.player.play('PLAYER_ANIMATION_NORTH', true);
    };

    _this.moveSouth = function () {
      _this.player.body.velocity.y = _this.speed;

      _this.player.play('PLAYER_ANIMATION_SOUTH', true);
    };

    _this.moveWest = function () {
      _this.player.body.velocity.x = -Math.abs(_this.speed);

      _this.player.play('PLAYER_ANIMATION_WEST', true);
    };

    _this.moveEast = function () {
      _this.player.body.velocity.x = _this.speed;

      _this.player.play('PLAYER_ANIMATION_EAST', true);
    };

    _this.stopMovement = function () {
      _this.player.anims.stop();

      _this.player.body.velocity.x = 0;
      _this.player.body.velocity.y = 0; // this.speed = 120;
    };

    return _this;
  }

  GameScene.prototype.preload = function () {
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
  };

  GameScene.prototype.update = function (time, delta) {
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
  };

  return GameScene;
}(Phaser.Scene);

exports.GameScene = GameScene;
},{"../CST":"src/CST.ts","phaser3-rex-plugins/plugins/virtualjoystick.js":"node_modules/phaser3-rex-plugins/plugins/virtualjoystick.js","../DigitalGamepad":"src/DigitalGamepad.ts","../Utils":"src/Utils.js"}],"src/main.ts":[function(require,module,exports) {
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
    // mode: Phaser.Scale.FIT,
    width: window.innerWidth,
    height: window.innerHeight
  },
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, GameScene_1.GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: true
    }
  }
};
var game = new Phaser.Game(config);
window.addEventListener('resize', function (event) {
  game.scale.resize(window.innerWidth, window.innerHeight);
}, false);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55612" + '/');

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