/**
 * Created by guoshencheng on 28/03/2017.
 */

var Tree = require('./Tree');
var RenderPixiElement = require('./RenderPixiElement');

var Renderer = function () {
  this.updateQueue = [];
  this.tree = new Tree();
};

Renderer.prototype.updateStateToQueue = function (component, state, old, callback) {
  this.updateQueue.push({
    component, state, old, callback
  })
};

Renderer.prototype.update = function() {
  if (this.updateQueue.length && this.updateQueue.length > 0) {
    this.updateQueue.map(obj => {
      var { component, state, old } = obj;
      var componentInTree = this.tree.findNode(component.peact_id);
      if (componentInTree && componentInTree == component) {
        component.state = state;
        var renderElement = component.render();

      }
    });
  }
};

module.exports = function () {

};
