const Sequelize = require('sequelize');

const config = {
	database: 'minapp-wechatUserList',
	username: 'root',
	password: 'Qc123456!',
	host: '47.114.3.158',
	prot: '3306'
}

var init = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},
	timestamps: false
})



var wechatUserList = init.define('images', {
	index: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	creatTime: Sequelize.STRING,
	title: Sequelize.STRING,
	url: Sequelize.STRING
}, {
	timestamps: false, // 不要默认时间戳
	freezeTableName: true
});


module.exports = wechatUserList