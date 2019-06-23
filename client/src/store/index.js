import {createStore, applyMiddleware} from "redux";
import thunk  from "redux-thunk";
import rootReduser from "./redusers/";
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

const store = createStore(rootReduser,  composeWithDevTools(applyMiddleware(...middleware)));

export default store;