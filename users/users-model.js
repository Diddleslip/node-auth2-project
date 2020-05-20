const db = require("../config/db-config");

module.exports = {
    add,
    find,
    findBy,
    findByDepartment,
    findById,
}

function find() {
    return db("users")
    .orderBy("id")
}

function findBy(filter) {
    return db("users")
    .where(filter)
    .orderBy("id")
}

function findByDepartment(department) {
    return db("users")
    .where({department})
}

function findById(id) {
    return db("users")
    .where({id})
    .first()
}

async function add(user) {
    // try {
    //     const [id] = await db("users").insert(user, "id")

    //     return findById(id) 
    // } catch(error) {
    //     throw error;
    // }

    return db("users")
    .insert(user, "id")
    .then(id => {
        // console.log(id[0])
        return findById(id[0])
    })
}
