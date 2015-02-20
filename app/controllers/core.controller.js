'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config'),
    util = require('util'),
    chalk = require('chalk'),
    pg = require('pg');

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

    var sqlCmd = 'SELECT * FROM tbl_endpoints';
    client.query(sqlCmd, function(err, result) {
      // call done to release client back to pool
      done();
      var json = null;
      if(err) {
        console.error(chalk.red('Query failed!'));
        json = { name:'error', msg:'failed when query' };
      } else {
        json = result.rows;
      }
      res.json(json);
    });
  });
};

exports.authenticateLogin = function(req, res) {
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var sqlCmd = 'SELECT * FROM tbl_logins WHERE login=$1';
    client.query(sqlCmd, [req.body.login], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { user_id:-1, message:'' };
      if(err) {
        console.error(chalk.red('Query failed!'));
        json.message = 'failed when query';
      } else {
        if(result.rows.length > 0) {
          var o = result.rows[0];
          var p = req.body.password;
          if(o.user_id >= config.firstRealUser) {// TODO. need to encrypt password.
          }

          if(o.password !== p) {
            json.message = 'login/password not match';
          } else {
            json = { user_id: o.user_id, message:'authenticate succeed' };
          }
        } else {
          json.message = 'no such login exists';
        }
      }
      res.json(json);
    });
  });
};

exports.createLogin = function(req, res) {
  pg.connect(config.db.options, function(err, client, done) {
    if (err) {
      console.error(chalk.red('Could not connect to PostgreSQL DB!'));
      return;
    }

    var l = req.body.login;
    var p = req.body.password;
    // TODO. need to encrypt password.

    var sqlCmd = 'SELECT * FROM sp_create_login($1, $2) AS id';
    client.query(sqlCmd, [l, p], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { user_id:-1, message:'' };
      if(err) {
        console.error(chalk.red('Query failed!'));
        console.error(err);
        json.message = 'failed when query';
      } else {
        json = { user_id:result.rows[0].id, message:'create login succeed' };
      }
      res.json(json);
    });
  });
};
