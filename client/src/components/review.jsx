import React from 'react';
import { Image, Glyphicon } from 'react-bootstrap';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewId: null,
            username: null,
            photo: null,
            date: null,
            message: "",
            showAll: true,
        }
    }
    componentDidMount() {

        let { id, username, message, date } = this.props.review;
        this.setState({
            reviewId: id,
            username: username,
            message: message,
            photoSrc: {}

        }, () => {
            if (message.length > 290) this.setState({ showAll: false });
        })
        let unformattedDate = new Date(date);
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][unformattedDate.getMonth()];
        this.setState({ date: `${month} ${unformattedDate.getFullYear()}` })
        this.props.getUserPhoto(id, blob => {
            this.setState({ photoSrc: blob })
        })
    }
    render() {
        let { id, username, photoSrc, date, message } = this.state;
        return (
            <div>
                <div>
                    <a ref="#" id={id} className="imageHolder">
                        <Image circle responsive alt={`${username} user profile`} src={photoSrc} className="userPhoto" />
                    </a>
                    <a ref='#' className="flag">
                        <Glyphicon glyph="flag" />
                    </a>
                    <br />
                    <span className="user"><strong>   {username}</strong></span>
                    <br />
                    <span className="user">   {date}</span>
                </div>
                <br /> <br />
                {this.state.showAll ? message : message.substring(0, 280) + "..."}
                {!this.state.showAll ? (<a href="#" onClick={() => this.setState({ showAll: true })} >Read more</a>) : null}
            </div>
        )
    }
}

export default Review;