'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('server.js', function() {

  it('should display the time', function(done) {
    var date = new Date();
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql(date.getHours() + ':' + date.getMinutes());
        done();
      });
  });

  it('should greet by name for post requests', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .send({name: 'test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('hello test');
        done();
      });
  });

  it('should greet by name in url path', function(done) {
    chai.request('localhost:3000')
      .get('/greet/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('hello test');
        done();
      });
  });

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
