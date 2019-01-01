import React from 'react';
import { Table, Glyphicon,Panel } from 'react-bootstrap';

const getStars = function (rating) {
    return (
        <div className="stars" style={{ width: `${rating * 90 / 5}px`, height: '20px', overflow: 'hidden' }}>
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
            <Glyphicon glyph="star" />
        </div>
    )
}

const Highlights = function (props) {


    let score = Object.values(props.ratings).reduce((acc, cur) => acc + cur, 0) / 6 || 0;

    let { accuracy, communication, cleanliness, location, checkin, value } = props.ratings;
    return (
        <div>
            <Panel className="pnlHighlights">
            <Table  className="tblHighlights">
                <td>{props.reviewsQty} Reviews </td><td style={{position:"left"}}>{getStars(score*1.15)} </td>
            </Table>
            </Panel>
            <Panel className="tblRatings">
            <Table stripped responsive>
                <tr>
                    <td>Accuracy</td><td>{getStars(accuracy)}</td>
                    <td>Location</td><td>{getStars(location)}</td>
                </tr>
                <tr>
                    <td>Communication</td><td>{getStars(communication)}</td>
                    <td>Check-in</td><td>{getStars(checkin)}</td>
                </tr>
                <tr>
                    <td>Cleanliness</td><td>{getStars(cleanliness)}</td>
                    <td>Value</td><td>{getStars(value)}</td>
                </tr>
            </Table>
            </Panel>
        </div>
    )

}


export default Highlights;