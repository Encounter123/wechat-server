let express = require('express');
let router = express.Router();
let { getOpenId, saveUserInfo } = require('../db/wechatUserList/userInfo');


// 查询全部
// router.get('/list', function(req, res, next) {
// 	// console.log(req)
// 	res.send({
// 		data: 'success',
// 		msg: 'ok'
// 	})
//   // adsDao.adsList(req, res, next); // 广告列表
// });



router.post('/getOpenId', (req, res)=>{
  // console.log(req.body)
  getOpenId(req.body, res)
  // saveUserInfo(req.body.userInfo)
})

router.post('/getUserInfo', (req, res)=>{
  // saveUserInfo(req.body, res)
  console.log()
  if (req.headers.token) {
    saveUserInfo({token: req.headers.token,...req.body}, res)
  }else{
    res.send({
      code: 200,
      msg: 'token已过期'
    })
  }
  
})



module.exports = router;