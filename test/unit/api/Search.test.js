/**
 * Created by zigakerec on 08/08/2017.
 */
require("sails-test-helper");

describe(TEST_NAME, () => {

  let path = "/v1/search";
  let lat = 46.0425164;
  let lon = 14.5477076;

  it(`GET ${path} status 400 - lat & lng are mandatory`, (done) => {
    request.get(path)
      .expect(400)
      .end(done);
  });

  it(`GET ${path}?lat=${lat}&lon=${lon}`, (done) => {
    request.get(`${path}?lat=${lat}&lon=${lon}`)
      .expect(200)
      .end(done);
  });

  it(`GET ${path}?lat=${lat}&lon=${lon}&radius=a - radius is not a positive integer`, (done) => {
    request.get(`${path}?lat=${lat}&lon=${lon}&radius=a`)
      .expect(400)
      .end(done);
  });

  it(`GET ${path}?lat=${lat}&lon=${lon}&radius=20 - radius is a positive integer`, (done) => {
    request.get(`${path}?lat=${lat}&lon=${lon}&radius=20`)
      .expect(200)
      .end(done);
  });

  it(`GET ${path}?lat=${lat}&lon=${lon}&followers_min=1000&followers_max=15000`, (done) => {
    request.get(`${path}`)
      .query({
        lat,
        lon,
        followers_min: 1000,
        followers_max: 1500
      })
      .expect(200)
      .end(done);
  })


});
