var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {

	var db = req.db;
	var collection = db.get('productcollection');

	collection.find({}, {}, function(e, docs) {
		res.render('products', {
			"products": docs
		});
	});
});


router.post('/', function(req, res) {

	req.assert('productTitle', 'Product Title is required').notEmpty();
	var errors = req.validationErrors();
	
	if (req.body.productTitle.length > 0) {
		var searchExpr = new RegExp(req.body.productTitle + "+[a-zA-Z0-9]+","i");

		var db = req.db;
		var collection = db.get('productcollection');

		collection.find({
			"title" :  searchExpr
		}, {}, function(e, docs) {
			res.render('products', {
				title: 'Products',
				"products": docs,
				errors: errors,
				rows: docs.length,
				productTitle: req.body.productTitle
			});
		});
	} else {

		res.render('products', {
				title: 'Products',
				"products": [],
				errors: errors,
				rows: 0,
				productTitle: req.body.productTitle
		});
	}

});



module.exports = router;