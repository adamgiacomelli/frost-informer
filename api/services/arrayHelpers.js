module.exports = {

  /**
   * @param array
   * @return random array item
   * */
  getRandomArrayItem: (array) => {
    return array[Math.floor(Math.random() * (array.length - 1))];
  }
};
