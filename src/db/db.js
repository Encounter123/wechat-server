const { Sequelize } = require('sequelize');

const config = {
	database: 'minapp-wechat',
	username: 'root',
	password: 'Qc123456!',
	host: '47.114.3.158',
	prot: '3306'
}

var init = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	define: {
    freezeTableName: true
  },
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	},
	timestamps: true
})

module.exports = init