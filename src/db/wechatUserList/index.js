const { Sequelize, DataTypes } = require('sequelize');

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



var UserList = init.define('userList', {
	index: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		primaryKey: true
	},
	nickName: {type:DataTypes.STRING,defaultValue:''},
	gender: {type:DataTypes.STRING,defaultValue:''},
	language: {type:DataTypes.STRING,defaultValue:''},
	city: {type:DataTypes.STRING,defaultValue:''},
	province: {type:DataTypes.STRING,defaultValue:''},
	country: {type:DataTypes.STRING,defaultValue:''},
	avatarUrl: {type:DataTypes.STRING,defaultValue:''},
	openid: {type:DataTypes.STRING,defaultValue:''},
	UUID: {type:DataTypes.UUID,defaultValue: Sequelize.UUIDV1 }
}, {
	timestamps: true, // 不要默认时间戳
	freezeTableName: true
});


(async () => {
  await UserList.sync();
})();

module.exports = UserList