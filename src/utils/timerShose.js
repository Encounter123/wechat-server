const rp = require('request-promise');
const request = require("request");
const crypto = require("crypto");
const { saveShose } = require("../db/timerShose/saveShose");
const { saveShoseList } = require('../db/shoseList/shoseList');


// 转换签名
function return_sign(raw_sign_code_str) {
  const md5 = crypto.createHash("md5");
  const password = md5.update(raw_sign_code_str).digest("hex");
  return password
}

// "64301"
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



function timerShose(token, spuId, resolve) {
  let returnData = {}
  api_request('https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail', spuId).then(res => {
    try {
      if (res.data.saleProperties.list.length > 0) {
        returnData = {
          title: res.data.detail.title,
          skuId: res.data.detail.articleNumber,
          logo: res.data.detail.logoUrl,
          spuId: res.data.detail.spuId,
          list: res.data.saleProperties.list,
          skus: res.data.skus
        }
        return api_request('https://app.poizon.com/api/v1/h5/inventory/price/h5/queryBuyNowInfo', spuId)
      }
    } catch (error) { }
  }).then(res => {
    if (res.data.skuInfoList.length > 0) {
      let priceBox = res.data.skuInfoList.map(val => {
        return {
          skuId: val.skuId,
          minPrice: val.minPrice
        }
      })
      let arr = []
      for (let i = 0; i < returnData.list.length; i++) {
        for (let j = 0; j < returnData.skus.length; j++) {
          if (returnData.skus[j].properties[0].propertyValueId === returnData.list[i].propertyValueId) {
            arr.push({
              propertyValueId: returnData.list[i].propertyValueId,
              size: returnData.list[i].value,
              skuId: returnData.skus[j].skuId
            })
            break
          }
        }
      }

      for (let i = 0; i < priceBox.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (priceBox[i].skuId === arr[j].skuId) {
            arr[j].minPrice = priceBox[i].minPrice
            break
          }
        }
      }

      console.log(arr)
      delete returnData.list
      delete returnData.skus
      returnData.price = JSON.stringify(arr)
      if (token!='redis') {
        saveShoseList(token, returnData, resolve)  //将数据存入用户表
      }
      saveShose(returnData, resolve)  //将数据存入定时器表
    }
  })
}


module.exports = timerShose