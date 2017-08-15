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
  })


});
