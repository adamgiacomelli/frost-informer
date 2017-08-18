const _ = require('lodash');
module.exports = {

  generatePhotographer: (record) => {

    //let selection = arrayHelpers.getRandomArrayItems(record.photos, 3);

    let photos = [];
    // retrieve instagram photo details
    _.map(record.photos, photo => {
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
      followers: record.followers,
      studio: record.studio,
      avatar: record.user.avatar,
      expertise: record.expertise,
      priceRange: record.priceRange,
      photos
    };
  },

  querySetup: (query) => {
    let { lat, lon, category, radius, followers_min, followers_max } = query;
    let where = {};
    let categoryWhere = {};
    let usersWhere = {};

    lat = parseFloat(lat);
    lon = parseFloat(lon);

    if (followers_max && followers_min) {
      where.followers = {
        $between: [followers_min, followers_max]
      }
    }

    if (radius) {
      // 111km is aprox. 1 degree on a map
      let degDist = parseInt(radius) / 111;
      usersWhere.lat = {
        $between: [lat - degDist, lat + degDist]
      };
      usersWhere.lon = {
        $between: [lon - degDist, lon + degDist]
      };
    }

    if (category) {
      categoryWhere = {
        id: parseInt(category)
      };
    }


    return {
      where,
      include: [
        {
          model: User,
          as: 'user',
          where: usersWhere
        },
        {
          model: Photo,
          as: 'photos',
        },
        {
          model: Category,
          as: 'categories',
          where: categoryWhere,
        }
      ]
    };
  }
};