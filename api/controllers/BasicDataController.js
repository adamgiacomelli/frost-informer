module.exports = {
  getCategories: function(req, res) {
    Category.findAll()
      .then(categories => {
        res.status(200).send(categories);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
