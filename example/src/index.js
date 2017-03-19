/**
 * Created by guoshencheng on 18/03/2017.
 */

var PIXI = require('pixi');

import { Component, CreateElement, Render } from '../../lib';

class CustomItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props = {
      x: 12, y: 12
    }
    return CreateElement('Sprite', props, null)
  }
}

class CustomContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props = { x: 12, y: 12 };
    return CreateElement('Container', props, [
      CreateElement(CustomItem, null, null),
      CreateElement("Container", null, [
        CreateElement(CustomItem, null, null),
        CreateElement(CustomItem, null, null)
      ])
    ]);
  }
}

console.log(new CustomContainer().render());

var canvas = document.querySelector("#canvas");
var app = new PIXI.Application(640, 1136, {
  backgroundColor : 0x1099bb,
  view: canvas
});

Render(CreateElement(CustomContainer, null, null), app);
console.log(app)
