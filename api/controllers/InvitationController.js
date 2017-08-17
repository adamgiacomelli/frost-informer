module.exports = {

  submitInvitation: function(req, res) {
    let { code } = req.body;

    if (!code) {
      res.status(400).send({message: 'Please submit invitation code'});
    } else {
      res.status(200).send({ code });
    }
  }

};