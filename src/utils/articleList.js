const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const iconv = require('iconv-lite')
const request = require('request')
const rp = require('request-promise');
const cheerio = require('cheerio')

let resultArr = []

function GetArticlesList(key) {
  resultArr = []
  return new Promise( async (resolve, reject)=>{
    let urlSplit = key.split('/')
    let urlId = urlSplit[urlSplit.length-2]
    resolve(await recursion(key, urlId, 1))
  })
}


function recursion(key, urlId, tiems) {
  return new Promise((resolve, reject)=>{
    var options = {
      method: 'GET',
      url: key.substring(0, key.length-1)+'_'+tiems,
      gzip: true,
      encoding: null
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var content = iconv.decode(body, 'utf-8').toString()
      $ = cheerio.load(content)
      let chapterList = $('#novel'+urlId).find('dd')
      if(chapterList.length>0){
        for (let index = 0; index < chapterList.length; index++) {
          const arr = chapterList.eq(index);
          let url = arr.find('a').attr('href')
          let name = arr.find('a').text()
          resultArr.push({
            url: 'https://www.kubiji.net'+url,
            name: name
          })
        }
        tiems++
        recursion(key, urlId, tiems).then(res => resolve(res)); 
      }else{
        resolve(resultArr)
      }
    });
  });
}


exports.GetArticlesList = GetArticlesList