'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  config = require('../../config/config'),
  agent = request.agent(app);


describe('omniEdu API tests', function(){
  beforeEach(function(done){ done(); });

  it('should get course id 11233 succeed ', function(done){
    agent.get('/_apis/oe/course/11233').expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.exist(obj.id);
        done();
      });
  });

  it('should get lesson 1 succeed and have at least 3 courses', function(done){
    agent.get('/_apis/oe/lesson/1').expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
	obj.length.should.be.above(3);
        done();
      });
  });

  afterEach(function(done){done();});
});
