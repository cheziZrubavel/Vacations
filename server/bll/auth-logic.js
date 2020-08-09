const dal = require("../dal/dal.js");

// Get user from the database: 
async function isUserExist(username, password) {
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    const user = await dal.executeAsync(sql);
    let resultsLength = user.length;
    if (resultsLength > 0) {
        return user;
    }
    return false;
}

async function registerUser(firstName, lastName, username, password) {
    const sql = `INSERT INTO users (firstName, lastName, username, password) 
    VALUES ('${firstName}','${lastName}','${username}','${password}') `;
    const user = await dal.executeAsync(sql);
    return user;
}

async function isUsernameAlreadyExist(username) {
    const sql = "SELECT 1 FROM users WHERE username = '" + username + "' ";
    const queryUsernameExists = await dal.executeAsync(sql);
    let resultsLength = queryUsernameExists.length;
    if (resultsLength > 0) {
        return true;
    }
    return false;
}

async function vacationsBySingleUser(userId) {
    const sql = `SELECT vacations.id  
                FROM vacations 
                JOIN follows 
                ON vacations.id = follows.vacationId
                WHERE follows.userId = '${userId}'`;

    const user = await dal.executeAsync(sql);
    return user;
}

module.exports = {
    isUserExist,
    registerUser,
    isUsernameAlreadyExist,
    vacationsBySingleUser
};