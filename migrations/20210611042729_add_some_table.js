
exports.up = function(knex) {
    return knex.schema.createTable('bookmarks', table => {
        table.increments('id').primary();
        table.string('title');
        table.string('url');
        table.integer('userId').references('id').inTable('users');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bookmarks');
};