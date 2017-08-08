/**
 * Created by zigakerec on 08/08/2017.
 */
require("sails-test-helper");

describe(TEST_NAME, () => {
  let path = "/v1/search";

  it(`GET ${path}`, (done) => {
    request.get(path)
      .expect(200)
      .end(done);
  });
});
