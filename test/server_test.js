'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('server.js', function() {
  var date = new Date();

  // it('should display the current time', function(done) {
  //   chai.request('localhost:3000')
  //     .get('/time')
  //     .end(function(err, res) {
  //       expect(err).to.eql(null);
  //       done();
  //     });
  // });

  it('should have a 404 page', function(done) {
    chai.request('localhost:3000')
      .get('/404page')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });


});
