exports.getApis = (req,res,next) => {
  res.status(200).json({success:true,msg:"获取所有数据"});
}

exports.createApi = (req,res,next) => {
  res.status(200).json({success:true,msg:`创建新的数据`})
}

exports.getApi = (req,res,next) => {
  res.status(200).json({success:true,msg:`根据${req.params.id}获取单个数据`})
}

exports.updateApi = (req,res,next) => {
  res.status(200).json({success:true,msg:`根据${req.params.id}更新数据`})
}
exports.deleteApi = (req,res,next) => {
  res.status(200).json({success:true,msg:`根据${req.params.id}删除数据`})
}
