var express = require('express');
var router = express.Router();

// var adsDao = require('../dao/adsDao');

// 查询全部
router.get('/list', function(req, res, next) {
	console.log(req)
	res.send({
		data: 'success',
		msg: 'ok'
	})
  // adsDao.adsList(req, res, next); // 广告列表
});

module.exports = router;