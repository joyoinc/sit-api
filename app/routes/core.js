'use strict';

module.exports = function(app){
    var core = require('../../app/controllers/core.controller');
    app.route('/').get(core.index);
    app.route('/_apis').get(core.endpoints);
};
