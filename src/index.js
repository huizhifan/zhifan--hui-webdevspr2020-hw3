import React from 'react';
import ReactDOM from 'react-dom';

import FoodListViewer from './containers/foodList'
import FoodCreator from './containers/foodCreator'
import BookCreator from './containers/bookCreator'
import BookListViewer from "./containers/bookList";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers";
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect
} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/book/create" component={BookCreator}/>
                <Route path="/book" component={BookListViewer} />
                <Redirect exact from="/" to="book" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);