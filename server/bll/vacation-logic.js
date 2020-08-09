const dal = require("../dal/dal.js");

async function getAllVacations() {
    const sql = `SELECT * FROM vacations`;
    const vacations = await dal.executeAsync(sql);
    return vacations;
};

async function addVacation(vacation, fileName) {
    const sql = `INSERT INTO vacations(description, destination, image, fromDate, toDate, price)
    VALUES ('${vacation.description}','${vacation.destination}','${fileName}','${vacation.fromDate}','${vacation.toDate}','${vacation.price}')`;
    const info = await dal.executeAsync(sql);
    vacation.id = info.insertId;
    return vacation;
};

async function updateVacation(vacation, fileName) {
    const sql = `UPDATE vacations 
    SET description='${vacation.description}' ,destination='${vacation.destination}',image='${fileName}',fromDate='${vacation.fromDate}',toDate='${vacation.toDate}' ,price='${vacation.price}' 
    WHERE id = '${vacation.id}'`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : vacation;
};

async function deleteVacation(id) {
    const sql = `DELETE FROM vacations WHERE vacations.id = ${id}`;
    await dal.executeAsync(sql);
};

async function isFollowExist(userId, vacationId) {
    const sql = `SELECT * FROM follows WHERE vacationId = ${vacationId} AND userId = ${userId} `;
    const follow = await dal.executeAsync(sql);
    if (follow.length > 0) {
        return true;
    }
    return false;
};

async function userFollowOnVacation(userId, vacationId) {
    const sql = `INSERT INTO follows(userId, vacationId) VALUES (${userId}, ${vacationId})`;
    const newFollow = await dal.executeAsync(sql);
    return newFollow;
};

async function getAmountFollowersOnVacation() {
    const sql = `SELECT vacations.id, follows.vacationId, COUNT(follows.userId) as usersCounter
    FROM vacations JOIN follows
    ON vacations.id = follows.vacationId
    GROUP BY vacations.id`;
    const followers = await dal.executeAsync(sql);
    return followers;
};

module.exports = {
    getAllVacations,
    addVacation,
    deleteVacation,
    updateVacation,
    userFollowOnVacation,
    getAmountFollowersOnVacation,
    isFollowExist
};