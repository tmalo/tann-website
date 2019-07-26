var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var assert = require('assert');
const expect = chai.expect;
const request = require('supertest');

chai.use(chaiHttp);
const app = 'http://localhost:4000';

describe('API', function() {
  it('responds with Hello on GET /', function(done) {
    request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        //res.body.should.be.a('array');
        res.text.should.equal('Hello');
        done();
      });      
      // // .set('Accept', 'application/json')
      // // .expect('Content-Type', /json/)
      // .expect(200)
      // .then(response => {
      //   assert(response.body, 'Hello');
      //   done();
      // })
    });

  it('responds with 403 on POST /nl/user <empty>', function(done) {
    request(app)
      .post('/nl/user')
      .end(function(err, res){
        res.should.have.status(403);
        done();
    });    
  });
});

// describe('api', function()  {
//   const server = request('http://localhost:4000');
//   describe('GET /', function() {
//     it('should return Hello', function() {
//       server.get('/')
//       .expect(200)
//       .end((error, result) => {
//         if (error) return done(error);

//         assert.equal(result,'Hello');
//         return done();
//       });
//     })
//   })
// });
