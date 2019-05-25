import {english, armenian}  from '../Actions/actions';

 const initialState = {
    en: {
        addContact: "Add to Contact",
        sendEmail: "Send Email"
    },
    am: {
        addContact: "Ավելացնել կոնտակտ",
        sendEmail: "Ուղղարկել հաղորդագրություն"
    },
    data: ""
}

 export default function reducer (state = initialState, action){
    switch(action.type){
        case 'EN' :
    return {data: state.en};
        case 'AM':
        return {data: state.am};
        default:
    return state;
    }
}



