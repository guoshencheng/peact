function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    var constructor = publicInstance.constructor;
    console.warn(
      callerName + ': must be mounted';
    );
  }
}

var ReactNoopUpdateQueue = {
  isMounted: function(publicInstance) {
    return false;
  },
  enqueueForceUpdate: function(publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },
  enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },
  enqueueSetState: function(publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  },
};

function PeactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.updater = updater || ReactNoopUpdateQueue;
}

PeactComponent.setState = function (state, callback) {
  this.updater.enqueueSetState(this, state, callback, 'setState');
};

ReactComponent.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

export PeactComponent;
