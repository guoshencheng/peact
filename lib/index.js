var PIXI = require('pixi');

const ComponentsMap = {
  'Container': PIXI.Container,
  'Sprite': PIXI.Sprite,
  'MovieClip': PIXI.MovieClip
}

export function Component(props, context, renderer) {
  this.props = props;
  this.context = context;
  this.renderer = renderer;
};

Component.prototype.setState = function (state, callback) {
  this.state = this.state || {}
  this.state = Object.assign({}, this.state, state)
};

Component.prototype.forceUpdate = function(callback) {

}

export var CreateElement = function(component, props, children) {
  return {
    component, props, children
  }
}

var GeneratePixiElement = function (Element) {
  var component = Element.component;
  if (typeof component == "string") {
    return CreateNativePixiElement(Element);
  } else {
    return CreateCustomPixiElement(Element);
  }
}

var CreateNativePixiElement = function(Element) {
  if (!ComponentsMap[Element.component]) {
    console.warn(`Component named ${Element.component} is not supported`)
    return;
  }
  var pixiObject = new ComponentsMap[Element.component];
  if (Element.children) Element.children.map(function(child) {
    return GeneratePixiElement(child);
  }).forEach(function(child) {
    pixiObject.addChild(child);
  })
  return pixiObject;
}

var CreateCustomPixiElement = function(Element) {
  var Component = Element.component;
  var component = new Component(Element.props);
  if (component.willMount) {
    component.willMount();
  }
  var pixiObject = GeneratePixiElement(component.render());
  if (Element.children) Element.children.map(function(child) {
    return GeneratePixiElement(child);
  }).forEach(function(child) {
    pixiObject.addChild(child);
  })
  return pixiObject;
}

export var Render = function(Element, App) {
  var pixiObject = GeneratePixiElement(Element);
  if (App.stage) {
    App.stage.addChild(pixiObject);
  } else {
    console.warn(`${App} is not a PIXI App`);
  }
}
