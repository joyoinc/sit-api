'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config'),
    util = require('util'),
    bcrypt = require('bcrypt'),
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

    var l = req.body.login;
    var p = req.body.password;
    p = bcrypt.hashSync(p, config.encryptSalt);

    var sqlCmd = 'SELECT * FROM sp_check_login($1, $2) AS id';
    client.query(sqlCmd, [l, p], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { user_id:-1 };
      if(err) {
        console.error(chalk.red('Query failed!'));
        json.error =  { message : 'failed when query' };
      } else {
        var o = result.rows[0];
        if(o.id < 0) {
          json.error =  { message : 'no such login exists' };
        } else {
          json.user_id = o.id;
          if(o.id === 0) {
            json.error =  { message : 'login/password not match' };
          }
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
    p = bcrypt.hashSync(p, config.encryptSalt);

    var sqlCmd = 'SELECT * FROM sp_create_login($1, $2) AS id';
    client.query(sqlCmd, [l, p], function(err, result) {
      // call done to release client back to pool
      done();
      var json = { user_id:-1 };
      if(err) {
        console.error(chalk.red('Query failed!'));
        console.error(err);
        json.error = { message : 'failed when query' };
      } else {
        json.user_id = result.rows[0].id ;
      }
      res.json(json);
    });
  });
};
