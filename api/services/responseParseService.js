module.exports = {
  photographerBasicInfo: photographer => {
    let categories = photographer.categories.map(({ id, name }) => ({
      id,
      name
    }));

    let photos = photographer.photos.map(({ id, photo, categoryId }) => ({
      id,
      photo,
      categoryId
    }));

    return {
      id: photographer.user.id,
      firstName: photographer.user.firstName,
      lastName: photographer.user.lastName,
      avatar: photographer.user.avatar,
      email: photographer.user.email,
      expertise: photographer.expertise,
      lat: photographer.user.lat,
      lon: photographer.user.lon,
      studio: photographer.studio,
      price_range: photographer.priceRange,
      categories,
      photos
    };
  },

  mediaPhotos: medias => {
    return _.map(medias, item => {
      return {
        id: item.id,
        photo: item.images.low_resolution.url
      };
    });
  }
};
