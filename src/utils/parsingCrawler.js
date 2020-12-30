const request = require("request");
const rp = require('request-promise');
let returnArr = []

function GetImgList(comic_id, chapter_newid) {
  return new Promise( (reslove, reject)=>{
    rp('https://www.manhuatai.com/api/getchapterinfo?product_id=2&productname=mht&platformname=pc&comic_id='+comic_id+'&chapter_newid='+chapter_newid).then(async (res)=>{
      let data = JSON.parse(res)
      let current_chapter = data.data.current_chapter
      let prev_chapter = data.data.prev_chapter
      let next_chapter = data.data.next_chapter
    
      let getUrl = 'http://mhpic.jumanhua.com'+current_chapter.rule+'-mht.middle.webp'
      returnArr = []
      // console.log(await recursiveArr(getUrl, 1))
      reslove(await recursiveArr(getUrl, 1))
    })
  })
}



function recursiveArr(Url, i){
  return new Promise((resolve, reject)=>{
    let tiems = i
    rp(encodeURI(Url.replace(/\$\$/g, tiems))).then(res=>{
      returnArr.push(Url.replace(/\$\$/g, tiems))
      tiems++
      recursiveArr(Url, tiems).then(res => resolve(res));
    }).catch(err=>{
      return resolve(returnArr);
    })
  })
  
}



exports.GetImgList = GetImgList