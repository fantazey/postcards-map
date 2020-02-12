const sqlite3 = require('sqlite3');

class DataAccessAdapter {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.info('Connected to data base');
      }
    });
  }

  run(sql, params=[]) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          console.log(err.message);
          console.log(sql);
          return reject(err);
        }
        return resolve({result: 'done'});
      });
    });
  }

  get(sql, params=[]) {

  }
}

module.exports = DataAccessAdapter;