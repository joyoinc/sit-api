'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');
var util = require('util');

exports.index = function(req, res){
    var json = util.format('{ "title":"%s", "version":"%s" }', config.app.title, config.app.dbVersion);
    res.send(json);
};