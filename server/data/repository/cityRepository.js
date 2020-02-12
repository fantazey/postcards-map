class CityRepository {
  /**
   *
   * @param {DataAccessAdapter} dataAccessAdapter
   */
  constructor(dataAccessAdapter) {
    this.daa = dataAccessAdapter;
  }

  createTable() {
    const sql = "CREATE TABLE IF NOT EXISTS city (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "name TEXT," +
      "status TEXT DEFAULT \"inactive\"," +
      "country INTEGER NOT NULL," +
      "FOREIGN KEY(country) REFERENCES country(id)" +
      ")";
    return this.daa.run(sql);
  }

  create(name, country) {
    const sql = "INSERT INTO city(name, country) VALUES (?,?)";
    return this.daa.run(sql, [name, country]);
  }
}

module.exports = CityRepository;