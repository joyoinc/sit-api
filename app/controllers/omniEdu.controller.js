'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config'),
    util = require('util'),
    bcrypt = require('bcrypt'),
    chalk = require('chalk'),
    pg = require('pg');

exports.getCourse = function(req, res) {
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var id = req.param('id');

    var sqlCmd = 'SELECT * FROM tbl_omniedu_courses where id=$1';
    client.query(sqlCmd, [id], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { };
      if(err) {
        console.error(chalk.red('Query failed!'));
        console.error(err);
        json.error = { message : 'failed when query' };
      } else {
        json = result.rows[0];
      }
      res.json(json);
    });
  });
};

exports.getLesson = function(req, res) {
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var id = req.param('id');

    var sqlCmd = 'SELECT * FROM sp_get_lesson($1)';
    client.query(sqlCmd, [id], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { };
      if(err) {
        console.error(chalk.red('Query failed!'));
        console.error(err);
        json.error = { message : 'failed when query' };
      } else {
        json = result.rows;
      }
      res.json(json);
    });
  });
};
