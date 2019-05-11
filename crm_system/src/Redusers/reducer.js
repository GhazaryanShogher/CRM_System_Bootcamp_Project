import {get, del}  from '../Actions/actions';
import { createStore } from 'redux';
import locale from '../Actions/locale';
import {combineReducers} from 'redux';


const initialState = { lang:"en" };

export default function reducer (state = initialState, action){
    switch(action.type){
        case 'GET' :
    return { result: state.result + 1};
        case 'DELETE':
        return { result: state.result - 1};
        case "LOCALE_SET":
        return {lang: action.lang}
        default:
    return state;
    }
     
}


