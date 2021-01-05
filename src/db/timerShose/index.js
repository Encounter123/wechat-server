const { Sequelize, DataTypes } = require('sequelize');
const init = require('../db.js')



var TimerShose = init.define('timerShose', {
	index: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		primaryKey: true
	},
	title: {type:DataTypes.STRING,defaultValue:''},
	skuId: {type:DataTypes.STRING,defaultValue:''},
	logo: {type:DataTypes.STRING,defaultValue:''},
	spuId: {type:DataTypes.STRING,defaultValue:''},
	price: {type:DataTypes.STRING(5000)}
}, {
	timestamps: true, // 不要默认时间戳
	freezeTableName: true
});


(async () => {
  await TimerShose.sync();
})();

module.exports = TimerShose