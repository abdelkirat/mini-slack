import thunk from 'redux-thunk';
import logger from "redux-logger";
import {createStore, combineReducers, applyMiddleware } from "redux";

let reducers = combineReducers(
    {
        TODO:TODO,
    }
);
let middleware = [thunk, logger]
let store = createStore(reducers, ...applyMiddleware(logger));


export default store;
