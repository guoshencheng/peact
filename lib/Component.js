function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    var constructor = publicInstance.constructor;
    console.warn(
      callerName + ': must be mounted';
    );
  }
}

function PeactComponent(props, context, renderer) {
  this.props = props;
  this.context = context;
  this.renderer = renderer;
};

PeactComponent.prototype.setState = function (state, callback) {
  this.state = this.state || {}
  this.state = Object.assign({}, this.state, state)
  this.renderer.ReRender(this)
};

ReactComponent.prototype.forceUpdate = function(callback) {
  this.renderer.ReRender(this)
};

export PeactComponent;
