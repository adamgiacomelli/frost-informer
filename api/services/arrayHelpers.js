/**
 * Created by zigakerec on 07/08/2017.
 */

module.exports = {

  /**
   * @param array
   * @return random array item
   * */
  getRandomArrayString: (array) => {
    return array[Math.floor(Math.random() * (array.length - 1))];
  }
};
