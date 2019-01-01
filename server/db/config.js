const mongoose = require('mongoose');
const {MLABURL} = require('../../env_var')

if(process.env.MLABURL) 
module.exports.connect = mongoose.connect(process.env.MLABURL);
else 
module.exports.connect = mongoose.connect(MLABURL);
