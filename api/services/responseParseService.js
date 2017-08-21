module.exports = {
  photographerBasicInfo: photographer => {
    let categories = photographer.categories.map(({ id, name }) => ({
      id,
      name
    }));
    return {
      id: photographer.user.id,
      firstName: photographer.user.firstName,
      lastName: photographer.user.lastName,
      avatar: photographer.user.avatar,
      email: photographer.user.email,
      lat: photographer.user.lat,
      lon: photographer.user.lon,
      studio: photographer.studio,
      price_range: photographer.priceRange,
      categories
    };
  }
};
