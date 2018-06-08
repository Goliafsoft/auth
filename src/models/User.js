const crypto = require('crypto');
const pg = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres@localhost:5432/postgres',
  searchPath: ['knex', 'public'],
});


class User {
  constructor() {
    this.pg = pg;
  }

  async findOne(username) {
    const [user] = await this.pg.select().from('Users').where({
      username,
    });
    this.user = user;
    return user;
  }

  verifyPassword(password) {
    const hash = crypto.createHash('md5').update(password).digest('hex');
    return this.user.password === hash;
  }
}


module.exports = User;
