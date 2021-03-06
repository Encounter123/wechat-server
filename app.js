const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
// const router = express.Router();
const app = express();
const http = require("http");
const https = require("https");
const access_token = require('./src/utils/access_token.js') //获取access_token
// const db = require('./src/db/db.js')
const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};
app.use(allowCrossDomain); //http请求头
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
// app.use(access_token)
// app.use(db)


require('./src/redis/list') 		//获取redis


//路由拦截器
app.use('*', (req, res, next) => {
	console.log(req.originalUrl)
	if (req.originalUrl != '/getOpenId') {
		if (req.headers.token) {
			next()
		} else {
			res.send({
				code: 200,
				msg: 'token已过期'
			})
		}
	}else{
		next()
	}
});
//所有的路由
app.use(require('./src/routes/user.js'));
app.use(require('./src/routes/sku.js'));

// app.use(require('./src/api/customMsg.js'));							//监听微信客服推送

// require('./src/utils/timerShose.js')('64301')



// app.use(require('./src/api/video.js'));
// app.use(require('./src/api/music.js'));
// app.use(require('./src/api/jiapu.js'));
app.use('/static', express.static(__dirname + '/static')); //托管静态文件
// app.use('/public', express.static(__dirname + '/public')); //托管静态文件

// app.use(require('./src/utils/parsingCrawler'))					//获取api


//加载路由
// app.use(require('./src/api/index.js'));
// app.use(db);






http.createServer(app).listen(1240);

console.log('程序已启动了,1240');