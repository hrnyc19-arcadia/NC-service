const fs = require('fs');
const storeAMockupReview = require('./controller').storeAMockupReview;


;( function() {
    let reviewArr;
    fs.readFile('./server/db/MOCK_DATA.json',(err, json)=>{
        if (err) {
            throw err;
        }
        reviewArr =JSON.parse(json.toString());     
        console.log(reviewArr);  
         

        reviewArr.forEach(JSONObj=> storeAMockupReview(JSONObj,(err,data)=>{
           if(err)console.log(err);
           else console.log('freshly baked in db: ',data);
            
       }));  
      
    });

})();