
'use strict';

module.exports = {
	db: {
		//uri: 'postgres://ulldcqzkmyglth:480S6ABz_YURJ4ZMCPJyG5IBgr@ec2-50-17-207-54.compute-1.amazonaws.com:5432/dcu31opgd9pq74',
        options: {
            user: 'yuanzh',
            password: 's',
            database: 'db1',
            port: '5432',
            host: 'localhost',
            ssl: false
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	}
};
