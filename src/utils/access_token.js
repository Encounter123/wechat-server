const request = require('request')
const rp = require('request-promise');
// import { APPID, APPSECRET } from '../../config'
const { APPID, APPSECRET } = require('../../config')
let expires_in = 0


function getAccess_token(){
	let nowTime = +new Date()
	if(nowTime + 30*60*1000 >= expires_in){
		request({
			url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
			method: "get",
			json: true,
			headers: {
				"content-type": "application/json",
			}
		},(error, response, body)=> {
			if (!error && response.statusCode == 200) {
				expires_in = nowTime + parseInt(body.expires_in)*1000
				global.access_token = body.access_token
			}
		})
	}
}

getAccess_token()
setInterval(()=>{
	getAccess_token()
},20*60*1000)


module.exports = getAccess_token