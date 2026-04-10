require("dotenv").config()
const app = require("./src/app")
const ConnectDB = require("./src/config/db")
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");


ConnectDB()
app.listen(3000,()=>{
    console.log("server is starts ")
})