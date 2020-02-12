class FileRepository {
  /**
   *
   * @param {DataAccessAdapter} dataAccessAdapter
   */
  constructor(dataAccessAdapter) {
    this.daa = dataAccessAdapter;
  }

  createTable() {
    const sql = "CREATE TABLE IF NOT EXISTS file (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "path TEXT," +
      "postcard INTEGER NOT NULL," +
      "FOREIGN KEY(postcard) REFERENCES postcard(id)" +
      ")";
    return this.daa.run(sql);
  }

  create(filepath, postcard) {
    const sql = "INSERT INTO file(path, postcard) VALUES(?,?)";
    return this.daa.run(sql, [filepath, postcard])
  }
}

module.exports = FileRepository;