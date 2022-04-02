const mongoose = require('mongoose')


const connectwithDb = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log("db connected"))
        .catch(err => {
            console.log("err:", err)
            process.exit(1)
        })

}


module.exports = connectwithDb

