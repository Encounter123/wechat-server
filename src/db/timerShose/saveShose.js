// 实现与MySQl交互
const mysql = require('mysql2');
const rp = require('request-promise');
const TimerShose = require('./index')


// var $conf = require('../config/config');
// var $util = require('../util/util');
// var $sql = require('../mapper/userMapper');

// 使用连接池，提升性能
// var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-1',
      msg: '后台异常'
    });
  } else {
    res.json(ret);
  }
};

async function CreatTimerShose(req, resolve) {
  console.log(req)
  let timerShose = await TimerShose.create({
    ...req
  });
  await timerShose.increment('index');
  timerShose.reload();
  // resolve.send({
  //   code: 200,
  //   msg: 'success'
  // })
}

async function InsertTimerShose(req, resolve) {
  TimerShose.update({
    ...req
  }, {
    where: {
      spuId: req.spuId
    }
  }).then(res => {
    // resolve.send({
    //   code: 200,
    //   msg: 'success'
    // })
    // return TimerShose.findAll({
    //   where: {
    //     UUID: req.token
    //   }
    // })
  })
}


module.exports = {
  saveShose: (req, resolve) => {

    // console.log('openid', JSON.parse(res).openid)
    
    TimerShose.findAll({
      where: {
        spuId: req.spuId
      }
    }).then(res1 => {
      if (res1.length > 0) {
        InsertTimerShose(req, resolve)
      } else {
        CreatTimerShose(req, resolve)
      }
    })

  },

};