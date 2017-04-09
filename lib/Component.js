/**
 * Created by guoshencheng on 28/03/2017.
 */
function Component(props, renderer) {
  this.props = props;
  this.renderer = renderer;
};

Component.prototype.setState = function (state, callback) {
  this.renderer.updateStateToQueue(this, state, this.state);
};

Component.prototype.forceUpdate = function(callback) {

};

module.exports = Component;

