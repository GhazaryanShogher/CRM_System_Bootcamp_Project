export const localeSet =  (lang) => {
    return {
        type: "LOCALE_SET",
        lang
    }   
};

export const setLocale = lang =>  (dispatch) => {
    localStorage.alhubLang = lang;
    dispatch(localeSet(lang));
    
};