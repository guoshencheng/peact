export var CreateElement = require('./CreateElement');
export var Component = require('./Component');

var GeneratePixiElement = require('./RenderPixiElement').GeneratePixiElement;

export var Render = function(Element, App) {
  console.log(Element);
  var pixiObject = GeneratePixiElement(Element);
  if (App.stage) {
    App.stage.addChild(pixiObject);
    // App.ticker.add(Renderer(updateQueue, elementMap, Opt));
  } else {
    console.warn(`${App} is not a PIXI App`);
  }
};
