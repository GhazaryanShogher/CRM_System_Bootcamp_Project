export const localeSet = lang => {
    return {
        type: "LOCALE_SET",
        lang
    }
   
};

export const SetLocale = lang => dispatch => {
    dispatch(localeSet(lang));
};