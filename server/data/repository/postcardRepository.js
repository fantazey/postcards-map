class PostcardRepository {
  /**
   *
   * @param {DataAccessAdapter} dataAccessAdapter
   */
  constructor(dataAccessAdapter) {
    this.daa = dataAccessAdapter;
  }

  createTable() {
    const sql = "CREATE TABLE IF NOT EXISTS postcard (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "code TEXT," +
      "city INTEGER," +
      "country INTEGER NOT NULL," +
      "user INTEGER NOT NULL," +
      "status TEXT DEFAULT \"inactive\"," +
      "FOREIGN KEY(country) REFERENCES country(id)," +
      "FOREIGN KEY(city) REFERENCES city(id)," +
      "FOREIGN KEY(user) REFERENCES user(id)" +
      ")";
    return this.daa.run(sql);
  }

  create(user, code, city, country) {
    const sql = "INSERT INTO postcard(user, code, country, city) " +
      "VALUES (?,?,?,?)";
    return this.daa.run(sql, [user, code, country, city]);
  }
}

module.exports = PostcardRepository;