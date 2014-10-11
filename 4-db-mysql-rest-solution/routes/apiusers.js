var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'NodeJSExamples'
});

/* GET users listing. */
router.get('/', function(req, res) {

	// url parameters available through the req.param() method
	console.log('page: ' + req.param("page"));
	console.log('start: ' + req.param("start"));
	console.log('limit: ' + req.param("limit"));

	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('select * from Person', function(err, rows) {
			if (err) {
				throw err;
			} else {
				res.writeHead(200, {
					"Content-Type": "application/json"
				});
				var result = {
					success: true,
					root: rows,
					total: rows.length
				}
				res.write(JSON.stringify(result));
				res.end();
			}

			connection.release();
		});

	});

});


router.delete('/:id', function(req, res) {

	console.log(req);

	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('delete from Person where id=?', [req.params.id], function(err, rows) {

			if (err) {
				throw err;
			} else {

				res.writeHead(200, {
					"Content-Type": "application/json"
				});
				var result = {
					success: true,
					rows: rows.length,
					detail: rows

				}
				res.write(JSON.stringify(result));
				res.end();

			}

			connection.release();
		});

	});

});

router.put('/:id', function(req, res) {

	console.log(req.body);

	req.assert('lastName', 'Last Name is required').notEmpty();
	var errors = req.validationErrors();

	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('update Person set ? where id = ?', [req.body, req.params.id],
			function(err, rows) {
				if (err) {
					throw err;
				} else {
					res.writeHead(200, {
						"Content-Type": "application/json"
					});
					var result = {
						success: true,
						detail: rows

					}
					res.write(JSON.stringify(result));
					res.end();
				}

				connection.release();
			});

	});

});


router.post('/', function(req, res) {

	console.log(req.body);

	// req.assert('lastName', 'Last Name is required').notEmpty();
	// var errors = req.validationErrors();

	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('insert into Person set ?', req.body,
			function(err, rows) {
				if (err) {
					throw err;
				} else {
					res.writeHead(200, {
						"Content-Type": "application/json"
					});
					var result = {
						success: true,
						detail: rows,
						id: rows.insertId

					}
					res.write(JSON.stringify(result));
					res.end();
				}

				connection.release();
			});

	});

});

module.exports = router;