require("sails-test-helper");

describe(TEST_NAME, () => {

  let path = "v1/me";

  it(`GET ${path} - no authorization header present`, (done) => {
    request.post(`${path}`)
      .expect(401)
      .end(done);
  });

});