const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
// const router = express.Router();
const app = express();
const http = require("http");
const https = require("https");
const access_token = require('./src/utils/access_token.js')					//获取access_token
// const db = require('./src/db/db.js')
const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};
app.use(allowCrossDomain); //http请求头
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(access_token)
// app.use(db)
app.use(require('./src/routes/index.js'));

// app.use(require('./src/api/customMsg.js'));							//监听微信客服推送

// app.use(require('./src/api/novelArticles.js'));
// app.use(require('./src/api/video.js'));
// app.use(require('./src/api/music.js'));
// app.use(require('./src/api/jiapu.js'));
app.use('/static', express.static(__dirname + '/static')); //托管静态文件
// app.use('/public', express.static(__dirname + '/public')); //托管静态文件

// app.use(require('./src/utils/parsingCrawler'))					//获取api


// router.get("/public/com.kumanzijie.apk", (req, res, next) => {
// 	// res.send('<a href="'+__dirname+'/public/com.kumanzijie.apk">下载安装版app</a>')
// 	res.download(__dirname + "/public/com.kumanzijie.apk");
// })
// router.get("/down", (req, res, next) => {
// 	res.send('<a href="/public/com.kumanzijie.apk">下载安装版app</a>')
// 	// res.download(__dirname + "/public/com.kumanzijie.apk");
// })
// app.use(router)

// var now = Date.now();
// makedog = async () => {
// 	var dog = await todolist.create({
// 		creatTime: now,
// 		title: 'async大法好',
// 		index: 2,
// 		url: 'http://www.baidu.com'
// 	});
// 	console.log('created:' + JSON.stringify(dog));
// };
// makedog();

// finddog = async () => {
// 	var dog = await todolist.findAll({
// 		where: {
// 			index: 2
// 		}
// 	})
// 	for (let o of dog) {
// 		o.url = "http://www.baidu.com"
// 		o.title = "这是文章标题"
// 		o.creatTime = +new Date()
// 		console.log('Target:' + JSON.stringify(o));
// 		await o.save();
// 	}
// 	// console.log(dog)
// }
// finddog()

//加载路由
// app.use(require('./src/api/index.js'));
// app.use(db);


// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const httpsOption = {
// 	key : fs.readFileSync("./certificate/4325616_encounter-k.top.key", "utf8"),
// 	cert: fs.readFileSync("./certificate/4325616_encounter-k.top.pem", "utf8")
// }

// app.set('port', 1240);
http.createServer(app).listen(1240);
// https.createServer(httpsOption, app).listen(443);

// http.createServer(app).listen(80, function(request, response){
//   response.writeHead(301, {'Location': 'https://encounter-k.top'})
//   response.end()
// })

console.log('程序已启动了');
