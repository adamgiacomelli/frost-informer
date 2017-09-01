module.exports = {
  photographerBasicInfo: photographer => {
    let categories = photographer.categories.map(({ id, name }) => ({
      id,
      name
    }));

    let photos = photographer.photos.map(
      ({ id, photo, hiresPhoto, categoryId }) => ({
        id,
        photo,
        hiresPhoto,
        categoryId
      })
    );

    return {
      id: photographer.user.id,
      firstName: photographer.user.firstName,
      lastName: photographer.user.lastName,
      avatar: photographer.user.avatar,
      email: photographer.user.email,
      expertise: photographer.expertise,
      lat: photographer.user.lat,
      lon: photographer.user.lon,
      locationString: photographer.user.locationString,
      studio: photographer.studio,
      price_range: photographer.priceRange,
      categories,
      photos
    };
  },

  featuredPhotographersInfo: photographer => {
    let selection = arrayHelpers.getRandomArrayItems(photographer.photos, 3);
    let photos = selection.map(({ photo, hiresPhoto }) => ({
      thumbnailUrl: photo,
      hiresPhoto
    }));

    return {
      name: `${photographer.user.firstName} ${photographer.user.lastName}`,
      followers: photographer.followers,
      location: {
        city: photographer.user.locationString,
        lat: photographer.user.lat,
        lon: photographer.user.lon
      },
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
