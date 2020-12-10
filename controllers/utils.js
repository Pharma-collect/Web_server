
exports.validateEmail = function(mail) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}

exports.validatePhoneNumber = function(phone_number) {
    let regex = /^(0|(00|\+)33)[67][0-9]{8}$/;
    return regex.test(phone_number);
}

exports.newUsername = function(name, lastname, username) {
    let new_username;
    if (!username){
        new_username = name.concat('.', lastname.replace(/\s/g,"-")).toLowerCase();
    } else {
        new_username = username.replace(/\s/g,"-").toLowerCase();
    }

    return new_username;
}
