import React from 'react';
import Review from './review.jsx';
import { Panel } from 'react-bootstrap';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            reviewsQty: 0,
            reviewsPerPage: 7,
            curPage: 1,
            totalPages: 1
        }
        this.changePage = this.changePage.bind(this);
    }
    changePage(page) {
        this.setState({ curPage: page })
    }
    componentDidMount() {
        this.setState({
            reviews: this.props.reviews,
            reviewsQty: this.props.reviews.length
        }, () => {

            let { reviewsQty, reviewsPerPage } = this.state;
            if (reviewsQty % reviewsPerPage === 0) this.setState({ totalPages: reviewsQty / reviewsPerPage });
            else this.setState({ totalPages: Math.floor(reviewsQty / reviewsPerPage) + 1 });
        })
        if (window.screen.availHeight < 500) this.setState({ reviewsPerPage: 5 });
        console.log('height of screen:', window.screen.availHeight);
    }
    render() {
        let { reviews, reviewsQty, reviewsPerPage, curPage, totalPages } = this.state;
        let lastReviewToDisplay = curPage * reviewsPerPage;
        if (this.state.reviewsQty > 0) {
            return (
                <div>
                    {
                        reviews.slice(lastReviewToDisplay - reviewsPerPage + 1, lastReviewToDisplay)
                            .map(review =>
                                (
                                    <Panel id={review.id} className="reviewItemHolder" key={review.id}
                                    ><Review review={review} getUserPhoto={this.props.getUserPhoto} />
                                    </Panel>
                                )
                            )
                    }
                    <Pagination /*className="pagination pagination-circle pg-blue justify-content-end"*/
                        activePage={curPage}
                        itemsCountPerPage={reviewsPerPage}
                        totalItemsCount={reviewsQty}
                        pageRangeDisplayed={7}
                        onChange={(e) => this.changePage(e)}
                        firstPageText={1}
                        lastPageText={totalPages}
                    />
                </div>
            )
        } else {
            return (<h2>No reviews to show at this time</h2>)
        }
    }
}

export default ReviewList;