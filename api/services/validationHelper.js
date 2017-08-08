/**
 * Created by zigakerec on 08/08/2017.
 */

module.exports = {

  isPositiveInt: (val) => {
    let regEx = new RegExp('[1-9][0-9]*');
    return regEx.test(val);
  }

};
