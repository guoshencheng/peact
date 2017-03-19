/**
 * Created by guoshencheng on 18/03/2017.
 */

import { Component, CreateElement } from 'peact';
import itemContainer from './itemContainer';

class CustomContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props = { x: 12, y: 12 };
    return CreateElement('Container', props, [
      CreateElement(itemContainer, null, null),
      CreateElement('Text', null, null)
    ]);
  }
}