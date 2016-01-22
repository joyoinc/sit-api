'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  config = require('../../config/config'),
  agent = request.agent(app);


describe('QuickQuestion API tests', function(){
  beforeEach(function(done){ done(); });

  var targetId;

  it('should be able to create at least 1 question', function(done){
    var r = Math.random() * 10000 + 1;
    var o = {	name:'auto-test-' + r, email:'auto-test@email-' + r + '.com',
				questions: [ {title:'who are you', detail:'U, not I'} ]
			};
    agent.post('/_apis/qq/questions').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.not.exist(obj.error);
		targetId = obj[0].id;
        done();
      });
  });

  it('should be able to get the question by a valid given Id', function(done){
    agent.get('/_apis/qq/question/'+targetId).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.exist(obj.title);
        done();
      });
  });

  it('should be able to create at most 3 question', function(done){
    var r = Math.random() * 10000 + 1;
    var o = {	name:'auto-test-' + r, email:'auto-test@email-' + r + '.com',
				questions: [ 
					{title:'who am I', detail:''}, 
					{title:'where I am from', detail:'I know from earth'},
					{title:'where I am going', detail:'I will not go die'}
				]
			};
    agent.post('/_apis/qq/questions').send(o).expect(200)
      .end(function(err, res){
        if(err) done(err);
        var obj = res.body;
        should.not.exist(obj.error);
        done();
      });
  });

  afterEach(function(done){done();});
});
