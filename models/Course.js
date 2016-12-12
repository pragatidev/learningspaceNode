var mongoose = require('mongoose');
var Course = mongoose.model('Course');

var CourseSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    categories: String
},  {timestamps: true});

mongoose.model(Course, CourseSchema);