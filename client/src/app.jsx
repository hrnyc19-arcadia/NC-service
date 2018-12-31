import ReactDOM from 'react-dom';
import React from 'react';
import ReviewList from './components/reviewList.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listingId: null,
            reviews: null
        }
        this.getUserPhoto = this.getUserPhoto.bind(this);
    }
    getUserPhoto(reviewId, callback) {
        return fetch(`/user/photo?reviewId=${reviewId || 87}`
            , {
                method: 'GET',
                mode: 'no-cors',
                headers: { 'Content-Type': 'image.gif' }
            })
            .then(file => file.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(url => {
                console.log('url received: ', url)
                return url
            })
            // .then((img=>{
            //     console.log('image received :',img)
            //     return img.url;
            // }))
            .catch(unhandledException => console.log('error fetching photo:\n', unhandledException));
    }
    componentDidMount() {
        fetch(`/reviews?listing_id=${this.state.listingId || 87}`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'content-type': 'application/json' }
        })
            .then(response => response.json())
            .then(list => {
                console.log('data returned :', list);
                this.setState({ reviews: list })
            })
            .catch(unhandledException => console.log('error fetching reviews: \n', unhandledException));
    }
    render() {
        return (<div>
            {
                this.state.reviews !== null ?
                    <ReviewList reviews={this.state.reviews} getUserPhoto={this.getUserPhoto} />
                    : <h2>...Loading reviews</h2>
            }
        </div>)
    }
}


ReactDOM.render(<App />, document.getElementById('root'));