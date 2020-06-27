const BaseRepository = require('./baseRepository');

class CityRepository extends BaseRepository {
  get tableName() {
    return 'city';
  }

  get createTableSQL() {
    const sql = "CREATE TABLE IF NOT EXISTS city (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "name TEXT NOT NULL," +
      "status TEXT NOT NULL DEFAULT \"inactive\"," +
      "country INTEGER NOT NULL," +
      "FOREIGN KEY(country) REFERENCES country(id)" +
      ")";
    return sql;
  }

  /**
   * @param name
   * @param country
   * @inheritDoc
   */
  performCreateRecord({name, country}) {
    const sql = "INSERT INTO city(name, country) VALUES (?,?)";
    return this.daa.run(sql, [name, country]);
  }

  /**
   * @param {String} name
   */
  findRecordByName(name) {
    return this.findRecord({name});
  }
}

module.exports = CityRepository;
