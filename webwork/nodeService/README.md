## NodeApi 环境搭建

1. 初始化npm生成package.json, 在根目录下新建app.js

```json
npm init
```
2. 修改package.json

```json
 "scripts": {
    "start": "node server"
  },
```

3. 安装服务依赖

```js
cnpm install express dotenv --save
//如果你没有全局安装过nodemon，需要先全局安装一次
cnpm install -g nodemon
//然后在开发环境安装
cnpm install -D nodemon
```
4. 再次修改package文件

```json
   "dev":"nodemon server"
```

> 说明:
>
> npm安装比较慢，这里我是用淘宝源来安装我们搭建本次项目所需要的环境依赖。
其中express是node的一个框架,每次修改文件都需要重启服务器，所以我们需要nodemon来帮助我们重启。
而dotenv呢？由于项目不同需求，需要配置不同环境变量，按需加载不同的环境变量文件，使用dotenv，可以完美解决这一问题。

5. 环境变量配置

在当前目录下新建文件夹config，在config文件夹下新建文件config.env

```json
NODE_ENV=development
PORT=5000
```
再次修改package文件
```json
"start": "NODE_ENV=production node server",
```

config.env配置如下：
```js
const express = require("express")
const dotenv = require("dotenv")

dotenv.config({
  path:'./config/config.env',
});

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`Server rnning in ${process.env.NODE_ENV} mode on port ${PORT}`))
```

6. 创建路由

```js
// http://localhost:5000/
app.get("/",(req,res)=>{
  // res.send("<h1>Hello World</h1>") 发送HTML
  // res.send({mag:"Hello World"}) 发送json格式数据
  // res.json({success:true}) 发送json格式数据
  // res.sendStatus(400) 发送状态码
  res.status(200).json({success:true,msg:"Hello World"}) //发送状态码和json数据
})
```
7. 启动服务

```json
npm run dev
```

#### 路由模块化

在当前目录下新建routes文件夹，在routes文件夹下新建api.js，其中routes用来存放我们所有的接口，api文件存放访问/api这个路径下的接口

/routes/api.js
```js
const express = require("express")
const router = express()

router.get("/",(req,res)=>{
  res.status(200).json({success:true,msg:"获取所有数据"})
})

module.exports = router
```
server.js
```js
const express = require("express")
const dotenv = require("dotenv")
const app = express()
dotenv.config({
  path:'./config/config.env',
});

const api = require("./routes/api")

app.use('/api',api)

const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`Server rnning in ${process.env.NODE_ENV} mode on port ${PORT}`))
```

说明：
通过require将api引入到了server.js中，并通过app.use()这个方法挂载到当访问/api路径时，将通过api这个文件来处理请求。


#### 路由优化

1. 在当前目录下新建文件夹controllers，在controllers文件夹下新建api.js，代码如下：

/controllers/api.js

```js
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
```

2. 在 /routes/api.js 引入刚刚创建的文件并修改代码

```js
const express = require("express")
const router = express()

//引入控制器
const {getApis,createApi,getApi,updateApi,deleteApi} = require('../controllers/api')

router.route("/").get(getApis).post(createApi)

router.route("/:id").get(getApi).put(updateApi).delete(deleteApi)

module.exports = router
```

#### 中间件使用（方便调试）

1. 安装
```js
cnpm install margan --save
```
2. 在server.js下使用

```js
// 引入morgan中间件
const morgan = require('morgan')
// 使用morgan中间件
app.use(morgan("dev"))
```
使用 morgan中间件 可以将请求信息打印在控制台，便于开发调试

#### 打印信息变色

1. 安装
```js
cnpm i colors --save
```
2. 在server.js下引入配置

使用 colors 可以改变打印信息的颜色

```js
app.listen(PORT,console.log(`Server rnning in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold))
```


#### 连接数据库（mongodb）
1. 安装
```js
cnpm i mongoose --save
```
2. 在config.env 加一个连接mongodb数据库地址的环境变量

```js
mongodb://127.0.0.1:27017
```
3. 在config新建db.js

```js
const mongoose = require('mongoose')
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.NET_MONGO_URI, {
    //避免警告信息
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
}

module.exports = connectDB
```

4. 在server.js中启动数据库
```js
const connectDB = require('./config/db')
...
// 链接数据库
connectDB()
```
5. 连接mongodb数据库错误处理
```js
process.on("unhandledRejection",(err,promise) => {
  console.log(`Error:${err.message}`.red.bold);
  //关闭服务器 & 退出进程
  server.colors(() => {
    process.exit(1)
  })
})
```

## 搭建用户数据

#### 创建数据模型
1. 在当前目录下新建文件夹models，在文件夹下新建UserInfo.js
```js
const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  name: {
    type: String, //类型
    require: [true, '请填写用户名'], //是否必须填写
    unique: true, //是否唯一
    trim: true, //去掉空格
    maxlength: [20, '用户名不能超过20个字'] //最大长度
  },
  description: {
    type: String,
    require: [true, '请填写个人简介'],
    maxlength: [500, '个人简介不能超过500个字']
  },
  website: {
    type: String,
    match: [/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/, '请填写合法的网址'], //正则匹配
  },
  phone: {
    type: String,
    match: [/^[1][3,4,5,7,8][0-9]{9}$/, '请填写正确的手机号'],
  },
  email: {
    type: String,
    match: [/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, '请填写正确的邮箱地址'],
  },
  address: {
    type: String,
    default: '江西省抚州市临川区' //默认值
  },
  address: {
    type: String,
    default: '江西省抚州市临川区' //默认值
  },
  occupation: {
    type: String,
    default: '前端开发工程师'
  },
  skill: {
    type: Array,
    default: ['html', 'js', 'css', 'vue', 'react', 'node.js']
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('UserInfo',UserInfoSchema)
```
