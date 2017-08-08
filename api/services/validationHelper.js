/**
 * Created by zigakerec on 08/08/2017.
 */

module.exports = {

  isPositiveInt: (val) => {
    let regEx = new RegExp('[1-9][0-9]*');
    return regEx.test(val);
  },

  isValidCoordinate: (c) => {
    let regEx = new RegExp('-?[0-9]{1,3}[.][0-9]+');
    return regEx.test(c);
  }

};
