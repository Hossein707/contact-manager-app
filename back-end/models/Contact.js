const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    image: { type: Object },
    phoneNumber: { type: String, required: true },
    email:{ type: String, required: true },
    job:{ type: String},
    address:{ type: String },
    group:{ type: String }
})


const ContactModel = mongoose.model("Contacts", ContactSchema)
module.exports = ContactModel