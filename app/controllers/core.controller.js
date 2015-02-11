'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');
var util = require('util');
var pg = require('pg');

exports.index = function(req, res){
  var json = { title: config.app.title, version: config.app.dbVersion };
  res.json(json);
};

exports.endpoints = function(req, res){
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var sqlCmd = "SELECT * FROM tbl_endpoints";
    client.query(sqlCmd, function(err, result) {
      // call done to release client back to pool
      done();
      var json = null;
      if(err) {
        json = err;
      } else {
        json = result.rows;
      }
      res.json(json);
    });
  });
};
