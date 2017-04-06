/**
 * Created by guoshencheng on 18/03/2017.
 */

import CreateElement from '../../lib/CreateElement';
import { Component, Render } from '../../lib';
import React from 'react';

class CustomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0.3
    }
  }

  render() {
    var { scale } = this.state;
    var onClickItem = () => {
      this.setState({
        scale: 0.4
      })
    }
    var textures = PIXI.Texture.fromImage('/example/assets/logo.png');
    var props = Object.assign({
      "scale.x": scale,
      "scale.y": scale,
      textures,
      onClick: onClickItem
    }, this.props);
    return CreateElement('Sprite', props)
  }
}

class Fighter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var textures = [];
    for (var i = 0; i < 30; i++) {
      var val = i < 10 ? '0' + i : i;
      textures.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }
    var props = Object.assign({
      x:200,
      y: 200,
      textures,
    }, this.props);
    return CreateElement('AnimatedSprite', props)
  }
}

class CustomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 12,
      y: 12,
    }
  }

  buildItems() {
    var a = [0, 1, 2, 3, 4];
    return a.map(value => {
      var props = {
        x: 20,
        y: value * 150
      }
      return CreateElement(CustomItem, props);
    })
  }

  render() {
    var click = () => {
      this.setState({
        x: 0, y: 0
      })
    };
    var props = {
      x: this.state.x,
      y: this.state.y,
      onClick: click,
      children: [
      CreateElement("Container", {
        children: this.buildItems()
      }),
      CreateElement(Fighter)
      ]
    };
    return CreateElement('Container', props);
  }
}

var canvas = document.querySelector("#canvas");
var app = new PIXI.Application(640, 1136, {
  backgroundColor : 0x1099bb,
  view: canvas
});

let a = (<a></a>)

class Hello extends React.Component {
  render() {
    return (
      <h1>
        {a}
        <div> hello </div>
      </h1>
    )
  }
}
console.log((<Hello name="guoshencheng" />), a);

PIXI.loader.add('/example/assets/logo.png').add('/example/assets/fighter.json').load(() => {
  Render(CreateElement(CustomContainer, null, null), app);
});
console.log(app)
