const express = require("express")
const dotenv = require("dotenv")

// 导入数据库配置
// const connectDB = require('./config/db')
// 链接数据库
// connectDB()

dotenv.config({
  path:'./config/config.env',
});

const app = express();


app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})


// http://localhost:5000/
app.get("/",(req,res)=>{
  // res.send("<h1>Hello World</h1>") 发送HTML
  // res.send({mag:"Hello World"}) 发送json格式数据
  // res.json({success:true}) 发送json格式数据
  // res.sendStatus(400) 发送状态码
  // res.status(200).json({success:true,msg:"Hello World"}) //发送状态码和json数据
  res.status(200).json({
    success: true,
    code: 200,
    msg: `获取单个数据`,
    data: {
      id: 1000001
    }
  })
})


// http://localhost:5000/api:id
app.get("/api/:id",(req,res)=>{
  setTimeout(() => {
    res.status(200).json({
      success: true,
      code: 200,
      msg: `根据${req.params.id}获取单个数据`,
      data: {
        id: req.params.id
      }
    })
  },2000)

})
// http://localhost:5000/api
app.post("/api",(req,res)=>{
  res.status(200).json({success:true,msg:`创建新的数据`})
})
// http://localhost:5000/api:id
app.put("/api/:id",(req,res)=>{
  res.status(200).json({success:true,msg:`根据${req.params.id}更新数据`})
})
// http://localhost:5000/api:id
app.delete("/api/:id",(req,res)=>{
  res.status(200).json({success:true,msg:`根据${req.params.id}删除数据`})
})


// 监听端口设置
const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`Server rnning in ${process.env.NODE_ENV} mode on port ${PORT}`))
