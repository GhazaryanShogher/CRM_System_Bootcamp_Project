import {combineReducers} from "redux";
import locale from "./locale";
import { createStore } from 'redux';
import reducer from "./reducer"

export default combineReducers({
    locale,
    reducer
})