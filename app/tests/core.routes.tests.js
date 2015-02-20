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

  it('should auth success for dummy1', function(done){
    var o = {login: 'dummy1', password:'dummy1'};
    agent.post('/_apis/login/auth').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.exist(obj.user_id);
        (obj.user_id).should.be.above(0);
        done();
      });
  });

  it('should auth fail for dummy2', function(done){
    var o = {login: 'dummy2', password:'dummy1'};
    agent.post('/_apis/login/auth').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.exist(obj.user_id);
        (obj.user_id).should.be.below(0);
        done();
      });
  });

  afterEach(function(done){done();});
});
