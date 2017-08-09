module.exports = {

  /**
   * Generate one random hardcoded artist
   * */
  generateArtist: () => {

    let names     = ['Arthur', 'Gerry', 'Edoardo', 'Cecila', 'Araceli', 'Hayden', 'Yanira', 'Tuan', 'Quentin', 'Dennis', 'Caron', 'Christiana', 'Tennie', 'Walker', 'Sondra', 'Kirstie'],
        surnames  = ['Channell', 'Isenberg', 'Yokum', 'Hattaway', 'Arata', 'Spalla', 'Clute', 'Eno', 'Lawyer', 'Ertl', 'Witman', 'Kroll', 'Heras', 'Field', 'Brendle', 'Liptak'],
        cities    = ['Shenzhen', 'Ho Chi Minh City', 'New Taipei City', 'Lagos', 'Istanbul', 'Shanghai', 'Bangalore', 'Suzhou', 'Hyderabad', 'Johannesburg', 'Tokyo', 'Berlin', 'Hanoi', 'Abidjan', 'Delhi', 'Hong Kong', 'Lahore', 'Mexico City', 'Addis Ababa', 'Tehran', 'New York City', 'Casablanca', 'Ankara', 'Riyadh', 'Cairo', 'Dhaka', 'Kolkata', 'Lima', 'Moscow', 'Busan'],
        photos    = ['https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20634013_141375903115692_7423958787700031488_n.jpg', 'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20479060_129715610974195_1876355479433641984_n.jpg', 'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20583264_1375103902603035_6187719964137357312_n.jpg', 'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20633608_307471639663455_1160149144292032512_n.jpg', 'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20688077_344265775986623_1867672185137528832_n.jpg', 'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20687998_1120287794772909_1060496986672726016_n.jpg', 'https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/20590085_135158967086929_4852177854558896128_n.jpg'];
    return {
      name: `${arrayHelpers.getRandomArrayString(names)} ${arrayHelpers.getRandomArrayString(surnames)}`,
      location: {
        city: arrayHelpers.getRandomArrayString(cities)
      },
      followers: Math.floor((Math.random() * 120239) + 8300),
      studio: Math.random() >= 0.5,
      expertise: Math.random() >= 0.5 ? 'professional' : 'amateur',
      price_range: Math.floor((Math.random() * 5) + 1),
      photos: [
        {
          thumbnail_url: arrayHelpers.getRandomArrayString(photos)
        },
        {
          thumbnail_url: arrayHelpers.getRandomArrayString(photos)
        },
        {
          thumbnail_url: arrayHelpers.getRandomArrayString(photos)
        }
      ]
    }
  }
}
