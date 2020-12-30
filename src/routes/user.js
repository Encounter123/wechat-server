let express = require('express');
let router = express.Router();
let { getOpenId, saveUserInfo } = require('../db/wechatUserList/userInfo');


// 查询全部
router.get('/list', function(req, res, next) {
	// console.log(req)
	res.send({
		data: 'success',
		msg: 'ok'
	})
  // adsDao.adsList(req, res, next); // 广告列表
});



router.post('/getUserInfor', (req, res)=>{
  // console.log(req.body)
  getOpenId(req.body)
  // saveUserInfo(req.body.userInfo)
})



module.exports = router;