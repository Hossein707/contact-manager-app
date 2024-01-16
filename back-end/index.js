const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const cors = require('cors')

// const bodyParser = require("body-parser");
// const { setHeaders } = require('./headers');

const contactRoutes = require("./routes/contact");
const groupRoutes = require("./routes/group");

const app = express()
const PORT = process.env.PORT || 4000;


//used cloud.mongoDB
mongoose.set('strictQuery',false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(setHeaders);
app.use(express.static('public'))

//──── Routes
app.use(contactRoutes);
app.use(groupRoutes);

//used for local mongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/contact-manager-db')
//     .then(console.log("connect"))
//     .catch(console.log("error"))

// app.listen(4000, () => {
//     console.log("server is running...")
// })

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})
