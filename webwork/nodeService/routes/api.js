const express = require("express")
const router = express()

router.get("/",(req,res)=>{
  res.status(200).json({success:true,msg:"获取所有数据"})
})

router.get("/:id",(req,res)=>{
  res.status(200).json({success:true,msg:`根据${req.params.id}获取单个数据`})
})

router.post("/",(req,res)=>{
  res.status(200).json({success:true,msg:`创建新的数据`})
})

router.put("/:id",(req,res)=>{
  res.status(200).json({success:true,msg:`根据${req.params.id}更新数据`})
})

router.delete("/:id",(req,res)=>{
  res.status(200).json({success:true,msg:`根据${req.params.id}删除数据`})
})

module.exports = router
