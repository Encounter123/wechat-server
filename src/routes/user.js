let express = require('express');
let router = express.Router();
let { getOpenId, saveUserInfo } = require('../db/wechatUserList/userInfo');
const { getShoseList, saveShoseList } = require('../db/shoseList/shoseList');
const timerShose = require('../utils/timerShose.js');
const { redisSaveShose }  = require('../redis/list');

// 查询全部
// router.get('/list', function(req, res, next) {
// 	// console.log(req)
// 	res.send({
// 		data: 'success',
// 		msg: 'ok'
// 	})
//   // adsDao.adsList(req, res, next); // 广告列表
// });



router.post('/getOpenId', (req, res) => {
  // console.log(req.body)
  getOpenId(req.body, res)
  // saveUserInfo(req.body.userInfo)
})

router.post('/getUserInfo', (req, res) => {
  // saveUserInfo(req.body, res)
  saveUserInfo({
    token: req.headers.token,
    ...req.body
  }, res)
  
})


// 获取列表
router.post('/user/shoseList', (req, resolve) => {
  getShoseList(req.headers.token, resolve)
  // console.log(req)
})


// 保存用户的shose列表
router.post('/user/saveShose',(req,resolve)=>{
  timerShose(req.headers.token,req.body.spuId, resolve)
  redisSaveShose(req.body.spuId) // 存入缓存
})




module.exports = router;