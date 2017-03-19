const ComponentsMap = {
  'Container': PIXI.Container,
  'Sprite': PIXI.Sprite,
  'MovieClip': PIXI.MovieClip
}


var CreateElement = function(component, props, children) {
  return {
    component, props, children
  }
}

var GeneratePixiElement = function (Element) {
  var component = Element.component;
  if (component instanceof String) {
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
  return pixiObject;
}

var CreateCustomPixiElement = function(Element) {
  var Component = Element.component;
  var component = new Component(Element.props);
  if (component.willMount) {
    component.willMount();
  }
  var pixiObject = GeneratePixiElement(component.render());
  return pixiObject;
}

var Render = function(Element, App) {
  var pixiObject = GeneratePixiElement(Element);
  if (App.addChid) {
    App.addChid(pixiObject);
  } else {
    console.warn(`${App} is not a PixiObject`);
  }
}