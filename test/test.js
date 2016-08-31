var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');
var app = require('../index');
var api = request(app);

describe('Hello world test', function() {
  it('should request hello world', function(done) {
      api.get('/api/helloworld').expect(200, done);
  });
});

describe('User CRUD Test', function() {
  var name = 'testuser';
  var password = 'password';
  it('should create user', function(done) {
    api.get('/api/user/create/' + name +'/' + password).set('Accecpt', 'application/json').expect(201).end(function(err, res) {
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(name);
      done();
    });
  });

  it('should read user', function(done) {
    api.get('/api/user/' + name).set('Accept', 'application/json').expect(200).end(function(err, res) {
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('password');
      expect(res.body.name).to.be.equal(name); 
      expect(res.body.password).to.be.equal(password); 
      done();
    });
  });

  it('should update users name', function(done) {
    var newName = 'usertest';
    api.get('/api/user/update/' + name + '/' + newName).expect(200).end(function(err, res) {
      api.get('/api/user/update/' + newName + '/' + name).expect(200, done);
    });
  });

  it('should delete user', function(done) {
    api.get('/api/user/delete/' + name).expect(200, done);
  });


});
