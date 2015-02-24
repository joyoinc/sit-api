'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  config = require('../../config/config'),
  agent = request.agent(app);


describe('core API tests', function(){
  beforeEach(function(done){ done(); });

  it('should print out the basic info about API, including #verison', function(done){
      agent.get('/').expect(200)
      .end(function(err, res){
          if(err) done(err);
          var obj = res.body;
          should.exist(obj.version);

          done();
      });
  });

  it('should auth succeed for dummy1', function(done){
    var o = {login: 'dummy1', password:'dummy1'};
    agent.post('/_apis/login/auth').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.not.exist(obj.error);
        done();
      });
  });

  it('should auth fail for dummy2', function(done){
    var o = {login: 'dummy2', password:'dummy2'};
    agent.post('/_apis/login/auth').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.exist(obj.error);
        done();
      });
  });

  it('should create login succeed', function(done){
    var o = {login: 'auto-test-', password:'auto-test'};
    var r = Math.random() * 10000 + 1;
    o.login += r;
    agent.post('/_apis/login/create').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.not.exist(obj.error);
        done();
      });
  });

  afterEach(function(done){done();});
});
