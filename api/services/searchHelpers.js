const _ = require('lodash');
module.exports = {

  generatePhotographer: (record) => {

    let selection = arrayHelpers.getRandomArrayItems(record.photos, 3);
    let photos = [];

    // retrieve instagram photo details
    _.map(selection, photo => {
      let p = instagramApiService.getMedia(photo.instagramImageId);
      photos.push({
        thumbnailUrl: p.data.images.thumbnail.url
      })
    });


    return {
      name: record.user.fullname,
      location: {
        city: 'This is yet to be retrieved'
      },
      id: record.user.id,
      followers: Math.floor((Math.random() * 120239) + 8300),
      studio: record.studio,
      avatar: record.user.avatar,
      expertise: record.expertise,
      priceRange: record.priceRange,
      photos
    };
  },

  querySetup: (query) => {
    let { lat, lon, category, radius, followers_min, followers_max } = query;
    let where = {
      expertise: 'professional'
    };
    let photosWhere = {};
    if (category) {
      photosWhere.categoryId = category;
    }

    return {
      where,
      include: [
        {
          model: User,
          as: 'user'
        },
        {
          model: Photo,
          as: 'photos',
          where: photosWhere
        }
      ]
    };
  }
};