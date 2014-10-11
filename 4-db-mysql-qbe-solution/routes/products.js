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

		connection.query('select * from Product', function(err, rows) {
			if (err) {
				throw err;
			} else {
				console.log('ROWS @:' + new Date());
				console.log(rows, req.query.productTitle);
				res.render('products', {
					title: 'Products',
					rows: rows,
					productTitle: req.query.productTitle
				});
			}

			connection.release();
		});

	});

});

router.post('/', function(req, res) {


	req.assert('productTitle', 'Product Title is required').notEmpty();
	var errors = req.validationErrors();
	console.log(req.assert('productTitle'));
	pool.getConnection(function(err, connection) {

		if (err) {
			console.error("An error occurred: " + err);
		}

		connection.query('select * from Product where title like ?', [req.body.productTitle + '%'],
			function(err, rows) {
				if (err) {
					throw err;
				} else {

					res.render('products', {
						title: 'Products',
						errors: errors,
						rows: rows,
						productTitle: req.body.productTitle
					});
				}

				connection.release();
			});

	});

});


module.exports = router;