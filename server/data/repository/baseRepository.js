class BaseRepository {
  /**
   * @protected
   * @type {DataAccessAdapter}
   */
  daa = null;

  /**
   * @param {DataAccessAdapter} dataAccessAdapter
   */
  constructor(dataAccessAdapter) {
    this.daa = dataAccessAdapter;
  }

  get createTableSQL() {
    throw new Error("Override this property");
  }

  get tableName() {
    throw new Error("Override this property");
  }

  /**
   * @returns {Promise<unknown>}
   */
  createTable() {
    return this.daa.run(this.createTableSQL);
  }

  /**
   * @abstract
   * @param {Object} params
   * @returns {Promise<Object>}
   */
  async createRecord(params) {
    await this.checkRecordExist(params);
    const result = await this.performCreateRecord(params);
    return await this.findRecord({id: result.lastId});
  }

  /**
   * @protected
   * @param {Object} params
   * @returns {Promise<void>}
   */
  async checkRecordExist(params) {
    const rec = await this.findRecord(params);
    if (rec) {
      throw new Error('record exist');
    }
  }

  /**
   * @protected
   * @abstract
   * @param params
   * @returns {Promise<{lastId: String, result: String, changes}>}
   */
  async performCreateRecord(params) {}

  /**
   * Query single record using parameter as (field = value) filter
   * @param {Object} filter
   * @returns {Promise<Object>}
   */
  async findRecord(filter) {
    const where = [];
    const params = [];
    Object.keys(filter).forEach(key => {
      where.push(`${key} = ?`);
      params.push(filter[key]);
    });
    const sql = `SELECT * FROM ${this.tableName} WHERE ${where.join(' and ')}`;
    return await this.daa.get(sql, params);
  }

  /**
   * @param id
   * @returns {Promise<Object>}
   */
  findRecordById(id) {
    return this.findRecord({id});
  }

  /**
   * Query list of records
   * @param {Number} limit
   * @param {Number} offset
   * @param {{field:String, direction: String}} order - field and direction for sorting
   * @throws Error
   * @returns {Promise<Object[]>}
   */
  async findAll(limit, offset, {field, direction}) {
    const orderField = field || 'id';
    const orderDirection = direction || 'asc';
    if ((typeof limit).toLowerCase() !== 'number' || limit < 0) {
      throw new Error('Incorrect input parameter: limit');
    }
    if ((typeof offset).toLowerCase() !== 'number' || offset < 0) {
      throw new Error('Incorrect input parameter: offset');
    }
    const sql = `SELECT * FROM ${this.tableName}      
     ORDER BY ${orderField} ${orderDirection} 
     LIMIT ${limit} 
     OFFSET ${offset};`;
    return await this.daa.all(sql);
  }

  /**
   * Count rows in table
   * @returns {Promise<Number>}
   */
  async count() {
    const sql = `SELECT COUNT(1) as count FROM ${this.tableName}`;
    const result = await this.daa.get(sql);
    return result.count;
  }

  /**
   * @param id
   * @returns {Promise<String>}
   */
  async deleteRecord(id) {
    const record = await this.findRecordById(id);
    if (!record) {
      throw new Error(`record ${id} does not exist`);
    }
    const sql = `DELETE FROM ${this.tableName} WHERE id=${id}`;
    const result = await this.daa.run(sql);
    return result.result;
  }
}

module.exports = BaseRepository;
