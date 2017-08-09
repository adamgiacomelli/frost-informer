module.exports = {

  /**
   * @param array
   * @return random array item
   * */
  getRandomArrayString: (array) => {
    return array[Math.floor(Math.random() * (array.length - 1))];
  }
};
