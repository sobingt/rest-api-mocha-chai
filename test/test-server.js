process.env.NODE_ENV = 'test';
// used in development stage
var chai = require('chai');
//used to do http request
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');


var server = require('../server/app');
var User = require("../server/models/User");

var should = chai.should();
//config chai http
chai.use(chaiHttp);

describe('Users', function(){
  User.collection.drop();
  
  beforeEach(function(done){
    var user = new User({
     firstName: 'Sobin',
    lastName: 'Thomas'
    });
    user.save(function(err){
      done();
    });
  });
  
  afterEach(function(done){
    User.collection.drop();
    done();
  });
  
  it('should list ALL users on /users GET', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('firstName');
        res.body[0].should.have.property('lastName');
        res.body[0].firstName.should.equal('Sobin');
        res.body[0].lastName.should.equal('Thomas');
        done();
      });
  });
  
  it('should Single users on /users/:id GET', function(done) {
    var user = new User({
      firstName: 'Darshan',
      lastName: 'Patel'
    });
    user.save(function(err, data){
      chai.request(server)
          .get('/users/'+data._id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.firstName.should.equal('Darshan');
            res.body.lastName.should.equal('Patel');
            res.body._id.should.equal(data.id);
            done();
      });
    });
  });
  
});












