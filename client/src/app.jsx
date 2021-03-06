import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './components/reviewList.jsx';
import Highlights from './components/highlights.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listingId: null,
            reviewsQty: 0,
            reviews: null,
            ratings: {}
        }
        this.getUserPhoto = this.getUserPhoto.bind(this);
    }
    getUserPhoto(reviewId, callback) {
        return fetch(`/user/photo?reviewId=${reviewId || 87}`
            , {
                method: 'GET',
                mode: 'no-cors',
                // headers:{'Content-Type': 'image/png'}           
            })
            .then(file => file.arrayBuffer())
            .then(buffer => {
                let arrayBufferView = new Uint8Array(buffer);
                let blob = new Blob([arrayBufferView], { type: "image/png" });
                let urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                callback(imageUrl)
            })
            .catch(unhandledException => console.log('error fetching photo:\n', unhandledException));
    }
    componentDidMount() {
        let listingId;
        try{
        listingId=parseInt(window.location.href.split('?')[1]);
        }catch(unacceptedURLException){
            console.log('unacceptedURLException: param not accepted: ',parseInt(window.location.href.split('?')[1]));   
            listingId=0;         
        }
        
        console.log('listing requested: ',listingId)
        fetch(`/reviews?listing_id=${listingId}`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'content-type': 'application/json' }
        })
            .then(response => response.json())
            .then(list => {
                console.log('data returned :', list);
                this.setState({
                    reviews: list,
                    reviewsQty: list.length,
                    ratings: {
                        accuracy: list.reduce((acc, cur) => acc + cur.ratings.accuracy, 0) / list.length,
                        communication: list.reduce((acc, cur) => acc + cur.ratings.communication, 0) / list.length,
                        cleanliness: list.reduce((acc, cur) => acc + cur.ratings.cleanliness, 0) / list.length,
                        location: list.reduce((acc, cur) => acc + cur.ratings.location, 0) / list.length,
                        checkin: list.reduce((acc, cur) => acc + cur.ratings.checkin, 0) / list.length,
                        value: list.reduce((acc, cur) => acc + cur.ratings.value, 0) / list.length,
                    }                
                })            
            })
            .catch(unhandledException => console.log('error fetching reviews: \n', unhandledException));
           
            
    }
    render() {
        let { reviews, reviewsQty, ratings } = this.state;
        if (reviews === null) {
            return (<h2>...Loading reviews</h2>)
        } else {
            return (<div className="rootDiv">
                <Highlights reviewsQty={reviewsQty} ratings={ratings} />
                <ReviewList reviews={reviews} getUserPhoto={this.getUserPhoto} />
            </div>)
        }
    }
}

ReactDOM.render(<App />, document.getElementById('rootReviews'));




