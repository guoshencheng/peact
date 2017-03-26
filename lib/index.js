import { setConfig, Container, Sprite, AnimatedSprite } from './PixiNativeBuilder';
import shortid from 'shortid';

const ComponentsMap = {
  'Container': Container,
  'Sprite': Sprite,
  'AnimatedSprite': AnimatedSprite
}

export function Component(props, context, renderer) {
  this.props = props;
  this.context = context;
  this.renderer = renderer;
};

Component.prototype.setState = function (state, callback) {
  this.updateStateToQueue(this, state);
};

Component.prototype.forceUpdate = function(callback) {

}

Component.prototype.reRenderChildren = function (reRender) {
  this.children.forEach(child => {
    reRender(child);
  });
}

export var CreateElement = function(component, props, children) {
  return {
    component, props, children
  }
}

var GeneratePixiElement = function (Element, Opt) {
  var component = Element.component;
  if (typeof component == "string") {
    return CreateNativePixiElement(Element, Opt);
  } else {
    return CreateCustomPixiElement(Element, Opt);
  }
}

var CreateNativePixiElement = function(Element, Opt) {
  if (!ComponentsMap[Element.component]) {
    console.warn(`Component named ${Element.component} is not supported`)
    return;
  }
  var pixiObject = ComponentsMap[Element.component](Element.props);
  if (Element.children) Element.children.map(function(child) {
    return GeneratePixiElement(child, Opt);
  }).forEach(function(child) {
    pixiObject.addChild(child);
  });
  return pixiObject;
};

var CreateCustomPixiElement = function(Element, Opt) {
  var { elementMap, setState } = Opt;
  var Component = Element.component;
  var component = new Component(Element.props);
  component.updateStateToQueue = setState;
  component.peact_id = shortid.generate();
  elementMap[component.peact_id] = component;
  if (component.willMount) {
    component.willMount();
  }
  var pixiObject = GeneratePixiElement(component.render(), Opt);
  if (Element.children) Element.children.map(function(child) {
    return GeneratePixiElement(child, Opt);
  }).forEach(function(child) {
    pixiObject.addChild(child);
  });
  component.pixiObject = pixiObject;
  return pixiObject;
};

var Renderer = function(updateQueue, elementMap) {
  if (!updateQueue) {
    console.warn("must init a update Queue")
    return;
  }

  function ReRenderElement(component, props, state) {
    var last = component.render();
    component.props = props;
    component.state = state;
    var current = component.render();
    if (last.component === current.component) {
      setConfig(component.pixiObject, current.props);
    }
  }

  return function() {
    if (updateQueue.length != 0) {
      updateQueue.forEach(item => {
        var { peact_id, state } = item;
        if (elementMap[peact_id] && elementMap[peact_id].state != state) {
          var component = elementMap[peact_id];
          ReRenderElement(component, component.props, state);
        }
      });
      while (updateQueue.length) {
        updateQueue.pop();
      }
    }
  }
};

export var Render = function(Element, App) {
  var elementMap = {};
  var updateQueue = [];
  var setState = function(element, state) {
    updateQueue.push({
      peact_id: element.peact_id, state
    })
    console.log(element, state);
  };
  var Opt = { elementMap, setState };
  var pixiObject = GeneratePixiElement(Element, Opt);
  if (App.stage) {
    App.stage.addChild(pixiObject);
    App.ticker.add(Renderer(updateQueue, elementMap));
  } else {
    console.warn(`${App} is not a PIXI App`);
  }
}
