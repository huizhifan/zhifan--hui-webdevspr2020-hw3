// Note that I'm putting ALL my reducers into a single
// file.  Typically, you want to to separate these out
// into smaller files.
import { combineReducers } from 'redux'
import createFood from "./createFoodReducer";
import createBook from "./createBookReducers";

function bookList(
    state = {
        inFlight: false,
        toReadList: [],
        haveReadList: [],
    },
    action
) {
    switch (action.type) {
        case "REQUEST_ToRead_LIST":
            return Object.assign({}, state, {
                inFlight: true,
            });
        case "RECEIVE_ToRead_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                toReadList: action.bookList,
            });
        case "REQUEST_HaveRead_LIST":
            return Object.assign({}, state, {
                inFlight: true,
            });
        case "RECEIVE_HaveRead_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                haveReadList: action.bookList,
            });
        default:
            return state;
    }
}

function foodList(
    state = {
        inFlight: false,
        list: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_FOOD_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_FOOD_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.foodList,
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    createFood,
    foods: foodList,
    createBook,
    books: bookList,
});

export default rootReducer