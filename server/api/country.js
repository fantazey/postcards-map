const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
  const repo = req.app.locals.repositories.country;
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const field = req.query.orderField || undefined;
  const direction = req.query.orderDirection || undefined;
  const data = await repo.findAll(limit, offset, {field, direction});
  const total = await repo.count();
  return res.json({country: data, meta: {total, limit, offset}});
});

router.get('/:id', async function(req, res) {
  const repo = req.app.locals.repositories.country;
  const id = +req.params.id;
  const record = await repo.findRecordById(id);
  if (!record) {
    return res.status(404).json({'error': 'not found'})
  }
  return res.json({country: record});
});

router.post('/', async function(req, res) {
  const {name, code} = req.body;
  if (!name || name.trim().length === 0 || !code || code.trim().length === 0) {
    return res.status(400).json({'error': 'invalid form'});
  }
  const repo = req.app.locals.repositories.country;
  try {
    const record = await repo.createRecord({name, code});
    return res.json({'country': record});
  } catch (e) {
    return res.status(500).json({'error': 'unable to create record', 'message': e.message, 'code': e.code})
  }
});

router.delete('/:id', async function(req, res) {
  const id = +req.params.id;
  const repo = req.app.locals.repositories.country;
  try {
    await repo.deleteRecord(id);
    return res.json({});
  } catch (e) {
    return res.status(500).json({'error': e.message, 'code': e.code});
  }
});

module.exports = router;
