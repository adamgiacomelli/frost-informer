const ig = require('instagram-node').instagram();
ig.use({
  client_id: sails.config.auth.IG_CLIENTID,
  client_secret: sails.config.auth.IG_CLIENT_SECRET
});

module.exports = {
  getMedia: mediaId => {
    // testing purposes only:
    let photos = [
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20634013_141375903115692_7423958787700031488_n.jpg',
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20479060_129715610974195_1876355479433641984_n.jpg',
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20583264_1375103902603035_6187719964137357312_n.jpg',
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20633608_307471639663455_1160149144292032512_n.jpg',
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20688077_344265775986623_1867672185137528832_n.jpg',
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20687998_1120287794772909_1060496986672726016_n.jpg',
      'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20590085_135158967086929_4852177854558896128_n.jpg'
    ];

    // todo: fetch instagram content with given mediaId
    return {
      data: {
        images: {
          thumbnail: {
            url: arrayHelpers.getRandomArrayItem(photos),
            width: 150,
            height: 150
          }
        }
      }
    };
  },

  getUsersMedia: (photographer, resolve) => {

    ig.use({ access_token: photographer.instagramToken });

    ig.user(photographer.instagramId, (err, result, remaining, limit) => {
      console.log(result);
      ig.user_media_recent(photographer.instagramId, { count: result.counts.media }, (err, medias, pagination, remaining, limit) => {
        resolve(medias);
      });
    });


  }
};
