const redis = require('redis')
const client = redis.createClient(6379, '47.114.3.158', {
  'auth_pass': '123456'
})

client.on('ready', function(res){
	console.log('resdis ready success')
})

module.exports = client