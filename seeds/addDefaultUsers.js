const crypto = require('crypto');

exports.seed = async function seed(knex) {
  await knex('Users').del();

  const adminPassword = crypto.createHash('md5').update('admin').digest('hex');

  return knex('Users').insert([
    {
      id: 1, username: 'admin', email: 'admin@admin.com', password: adminPassword,
    },
  ]);
};
