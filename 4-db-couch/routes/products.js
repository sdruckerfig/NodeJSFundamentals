var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {

	var db = req.db;

	db.view('products-price', 'ProductsByPrice', function(err, body) {
		console.log(body);

		res.render('products', {
			products: body.rows,
			rows: body.total_rows
		});

	});

});


router.post('/', function(req, res) {

	req.assert('productTitle', 'Product Title is required').notEmpty();
	var errors = req.validationErrors();

	if (req.body.productTitle.length > 0) {
		
		var db = req.db;

		db.view('products-title', 'productsByTitle', { startkey: req.body.productTitle, endkey: req.body.productTitle + "ZZ" }, function(err, body) {
			console.log(err,body);
			
			res.render('products', {
				products: body.rows,
				rows: body.total_rows,
				errors: errors,
				productTitle: req.body.productTitle
			});


		});

	} else {

		db.view('products-title', 'productsByTitle', function(err, body) {
			console.log(body);

			res.render('products', {
				products: body.rows,
				rows: body.total_rows
			});

		});
	}

});



module.exports = router;