require("sails-test-helper");

describe(TEST_NAME, () => {

  let path = "/v1/user";

  it(`GET ${path} - retrieving a user without userId`, (done) => {
    request.get(path)
      .expect(404)
      .end(done);
  });

});