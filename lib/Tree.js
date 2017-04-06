class Tree {
  constructor(id, element, pixiObject, parent, children = []) {
    this.peact_id = id;
    this.element = element;
    this.pixiObject = pixiObject;
    this.parent = parent;
    this.children = children;
  }
  addChild(node) {
    if (this.children.indexOf(node) < 0) {
      this.children.push(node);
    }
  }

  removeChild(node) {
    var index = this.children.indexOf(node);
    if (index >= 0) {
      this.children = [...this.children.slice(0, index), ...this.children.slice(index + 1, this.children.length)];
      if (node.pixiObject && node.pixiObject.parent) {
        node.pixiObject.parent.removeChild(node.pixiObject);
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          node.removeChild(child);
        });
      }
    }
  }

  removeChildById(id) {
    var node = findNode(id);
    if (node) {
      this.removeChild(node);
    }
  }

  findNode(id) {
    if (this.peact_id == id) {
      return this;
    } else {
      if (this.children && this.children.length > 0) {
        var node;
        for (var i = 0; i < children.length; i ++) {
          var child = children[i];
          node = child.findNode(i)
          if (node) {
            break;
          }
        }
        return node;
      } else {
        return null;
      }
    }
  }
}
