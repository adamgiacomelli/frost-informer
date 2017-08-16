module.exports = {

  isPositiveInt: (val) => {
    val = parseInt(val);
    if (val < 0) {
      return false;
    }
    let regEx = new RegExp('[1-9][0-9]*');
    return regEx.test(val);
  },

  isValidCoordinate: (c) => {
    let regEx = new RegExp('-?[0-9]{1,3}[.][0-9]+');
    return regEx.test(c);
  }

};
