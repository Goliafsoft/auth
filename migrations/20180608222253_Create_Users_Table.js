
exports.up = function up(knex) {
  return knex.schema.createTable('Users', (table) => {
    table.increments('id');
    table.string('username');
    table.string('email');
    table.string('password');
    table.enum('state', ['active', 'pending', 'disabled']);
    table.unique(['username', 'email']);
    table.timestamps();
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('Users');
};
