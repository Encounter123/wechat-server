const client = require('./index')
const schedule = require('node-schedule');
const timerShose = require('../utils/timerShose.js')


// client.get('hello', (err, v) => {
//   console.log("redis get hello err,v", err, v);
// })



client.del('testLists');
client.rpush('testLists', '64300');
client.rpush('testLists', '64301');
client.rpush('testLists', '64302');

// 设置定时器
let j = schedule.scheduleJob('10 * * * * *', () => {
  setInterval1()
});



function setInterval1(params) {
  console.log('scheduleCronstyle:' + new Date());
  client.lpop('testLists', (err, v) => {
    console.log(v);
    if (!v) {
      j.cancel()
    }
  })
}


module.exports = {
  redisSaveShose: (spuId) => {
    client.rpush('testLists', spuId);


    timerShose('redis', spuId)
  }
}






// client.rpop('testLists', function (err, v) {
//   console.log('client.rpop , err, v ', err, v);
// })

// client.lrange('testLists', 0, -1, function (err, lists) {
//   console.log('client.lrange , err ,lists: ', err, lists);
// })

// client.ltrim('testLists', 0, 2, function (err, lists) {
//   console.log('client.lrange , err ,lists: ', err, lists);
// })

// client.lrange('testLists', 0, -1, function (err, lists) {
//   console.log('client.lrange , err ,lists: ', err, lists);
// })