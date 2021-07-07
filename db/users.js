const bcrypt = require('bcrypt');
const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        options: {
            port: 1433,
            instanceName: 'SQLEXPRESS'
        }
    }
});

const add = async user => {
    const hash = await bcrypt.hash(user.password, 10);
    delete user.password;
    user.passwordHash = hash;
    await knex('users').insert(user);
}

const login = async (email, password) => {
    const results = await knex('users').where('email', email);
    if(!results.length) {
        return null;
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch ? user : null;
}

module.exports = {
    add,
    login
}