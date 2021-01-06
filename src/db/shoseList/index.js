const { Sequelize, DataTypes } = require('sequelize');
const init = require('../db.js')



var ShoseList = init.define('shoseList', {
	index: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		primaryKey: true
	},
	skuId: {type:DataTypes.STRING,defaultValue:''},
	title: {type:DataTypes.STRING,defaultValue:''},
	openId: {type:DataTypes.STRING,defaultValue:''},
	logo: {type:DataTypes.STRING,defaultValue:''},
  spuId: {type:DataTypes.STRING,defaultValue:''},
  sizePrice: {type:DataTypes.STRING(5000),defaultValue:''}
}, {
	timestamps: true,
	freezeTableName: true,
	paranoid: true
});


(async () => {
  await ShoseList.sync();
})();

module.exports = ShoseList