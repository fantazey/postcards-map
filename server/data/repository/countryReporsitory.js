class CountryRepository {
  /**
   *
   * @param {DataAccessAdapter} dataAccessAdapter
   */
  constructor(dataAccessAdapter) {
    this.daa = dataAccessAdapter;
  }

  createTable() {
    const sql = "CREATE TABLE IF NOT EXISTS country (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "name TEXT," +
      "code TEXT," +
      "status TEXT \"inactive\"" +
      ")";
    return this.daa.run(sql);
  }

  create(name, code) {
    const sql = "INSERT INTO country(name, code) VALUES (?,?)";
    return this.daa.run(sql, [name, code]);
  }
}

module.exports = CountryRepository;