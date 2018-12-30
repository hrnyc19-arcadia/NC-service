const controller = require('../server/controller');
const Review = require('../server/db/schema');
const goose = require('mongoose')
const db = require('../server/db/config')


let testObject= {
  listing_id: 0,
  username : 'No1',
  date : 2017-01-01,
  message : 'this is a message',
  flagged : false,
  ratings:{
      accuracy: 5,
      communication: 5,
      cleanliness: 5,
      location: 5,
      checkin: 5,
      value: 5
  }
};


describe('should perform db transactions',()=>{

test('can store in db',()=>{
 expect(controller.storeAMockupReview(testObject).anything());
});
  

  test('can retrieve reviews', () => {
    expect(controller.get).toBe(3);
  });

});