const randomstring = require('randomstring');

module.exports = {

  submitInvitation: function(req, res) {
    let { code } = req.body;

    if (!code) {
      res.status(400).send({message: 'Please submit invitation code'});
    } else {
      //res.status(200).send({ code });
      Invite.findOne({
        where: {
          code,
          status: 'PENDING'
        }
      })
        .then(invite => {
          if (invite) {
            Invite.update(
              { status: 'ACTIVE' },
              { where: { id: invite.id } }
            ).then(updated => {
              res.status(200).send({message: 'Invitation status is active. Code accepted.'});
            }).catch(err => {
              res.status(400).send({message: `Error updating invitation status: ${err}`});
            });
          } else {
            res.status(400).send({message: 'Invitation code does not exist.'});
          }
        })
        .catch(err => {
          res.status(400).send({message: `Error getting invitation data: ${err}`});
        })
    }
  },

  requestInvitationCode: function(req, res) {
    let { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      res.status(400).send({message: 'firstName, lastName and email are mandatory.'});
    } else if (!validationHelper.isValidEmail(email)) {
      res.status(400).send({message: 'Email address is not valid.'});
    } else {

      let pInvite = Invite.findOne({
        where: {
          email
        }
      });

      pInvite.then(invite => {
        if (invite) {
          res.status(400).send({message: `User with email ${email} already requested an invitation code.`});
        } else {
          let code = randomstring.generate(12);
          // save invitation request to database
          Invite.create({
            firstName,
            lastName,
            email,
            code,
            status: 'PENDING'
          })
            .then(invite => {
              res.status(200).send({message: 'Request invitation submitted.'});
            })
        }
      }).catch(err => {
        res.status(400).send({message: `Error getting invitation data: ${err}`});
      });

    }
  }

};