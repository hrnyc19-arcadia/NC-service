import React from 'react';
import Review from './review.jsx';
import {Panel} from 'react-bootstrap';


class ReviewList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reviews: [],
            reviewsQty : 0,
            reviewsPerPage: 7,
            curPage : 1            
        }
    }
    componentDidMount(){
        this.setState({
            reviews:this.props.reviews,
            reviewsQty : this.props.reviews.length
        })
        if(window.screen.availHeight<500) this.setState({reviewsPerPage:5});
        console.log('height of screen:',window.screen.availHeight);
    }
    render(){
        if(this.state.reviewsQty>0){
        return (
            <div>
                {
                    this.state.reviews.map(review=>
                        (
                        <Panel id={review.id} className="reviewItemHolder" key={review.id}><Review review={review} getUserPhoto={this.props.getUserPhoto}/></Panel>
                        )
                        )
                }
            </div>
        )
            }else{
                return(<h2>No reviews to show at this time</h2>)
            }
    }
}

export default ReviewList;