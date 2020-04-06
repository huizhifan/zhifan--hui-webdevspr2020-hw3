import React from "react";
import {connect} from 'react-redux';
import {fetchHaveReadList} from "../actions/bookActions";
import {fetchToReadList} from "../actions/bookActions";
import {deleteHaveRead} from "../actions/createBookActions";
import {deleteToRead} from "../actions/createBookActions";

class BookListViewer extends React.Component {

    // componentDidMount executes AFTER the constructor
    // but before the component renders for the first time
    // and it is only called once in the lifespan of the object
    // so API calls are often made here
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        // Some simple loading code.  If we were working with a button
        // or other logic, we might want to disable it
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }
        const haveButtons = this.props.haveRead.map(book => (
            <button onClick={() => this.props.deleteHaveReadList(book.bookId)}>delete {book.title}</button>
        ))
        const toButtons = this.props.toRead.map(book => (
            <button onClick={() => this.props.deleteToReadList(book.bookId)}>delete {book.title}</button>
        ))
        return (<div>
            <h1>These are my to read list</h1>
            <div>{this._renderToReadBookList(this.props.toRead)}</div>
            <div>{toButtons}</div>
            <h1>These are my have read list</h1>
            <div>{this._renderHaveReadBookList(this.props.haveRead)}</div>
            <div>{haveButtons}</div>
        </div>);
    }

    _renderHaveReadBook(book) {
        return <tr key={book.bookId}>
                <td style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>{book.title}</td>
                <td style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>{book.authors}</td>
               </tr>

    }

    _renderToReadBook(book) {
        return <tr key={book.bookId}>
            <td style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>{book.title}</td>
            <td style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>{book.authors}</td>
        </tr>
    }

    // _renderHaveButtons(book) {
    //     return <button onClick={() => this.props.deleteHaveReadList(book.bookId)}>delete {book.title}</button>
    // }
    //
    // _renderToButtons(book) {
    //     return <button onClick={() => this.props.deleteToReadList(book.bookId)}>delete {book.title}</button>
    // }

    _renderHaveReadBookList(booklist) {
        if (!booklist || booklist.length === 0) {
            return null;
        }

        const bookRows = booklist.map(book => (this._renderHaveReadBook(book)));
        return (<table>
            <thead>
            <tr>
                <th style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>Title</th>
                <th style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>Authors</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </table>)
    }

    _renderToReadBookList(booklist) {
        if (!booklist || booklist.length === 0) {
            return null;
        }

        const bookRows = booklist.map(book => (this._renderToReadBook(book)));
        return (<table>
            <thead>
            <tr>
                <th style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>Title</th>
                <th style={{"borderWidth":"3px", 'backgroundColor':"#aaaaaa", 'borderStyle':'solid'}}>Authors</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </table>)
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onMount: () => {
            // thunk middleware simplifies a lot of the logic
            // but the idea is to treat thunk action creators
            // like normal action creators (thanks to the help
            // of the thunk middleware)
                dispatch(fetchToReadList());
                dispatch(fetchHaveReadList());
        },
        deleteHaveReadList: (bookId) => {
            dispatch(deleteHaveRead(bookId));
            dispatch(fetchHaveReadList());
        },
        deleteToReadList: (bookId) => {
            dispatch(deleteToRead(bookId));
            dispatch(fetchToReadList());
        }
    }
};


// Accept the state and parse out whatever data we need
function mapStateToProps(state, props) {
    return {
        toRead: state.books.toReadList,
        haveRead: state.books.haveReadList,
        loading: state.books.inFlight,
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookListViewer)