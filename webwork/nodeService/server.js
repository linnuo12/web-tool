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
