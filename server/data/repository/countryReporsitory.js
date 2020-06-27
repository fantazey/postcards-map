const BaseRepository = require('./baseRepository');

/**
 * @class CountryRepository
 * @extends BaseRepository
 */
class CountryRepository extends BaseRepository {
  get tableName() {
    return 'country';
  }

  get createTableSQL() {
    const sql = "CREATE TABLE IF NOT EXISTS country (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "name TEXT NOT NULL," +
      "code TEXT NOT NULL," +
      "status TEXT NOT NULL DEFAULT \"inactive\"" +
      ")";
    return sql;
  }

  /**
   * @param name
   * @param code
   * @inheritDoc
   */
  performCreateRecord({name, code}) {
    const sql = "INSERT INTO country(name, code) VALUES (?,?)";
    return this.daa.run(sql, [name, code]);
  }

  async findRecordByName(name) {
    return this.findRecord({name});
  }
}

module.exports = CountryRepository;
