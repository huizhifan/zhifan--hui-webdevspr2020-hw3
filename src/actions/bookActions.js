import Axios from 'axios'

function requestToReadList() {
    return {
        type: "REQUEST_ToRead_LIST"
    }
}

function receiveToReadList(bookList) {
    return {
        type: "RECEIVE_ToRead_LIST",
        bookList
    }
}

function requestHaveReadList() {
    return {
        type: "REQUEST_HaveRead_LIST"
    }
}

function receiveHaveReadList(bookList) {
    return {
        type: "RECEIVE_HaveRead_LIST",
        bookList
    }
}

export function fetchToReadList() {
    return function(dispatch) {
        // Before we do anything, we let the state know
        // that we're requesting the food list but that it hasn't loaded yet
        // This lets us do any load animation or disable important functionality
        dispatch(requestToReadList());
        // Axios is a just an easy way to make an API call
        // Remember how we set the proxy in package.json?
        // This prefills that so it communicates with the server
        return Axios.get(`/api/book/toread`) // We used Axios last week!
            // Once Axios is done GETTING the request, we can pass the data to another
            // action creator and dispatch that
            .then(response => {
                console.log(response);
                dispatch(receiveToReadList(response.data))},
                // A better option might be to emit an  action with type 'error' to let users
                // know that something went wrong.
                error => console.log('An error occurred.', error) // Note that errors should be handled in the
                // second argument, not via catch, when using
                // thunk
            );
    }
}

export function fetchHaveReadList() {
    return function(dispatch) {
        // Before we do anything, we let the state know
        // that we're requesting the food list but that it hasn't loaded yet
        // This lets us do any load animation or disable important functionality
        dispatch(requestHaveReadList());
        // Axios is a just an easy way to make an API call
        // Remember how we set the proxy in package.json?
        // This prefills that so it communicates with the server
        return Axios.get(`/api/book/haveread`) // We used Axios last week!
            // Once Axios is done GETTING the request, we can pass the data to another
            // action creator and dispatch that
            .then(response => {
                console.log(response);
                dispatch(receiveHaveReadList(response.data))},
                // A better option might be to emit an  action with type 'error' to let users
                // know that something went wrong.
                error => console.log('An error occurred.', error) // Note that errors should be handled in the
                // second argument, not via catch, when using
                // thunk
            );
    }
}