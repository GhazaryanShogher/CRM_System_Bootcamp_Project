// import {get, del}  from '../Actions/actions';
// import { createStore } from 'redux';


 const initialState = {
    result: 11
    }

 export default function reducer (state = initialState, action){
    switch(action.type){
        case 'GET' :
    return { result: state.result + 1};
        case 'DELETE':
        return { result: state.result - 1}
        default:
    return state;
    }
     
}



