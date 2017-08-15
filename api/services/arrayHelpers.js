module.exports = {

  /**
   * @param array
   * @return random array item
   * */
  getRandomArrayItem: (array) => {
    return array[Math.floor(Math.random() * (array.length - 1))];
  },

  /**
   * @param array,
   * @param n - number of random items
   * @return array
   * */
  getRandomArrayItems: (array, n) => {
    let result = new Array(n),
        len = array.length,
        taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = array[x in taken ? taken[x] : x];
      taken[x] = --len;
    }
    return result;
  }
};
