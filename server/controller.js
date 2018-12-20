
const db = require('./db/config');
const Review = require('./db/schema');



module.exports.getReviews=function(listingId,callback){
    console.log('getReviews called, listindId:',listingId);
    
    db.connect;
    
    schema.find({listing_id: listingId},{sort:{date_added:-1}},((err, data)=>{
    if(err) callback(err)
    else{
        console.log('data retrieved: ',data);
        callback(null,data);
    }
}))
}

module.exports.storeAMockupReview=function(JSONObj,callback){
db.connect;
console.log(JSONObj);

let newReview = new Review({ 
    // _id =  JSONObj._id,         
    listing_id: JSONObj.listingId,
    username : JSONObj.user.name,
    date : JSONObj.user.date,
    message : JSONObj.user.message,
    flagged : JSONObj.flagged,
    ratings:{
        accuracy: JSONObj.ratings.accuracy,
        communication: JSONObj.ratings.communication,
        cleanliness: JSONObj.ratings.cleanliness,
        location: JSONObj.ratings.location,
        checkin: JSONObj.ratings.checkin,
        value: JSONObj.ratings.value
    }               
});
// delete newReview._id;
if(newReview.flagged===null) newReview.flagged = false;
try{

callback(null,newReview.save());
}catch(exception){
    console.log(exception);
    callback(excetion);
}

};
