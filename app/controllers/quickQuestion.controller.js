'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config'),
    util = require('util'),
    chalk = require('chalk'),
    pg = require('pg');

exports.getQuestion = function(req, res) {
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var id = req.param('id');

    var sqlCmd = 'SELECT * FROM sp_qq_get_question($1)';
    client.query(sqlCmd, [id], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { };
      if(err) {
        console.error(chalk.red('Query failed!'));
        console.error(err);
        json.error = { message : 'failed when query' };
      } else {
		if(result.rows.length===0) {
			json.error = { message : 'no results returned' };
		} else {
			json.title = result.rows[0].title;
			json.details = result.rows.slice(1);
		}
      }
      res.json(json);
    });
  });
};

exports.newQuestions = function(req, res) {
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var ask_by = req.body.name;
    var email = req.body.email;
    var q = req.body.questions;

	while(q.length < 3) {
		q.push({title:'', detail:''});
	}

    var sqlCmd = 'SELECT * FROM sp_qq_create_question($1, $2, $3, $4, $5, $6, $7, $8)';
    client.query(sqlCmd, [ask_by, email, q[0].title, q[0].detail, q[1].title, q[1].detail, q[2].title, q[2].detail], function(err, result) {
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
