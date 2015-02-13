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

    afterEach(function(done){done();});
});
