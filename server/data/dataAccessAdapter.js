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

  /**
   * @param sql
   * @param params
   * @returns {Promise<{result: String, lastId: Number, changes}>}
   */
  run(sql, params=[]) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.log(sql);
          console.log(err.message);
          return reject(err);
        }
        return resolve({result: 'done', lastId: this.lastID, changes: this.changes});
      });
    });
  }

  get(sql, params=[]) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.log(sql);
          console.log(err.message);
          return reject(err);
        }
        return resolve(row);
      })
    });
  }

  all(sql) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          console.log(sql);
          console.log(err.message);
          return reject(err);
        }
        return resolve(rows);
      })
    });
  }

  close() {
    return this.db.close((err) => {
      if (err) {
        console.log(err.message);
      }
    })
  }
}

module.exports = DataAccessAdapter;
