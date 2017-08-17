require("sails-test-helper");

describe(TEST_NAME, () => {

  let path = "/v1/invitation/submit";

  it(`POST ${path} - submitting invitation code`, (done) => {
    request.post(`${path}`)
      .send({
        code: 'this-is-the-code'
      })
      .expect(400)
      .end(done);
  });

  it(`POST ${path} - no invitation code supplied`, (done) => {
    request.post(`${path}`)
      .expect(400)
      .end(done);
  });

});