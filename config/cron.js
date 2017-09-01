module.exports.cron = {

  syncFollowers: {
    schedule: '0 0 2 * * *',
    onTick: function() {

      Photographer.findAll()
        .then(photographers => {
          photographers.map(photographer => {
            instagramApiService.getUser(photographer.instagramId, photographer.instagramToken)
              .then(res => {
                if (!res.err) {
                  photographer.updateAttributes({
                    followers: res.counts.follows
                  });
                }
              });
          });
        })
        .catch(err => {
          console.log({
            message: 'Error retrieving followers',
            err
          })
        })

    }
  }

};