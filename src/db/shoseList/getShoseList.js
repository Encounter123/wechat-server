const ShoseList = require('./index')

module.exports = {
  getShoseList: (req, resolve)=>{
    ShoseList.findAll({
      where: {
        openId: req
      }
    }).then(res=>{
      resolve.send({
        code: 200,
        data: res.map(val=>{
          return {
            ...val.dataValues,
            sizePrice: JSON.parse(val.dataValues.sizePrice)
          }
        }) || [],
        msg: 'success'
      })
    })
  }
}


