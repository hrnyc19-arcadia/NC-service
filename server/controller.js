
const db = require('./db/config');
const schema = require('./db/schema');



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

let newReview = {                 
    listing_id: JSONObj.listingId,
    username : JSONObj.user.name,
    date : JSONObj.user.date,
    message : JSONObj.user.message,
    flagged : JSONObj.flagged,
    ratings:{
        accuracy: JSONObj.ratings.accuracy,
        communication: JSONObj.ratings.communication,
        cleanliness: JSONObj.ratings.cleanliness,
        location: JSONObj.ratings.lication,
        checkin: JSONObj.ratings.checkin,
        value: JSONObj.ratings.value
    }               
}
if(newReview.flagged===null) newReview.flagged = false;

schema.findOneAndUpdate({_id:JSONObj.id},newReview,{upsert:true},(data=>{

    console.log('stored! :',data);
    callback(null,data);

}));
};
