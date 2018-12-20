const express= require('express');
const app = express();
const path = require('path');   
const controller = require('./controller');


let port=null;
if(process.env.HEROKU) port = process.env.HEROKU;
else port = 3004;


app.use(express.static(path.join(__dirname,'../client/dist')));


app.get('/',(req,res)=> res.sendStatus(200));

app.get('/reviews', (req, res) =>{
    console.log('query param of request: ',req.query);   
    controller.getReviews(parseInt(req.query.listing_id),(err,data)=>{
         if(err) {
            console.log(err);
            res.sendStatus(402);
        } else{
            res.send(data);
        }
    }) 
});

app.get('/user/photo',(req,res)=>{
    console.log('photo requested');
    let randomInt = Math.floor(Math.random()*10)
    console.log(randomInt);
    
    try{
        res.sendFile(path.join(__dirname,`../resources/photos/${randomInt}.png`));
    }catch(exception){
        console.log(exception);
        res.sendStatus(501);
    }
       
    
})
app.listen(port,()=>console.log('listening on port ',port));