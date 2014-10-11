var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({}, {}, function(e, docs) {
  	console.log(docs);
	res.render('users', {
		users : docs,
		errors: [],
		rows: docs.length
	});
  });
});


router.post('/', function(req, res) {

	req.assert('lastName', 'Last Name is required').notEmpty();
	var errors = req.validationErrors();
	
	if (req.body.lastName.length > 0) {
		var searchExpr = new RegExp(req.body.lastName + "+[a-zA-Z0-9]+","i");

		var db = req.db;
		var collection = db.get('usercollection');

		collection.find({
			"lastName" :  searchExpr
		}, {}, function(e, docs) {
			res.render('users', {
				users : docs,
				errors: errors,
				rows: docs.length,
				lastName: req.body.lastName
			});
		});
	} else {

		res.render('users', {
				title: 'Products',
				"products": [],
				errors: errors,
				rows: 0,
				productTitle: req.body.productTitle
		});
	}

});

module.exports = router;
