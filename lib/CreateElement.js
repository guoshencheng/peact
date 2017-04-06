/**
 * Created by guoshencheng on 27/03/2017.
 */

module.exports = (type, props) => {
  var key;
  if (props) {
    key = props.key;
    delete props.key;
  }
  return {
    type, props, key
  }
}
