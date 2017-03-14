
function PeactRenderer() {

}

PeactRenderer.prototype.renderComponent = function(Component, config) {
  let component = new Component();
  let content = component.render();
  let pixiObject = this.render(content)
  content.children.forEach(child => {
    let ChildComponent = child.Component;
    let childComponent = new ChildComponent();
    let childContent = childComponent.render()
    pixiObject.addChild(this.render(childContent));
  })
}

PeactRenderer.prototype.renderPixiNative = function(Component, config) {
  let pixiObject = new Component();
  return pixiObject;
}

PeactRenderer.prototype.render = function(content, config) {
  if (content && content.Component && content.Component.prototype.render) {
    return this.renderComponent(content.Component;
  } else {
    return this.renderPixiNative(content.Component);
  }
}

PeactRenderer.prototype.ReRender = function(Component) {
  if (typeof Component !== 'Function') {
    return renderComponent(Component.render().Component)
  } else {
    return renderComponent(Component);
  }
}
