const mongoose = require("mongoose")

function ConnectDB()
{
    mongoose.connect(process.env.MONGO_URL )
        .then(()=>{
            console.log("Server is connected to DB")
        })
        .catch(err => {
            console.error(`Server not connect to DB ${err}`)
            process.exit(1)

        })
}

module.exports = ConnectDB;