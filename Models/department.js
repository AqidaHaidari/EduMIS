const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const departmentSchema = new Schema({
    depname: String,
    year: String,
    month: String
})

module.exports = Mongoose.model("department", departmentSchema)