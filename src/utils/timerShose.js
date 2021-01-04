const rp = require('request-promise');
const request = require("request");
const crypto = require("crypto");
const { saveShose }  = require("../db/timerShose/saveShose")


// 转换签名
function return_sign(raw_sign_code_str) {
  const md5 = crypto.createHash("md5");
  const password = md5.update(raw_sign_code_str).digest("hex");
  return password
}


// 封装request请求
function api_request(url, spuId) {
  return new Promise((resolve, reject) => {
    var sign = return_sign('spuId' + spuId + '19bc545a393a25177083d4a748807cc0')
    var options = {
      method: 'POST',
      url: url,
      headers: {
        'Host': "app.poizon.com",
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        'appid': "wxapp",
        'appversion': "4.4.0",
        'content-type': "application/json",
        'Accept-Encoding': "gzip, deflate, br",
        'Accept': "*/*",
      },
      body: {
        sign: sign,
        spuId: spuId
      },
      json: true,
      gzip: true
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      resolve(body)
    });
  })
}



function timerShose(spuId) {
  let returnData = {}
  api_request('https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail', "64301").then(res => {
    try {
      if (res.data.saleProperties.list.length > 0) {
        returnData = {
          title: res.data.detail.title,
          skuId: res.data.detail.articleNumber,
          logo: res.data.detail.logoUrl,
          spuId: res.data.detail.spuId,
          list: JSON.stringify(res.data.saleProperties.list)
        }
        return api_request('https://app.poizon.com/api/v1/h5/inventory/price/h5/queryBuyNowInfo', "64301")
      }
    } catch (error) {}
  }).then(res=>{
    returnData.price = JSON.stringify(res.data.skuInfoList)
    saveShose(returnData)
  })
}





// let returnArr = []

// function GetImgList(comic_id, chapter_newid) {
//   return new Promise( (reslove, reject)=>{
//     rp('https://www.manhuatai.com/api/getchapterinfo?product_id=2&productname=mht&platformname=pc&comic_id='+comic_id+'&chapter_newid='+chapter_newid).then(async (res)=>{
//       let data = JSON.parse(res)
//       let current_chapter = data.data.current_chapter
//       let prev_chapter = data.data.prev_chapter
//       let next_chapter = data.data.next_chapter

//       let getUrl = 'http://mhpic.jumanhua.com'+current_chapter.rule+'-mht.middle.webp'
//       returnArr = []
//       // console.log(await recursiveArr(getUrl, 1))
//       reslove(await recursiveArr(getUrl, 1))
//     })
//   })
// }



// function recursiveArr(Url, i){
//   return new Promise((resolve, reject)=>{
//     let tiems = i
//     rp(encodeURI(Url.replace(/\$\$/g, tiems))).then(res=>{
//       returnArr.push(Url.replace(/\$\$/g, tiems))
//       tiems++
//       recursiveArr(Url, tiems).then(res => resolve(res));
//     }).catch(err=>{
//       return resolve(returnArr);
//     })
//   })

// }


module.exports = timerShose
// exports.timerShose = timerShose