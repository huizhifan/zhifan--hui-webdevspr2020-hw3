import Axios from 'axios'

function requestNewBook() {
    return {
        type: "REQUEST_NEW_BOOK"
    }
}

function receiveNewBookSuccess(book) {
    return {
        type: "RESPONSE_NEW_BOOK_SUCCESS",
        book
    }
}

function receiveNewBookError() {
    return {
        type: "RESPONSE_NEW_BOOK_ERROR"
    }
}

function deleteHaveReadList(bookId) {
    return {
        type: "DELETE_HaveRead_LIST",
        bookId
    }
}

function deleteToReadList(bookId) {
    return {
        type: "DELETE_ToRead_LIST",
        bookId
    }
}

export function deleteHaveRead(bookId) {
    return function(dispatch) {
        dispatch(requestNewBook());
        return Axios.delete('api/book/haveread/' + bookId)
            .then(
                response => {
                    dispatch(receiveNewBookSuccess(response.data))
                },
                receiveNewBookError
            );
    }
}

export function deleteToRead(bookId) {
    return function(dispatch) {
        dispatch(requestNewBook());
        return Axios.delete('api/book/toread/' + bookId)
            .then(
                response => {
                    dispatch(receiveNewBookSuccess(response.data))
                },
                receiveNewBookError
            );
    }
}

export function createHaveRead(book) {
    return function(dispatch) {
        dispatch(requestNewBook());
        return Axios.post(`/api/book/haveread`, book)
            .then(
                response => {
                    // console.log(response);
                    dispatch(receiveNewBookSuccess(response.data))},
                receiveNewBookError
            );
    }
}

export function createToRead(book) {
    return function(dispatch) {
        dispatch(requestNewBook());
        return Axios.post(`/api/book/toread`, book)
            .then(
                response => {
                    // console.log(response)
                    dispatch(receiveNewBookSuccess(response.data))},
                receiveNewBookError
            );
    }
}