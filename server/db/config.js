const mongoose = require('mongoose');


if(process.env.MLABURL) 
module.exports.connect = mongoose.connect(process.env.MLABURL);
else 
module.exports.connect = mongoose.connect("mongodb://localhost:27016/flairbnb_reviews");

