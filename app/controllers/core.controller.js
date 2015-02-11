'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');
var util = require('util');

exports.index = function(req, res){
    var json = { title: config.app.title, version: config.app.dbVersion };
    res.json(json);
};
