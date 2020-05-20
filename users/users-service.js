module.exports = {
    isValid,
    logIn,
};

function isValid(user) {
    return Boolean(user.username && user.password && user.department && typeof user.password === "string");
}

function logIn(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
}