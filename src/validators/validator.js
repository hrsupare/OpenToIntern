//========================================useful functions for Validations:=============================================

//college full name validation
function isCollegeFullName(x){
    if(!x) return false;
    const strregEx = /^\s*(?=[A-Za-z])[a-zA-Z\s\.\,]{4,}\s*$/;     //it will also handle strings of only spaces "   " 
    return strregEx.test(x);
}

//abbreviation validation
function isCollegeName(x){
    if(!x) return false;
    const strregEx = /^\s*[a-zA-Z]{2,}\s*$/;
    return strregEx.test(x);
}


function isLinkValid(x) {
    if(!x) return false;   
    const linkRegex = /(http(s?):)[/]{2}[\w]+([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/;
    return x.match(linkRegex); 
}

//email validation
function isEmail(x){
    if(!x) return false;
    const arr = x.trim().split("@");
    if(arr[0] && arr[0].length >64) return false;   //in case user not give @, then arr[0] will be undefined, so...
    if(arr[1] && arr[1].length >255) return false;

    const regEx = /^\s*[a-zA-Z0-9]+([\.\_\-][a-zA-Z0-9]+)*@[a-z]+([\.\_\-][a-zA-Z0-9]+)*\.[a-z]{2,3}\s*$/;
    return regEx.test(x);
}


//mobile validation
function isMobile(x){
    if(!x) return false;
    const regEx = /^\s*(?=[6789])[0-9]{10}\s*$/;
    return regEx.test(x);
}


module.exports = {isCollegeFullName, isCollegeName, isLinkValid, isEmail, isMobile};



