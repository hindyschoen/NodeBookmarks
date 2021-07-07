
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

const add=async (bookmark)=>{
    await knex ('bookmarks').insert(bookmark);
}

const getBookmarks=async id=>{
   return await knex('bookmarks').where('userId',id).select('*');
}

const updateTitle = async ({title, id}) => {
    await knex('bookmarks').update('title', title).where('id', id);
}

const deleteBookmark = async ({bookmarkId}) => {
    await knex('bookmarks').where('id', bookmarkId).del();
}
const topFive=async ()=>{
    return await knex.from('bookmarks').select({url: 'url'}).count({count: 'url'}).groupBy('url').orderBy('count', 'desc').limit(5);
 }

module.exports={
    add,
    getBookmarks,
    updateTitle,
    deleteBookmark,
    topFive
}