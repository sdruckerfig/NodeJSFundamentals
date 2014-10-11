var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  	res.render('home', { 
		title: 'Expression Session Management',
		username: req.session.username
	});
});

module.exports = router;
