const _ = require('lodash');
module.exports = {
  generatePhotographer: record => {
    let photos = [];
    // retrieve instagram photo details
    photos = _.map(record.photos, photo => {
      return {
        thumbnailUrl: photo.photo,
        hiresPhoto: photo.hiresPhoto
      };
    });

    return {
      name: `${record.user.firstName} ${record.user.lastName}`,
      location: {
        city: record.user.locationString
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

  querySetup: query => {
    let {
      lat,
      lon,
      category,
      radius,
      followers_min,
      followers_max,
      studio,
      expertise,
      order
    } = query;
    let where = {};
    let categoryWhere = {};
    let usersWhere = {};
    let orderBy = null;

    lat = parseFloat(lat);
    lon = parseFloat(lon);

    if (followers_max && followers_min) {
      where.followers = {
        $between: [followers_min, followers_max]
      };
    }

    if (studio != undefined) {
      where.studio = studio == 'true' ? 1 : 0;
    }

    if (expertise != undefined) {
      where.expertise = expertise == 'true' ? 'professional' : 'amateur';
    }

    if (order) {
      orderBy = [order.split(',')];
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
        categoryId: parseInt(category)
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
          as: 'photos'
        },
        {
          model: PhotographerCategories,
          as: 'categoryIds',
          where: categoryWhere
        }
      ],
      order: orderBy
    };
  }
};
