class UserRepository {
  /**
   *
   * @param {DataAccessAdapter} dataAccessAdapter
   */
  constructor(dataAccessAdapter) {
    this.daa = dataAccessAdapter;
  }

  createTable() {
    const sql = "CREATE TABLE IF NOT EXISTS user (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "username TEXT NOT NULL," +
      "password TEXT NOT NULL," +
      "first_name TEXT," +
      "last_name TEXT," +
      "status TEXT DEFAULT \"inactive\"," +
      "role TEXT DEFAULT \"user\"," +
      "email TEXT," +
      "FOREIGN KEY(country) REFERENCES country(id)," +
      "FOREIGN KEY(city) REFERENCES city(id)" +
      ")";
    return this.daa.run(sql);
  }

  create(username, password, first_name, last_name, email) {
    const sql = "INSERT INTO " +
      "user(username, password, first_name, last_name, email) " +
      "VALUES (?,?,?,?,?)"
  }
}

module.exports = UserRepository;