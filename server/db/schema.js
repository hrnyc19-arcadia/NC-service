const goose = require('mongoose');
const Schema = require('mongoose').Schema;

const reviewSchema = new Schema ({
    // _id: Object,          //in case the user updates it it has to be provided to the client
    listing_id: Object,
    username : String,
    date : Date,
    message : String,
    flagged : Boolean,
    ratings:{
        accuracy: Number,
        communication: Number,
        cleanliness: Number,
        location: Number,
        checkin: Number,
        value: Number
    }
});

module.exports = goose.model('flairbnb_reviews',reviewSchema);