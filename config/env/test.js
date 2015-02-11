
'use strict';

module.exports = {
	db: {
		uri: 'postgres://hymmnwaybgiokd:K3uGtah_13qxSiLPt_AVs-uoQ8@ec2-107-21-118-56.compute-1.amazonaws.com:5432/d4hkl3erph71o0',
        options: {
            user: 'hymmnwaybgiokd',
            password: 'K3uGtah_13qxSiLPt_AVs-uoQ8',
            database: 'd4hkl3erph71o0',
            port: '5432',
            host: 'ec2-107-21-118-56.compute-1.amazonaws.com',
            ssl: true
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
