import React from 'react';
import Review from './review.jsx';


class ReviewList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reviews: [],
            reviewsQty : 0,
            curPage : 1            
        }
    }
    componentDidMount(){
        this.setState({
            reviews:this.props.reviews,
            reviewsQty : this.props.reviews.length
        })
    }
    render(){
        if(this.state.reviewsQty>0){
        return (
            <div>
                {
                    this.state.reviews.map(review=>
                        (
                        <div id={review.id} key={review.id}><Review review={review} getUserPhoto={this.props.getUserPhoto}/></div>
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