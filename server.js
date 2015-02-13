'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	//mongoose = require('mongoose'),
	util = require('util'),
    pg = require('pg'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
pg.connect(config.db.options, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to PostgreSQL DB!'));
		console.log(chalk.red(err));
        process.exit(-1);
	}
});

// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// format db uri
var uri = function(options){
    if(options) {
        return util.format('postgres://%s:%s@%s:%d/%s',
            options.user,
            options.password,
            options.host,
            options.port,
            options.database);
    }
    return null;
};

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + uri(config.db.options)));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
