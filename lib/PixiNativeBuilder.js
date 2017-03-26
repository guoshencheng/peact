/**
 * Created by guoshencheng on 26/03/2017.
 */

var onClick = (target, action) => {
  target.interactive = true;
  target.on("touchstart", function () {
    action(arguments)
  })
  console.log(111);
};

var events = {
  onClick
};


export var setConfig = (obj, props) => {
  Object.keys(props).map(key => {
    return {
      keys: key.split('.'),
      value: props[key]
    }
  }).forEach(kv => {
    var { keys, value } = kv;
    if (keys.length == 1) {
      if (events[keys[0]]) {
        var event = events[keys[0]];
        event(obj, value);
      } else {
        obj[keys[0]] = value;
      }
    } else {
      var current
      keys.forEach((key, index) => {
        if (index == keys.length - 1) {
          current[key] = value;
        } else {
          current = current ? current[key] : obj[key];
        }
      })
    }
  })
};

export var Container = (props) => {
  var config = Object.assign({}, props);
  var container = new PIXI.Container();
  setConfig(container, config);
  return container;
};

export var Sprite = (props) => {
  var config = Object.assign({}, props);
  var textures = config.textures;
  delete config.textures;
  var sprite = new PIXI.Sprite(textures);
  setConfig(sprite, config);
  return sprite;
};

export var AnimatedSprite = (props) => {
  var config = Object.assign({}, props);
  var textures = config.textures;
  delete config.textures;
  var animatedSprite = new PIXI.extras.AnimatedSprite(textures);
  console.log(animatedSprite);
  setConfig(animatedSprite, config);
  animatedSprite.play();
  return animatedSprite
};
