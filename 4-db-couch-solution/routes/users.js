var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res) {

	var db = req.db;

	db.view('users-lastname', 'usersByLastName', function(err, body) {
		res.render('users', {
			users: body.rows,
			rows: body.total_rows
		});
	});
});

router.post('/', function(req, res) {

	req.assert('lastName', 'Product Title is required').notEmpty();
	var errors = req.validationErrors();

	if (req.body.lastName.length > 0) {
		var searchExpr = new RegExp(req.body.lastName + "+[a-zA-Z0-9]+", "i");

		var db = req.db;


		db.view('users-lastname', 'usersByLastName', {
			startkey: req.body.lastName,
			endkey: req.body.lastName + "ZZ"
		}, function(err, body) {
			console.log(err, body);

			res.render('users', {
				users: body.rows,
				rows: body.total_rows,
				errors: errors,
				lastName: req.body.lastName
			});

		});

	} else {

		db.view('users-lastname', 'usersByLastName', function(err, body) {
			res.render('users', {
				users: body.rows,
				rows: body.total_rows
			});
		});
	}

});

module.exports = router;