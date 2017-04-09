/**
 * Created by guoshencheng on 09/04/2017.
 */

var Component = require('./Component');
import { ComponentsMap } from './PixiNativeBuilder';
import shortid from 'shortid';

export var GeneratePixiElement = function (Element, Opt) {
  var type = Element.type;
  if (typeof type == "string") {
    return CreateNativePixiElement(Element, Opt);
  } else {
    return CreateCustomPixiElement(Element, Opt);
  }
}

export var CreateNativePixiElement = function(Element, Opt) {
  if (!ComponentsMap[Element.type]) {
    console.warn(`Component named ${Element.type} is not supported`)
    return;
  }
  var pixiObject = ComponentsMap[Element.type](Element.props);
  if (Element.props && Element.props.children) Element.props.children.map(function(child) {
    return GeneratePixiElement(child, Opt);
  }).forEach(function(child) {
    pixiObject.addChild(child);
  });
  return pixiObject;
};

export var CreateCustomPixiElement = function(Element, Opt) {
  var type = Element.type;
  var component = new type(Element.props);
  component.peact_id = shortid.generate();
  if (component.willMount) {
    component.willMount();
  }
  var pixiObject = GeneratePixiElement(component.render(), Opt);
  if (Element.props && Element.props.children) Element.props.children.map(function(child) {
    return GeneratePixiElement(child, Opt);
  }).forEach(function(child) {
    pixiObject.addChild(child);
  });
  return pixiObject;
};
