const express = require('express')
const router = express.Router()
const timerShose = require('../utils/timerShose.js')


// 用户输入 sku
router.post('/sku/saveSku',(req, resolve)=>{
  // console.log(1)
  timerShose(req.headers.token,req.body.spuId, resolve)
})



router.post('/xcx/wx-msg/send',(req, resolve)=>{
  console.log('1')
	console.log('1',req)
  console.log('2',req.body)
	console.log('3',req)
  // timerShose(req.headers.token,req.body.spuId, resolve)
})





module.exports = router