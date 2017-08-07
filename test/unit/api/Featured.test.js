/**
 * Created by zigakerec on 07/08/2017.
 */

require("sails-test-helper");

describe(TEST_NAME, () => {

  describe("GET featured", () => {
    let path = "/v1/featured";

    it("GET " + path, (done) => {
      request.get(path)
        .expect(200)
        .end(done);
    });

    it("GET " + path + '?results_per_page=6', (done) => {
      request.get(path + '?results_per_page=6')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.body.results.length).to.equal(6);
            done();
          }
        });
    });

    it("GET " + path + '?results_per_page=6 should return the right amount of data', (done) => {
      request.get(path)
        .query({
          results_per_page: 6
        })
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.body.results.length).to.equal(6);
            done();
          }
        });
    });

    it("GET " + path + '?results_per_page=6 (invalid results_per_page parameter type)', (done) => {
      request.get(path)
        .query({
          results_per_page: 'A'
        })
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          else done();
        });
    });

    it("GET " + path + '?page=a (invalid page parameter type)', (done) => {
      request.get(path)
        .query({
          page: 'A'
        })
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          else done();
        });
    });

  });

});
