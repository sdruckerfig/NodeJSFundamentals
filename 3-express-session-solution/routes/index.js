var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.session);
	if (typeof req.session.username == 'undefined') {
		res.render('index', { title: 'Express Sessions Management' });		
	} else {
		res.redirect('/home');
	}
});

router.post('/', function(req, res) {
  var username = req.body.username || "Default User";
  req.session.username = username;
  console.log(req.body.username);
  res.redirect("/");
});


module.exports = router;
