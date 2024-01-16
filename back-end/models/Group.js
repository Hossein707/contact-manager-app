const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const GroupModel = mongoose.model("Groups", GroupSchema)
module.exports = GroupModel;