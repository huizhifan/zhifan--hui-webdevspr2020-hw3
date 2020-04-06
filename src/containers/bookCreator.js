import React from "react";
import {connect} from 'react-redux';
import {createToRead} from "../actions/createBookActions";
import {createHaveRead} from "../actions/createBookActions";
import Axios from "axios";

class BookCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], windowWidth: document.body.clientWidth}
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleSize);
    }

    handleSize = () => {
        this.setState({
            windowWidth:document.body.clientWidth,
        });
    }

    requestBooks(request) {
        let q = "https://www.googleapis.com/books/v1/volumes?q=" + request.name + "+inauthor:" + request.author + "&key=" + "AIzaSyDdMv-nR0YirAk4T9o4eSpfRXaZNJUHn78";
        console.log(q)
        Axios.get(q)
            .then(response => {
                console.log(response)
                return response.data.items;
            })
            .then(items => {
                this.setState({
                    items: items
                });
                return items; //again, I can pass this object to the next then
            })
            .then(console.dir) // I'm leaving this in just so we can see the results!
            .catch(console.error);
    }

    _singleButton(item) {
        let w = this.state.windowWidth;
        let haveRead = "have read " + item.volumeInfo.title;
        let toRead = "to read " + item.volumeInfo.title;
        return (
            <div>
                <h6 key={item.volumeInfo.title}>{item.volumeInfo.title}</h6>
                <button type="submit" disabled={this.props.inFlight} style={{width: 0.5 * w}} onClick={() => this.props.sendHaveRead(item)}>{haveRead}</button>
                <button type="submit" disabled={this.props.inFlight} style={{width: 0.5 * w}} onClick={() => this.props.sendToRead(item)}>{toRead}</button>
            </div>);
    }

    _renderButton() {
        let w = this.state.windowWidth;
        return this.state.items.map(item => (this._singleButton(item)));
    }

    render() {
        const request = {};

        // if (this.props.requestStatus === "SUCCESS") {
        //     return <Redirect to={'/book'} />
        // }
        return (
            <div>
                <div>
                    <label>Book Name</label>
                    <div>
                        <input onChange={(e) => request.name = e.target.value} name="name" component="input" type="text"
                               placeholder="book name here..."/>
                    </div>
                    <label>author</label>
                    <div>
                        <input onChange={(e) => request.author = e.target.value} name="author" component="input" type="text" placeholder="Book author here..."/>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={this.props.inFlight} onClick={() => this.requestBooks(request)}>Submit</button>
                </div>
                <div>
                    {/*{this._renderBookNames()}*/}
                    {this._renderButton()}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        sendHaveRead: (book) => dispatch(createHaveRead(book)),
        sendToRead: (book) => dispatch(createToRead(book))
    }
};

function mapStateToProps(state, props) {
    return {
        requestStatus: state.createBook.requestStatus,
        inFlight: state.createBook.inFlight,
    }
};

export default BookCreator = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookCreator);