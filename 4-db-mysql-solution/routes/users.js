var express = require('express');
var router = express.Router();

// walkthrough 4-1
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'NodeJSExamples'
});

/* GET users listing. */
router.get('/', function(req, res) {


	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('select * from Person', function(err, rows) {
			if (err) {
				throw err;
			} else {
				console.log('ROWS @:' + new Date());
				console.log(rows);
				res.render('users', { title: 'Users', rows:rows, name: req.query.name});
			}

			connection.release();
		});

	});

});


module.exports = router;