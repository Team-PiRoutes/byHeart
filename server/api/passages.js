const router = require('express').Router()
const { Op } = require('sequelize')
const { Passage } = require('../db/models')

// GET /api/passages/
router.get('/', (req, res, next) => {
  const where = req.user ?
    { [Op.or]: [{authorId: req.user.id}, { isPublic: true }] } :
    { isPublic: true }

  return Passage.findAll({ where })
    .then(passages => res.json(passages))
    .catch(next)}
)

// GET /api/passages/:id
router.get('/:id', (req, res, next) => {
  Passage.findById(req.params.id)
    .then(passage => res.json(passage))
    .catch(next)
})

// POST /api/passages/
router.post('/', (req, res, next) => {
  Passage.create(req.body)
    .then(newPassage => res.status(201).json(newPassage))
    .catch(next)
})

// PUT /api/passages/
router.put('/:id', (req, res, next) => {
  Passage.findById(req.params.id)
    .then(passage => {
      return passage.update(req.body)
    })
    .then(passage => res.json(passage))
    .catch(next)
})

//DELETE /api/passages/:id
router.delete('/:id', (req, res, next) => {
 Passage.findById(req.params.id)
  .then(passage => passage.destroy())
  .then(data => res.status(204).json(data))
  .catch(next)
})

module.exports = router
