const express = require('express')
const router = express.Router()
const timerShose = require('../utils/timerShose.js')


// 用户输入 sku
router.post('/sku/saveSku',(req, resolve)=>{
  console.log(1)
  timerShose(req.body.spuId, resolve)
})





module.exports = router