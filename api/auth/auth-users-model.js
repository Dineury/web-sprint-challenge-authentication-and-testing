const db = require('../../data/dbConfig')

function getAll() {
    return db('users')
}

function findBy(filter) {
return db('users').where(filter)


}

async function insert(user) {
    return await db('users').insert(user).then(([id]) => {
        return  db('users').where('id', id).first()
    })
}



module.exports = {
    getAll,
    insert,
    findBy
}