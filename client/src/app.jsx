import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import popper from 'popper.js';
import ReviewList from './components/reviewList.jsx';
import Highlights from './components/highlights.jsx';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listingId: null,
            reviewsQty:0,
            reviews: null,
            ratings:{}            
        }
        this.getUserPhoto=this.getUserPhoto.bind(this);
    }
    getUserPhoto(reviewId,callback){
       return fetch(`/user/photo?reviewId=${reviewId||87}`
       ,{
            method: 'GET',
            mode:'no-cors',
            // headers:{'Content-Type': 'image/png'}           
        })
        .then(file=>file.arrayBuffer())
        .then(buffer=>{
            let arrayBufferView = new Uint8Array( buffer);
            let blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
            let urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            console.log('blob received: ',imageUrl)
            callback(imageUrl)
        })
            // blob=>URL.createObjectURL(blob))
           
        .catch(unhandledException=>console.log('error fetching photo:\n',unhandledException));
    }    
    componentDidMount(){
        fetch(`/reviews?listing_id=${this.state.listingId||87}`,{
            method: 'GET',
            mode:'cors',
            headers:{'content-type':'application/json'}           
        })
        .then(response=>response.json())
    .then(list=>{
        console.log('data returned :',list);        
        this.setState({
            reviews:list,
            reviewsQty: list.length,
            ratings: {
                accuracy: list.reduce((acc,cur)=>acc+cur.ratings.accuracy,0)/list.length,
                communication: list.reduce((acc,cur)=>acc+cur.ratings.communication,0)/list.length,
                cleanliness: list.reduce((acc,cur)=>acc+cur.ratings.cleanliness,0)/list.length,
                location: list.reduce((acc,cur)=>acc+cur.ratings.location,0)/list.length,
                checkin: list.reduce((acc,cur)=>acc+cur.ratings.checkin,0)/list.length,
                value: list.reduce((acc,cur)=>acc+cur.ratings.value,0)/list.length,                
            }
            
        })

        console.log('ratings:')
        console.log('accuracy:',this.state.ratings.accuracy)
        console.log('communication:',this.state.ratings.communication)
        console.log('cleanliness:',this.state.ratings.cleanliness)
        console.log('location:',this.state.ratings.location)
        console.log('checkin:',this.state.ratings.checkin)
        console.log('value:',this.state.ratings.value)
        
        })  
    .catch(unhandledException=>console.log('error fetching reviews: \n',unhandledException));
}
    render(){
        let {reviews,reviewsQty,ratings} = this.state;
        if(reviews===null){
            return (<h2>...Loading reviews</h2>)
        }else{
        return(<div className="rootDiv">                           
                <Highlights reviewsQty={reviewsQty} ratings={ratings}/>
                 <ReviewList reviews={reviews} getUserPhoto={this.getUserPhoto} />        
            </div>)
        }
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));




