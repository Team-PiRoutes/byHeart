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
    .then(passage => {
      if (passage.isPublic || (req.user && req.user.id === passage.authorId)) {
        res.json(passage)
      } else {
        res.status(401).send('Unauthorized. Passage is private.')
      }
    })
    .catch(next)
})

// POST /api/passages/
router.post('/', (req, res, next) => {
  if (req.user && req.user.id === req.body.passage.authorId) {
    Passage.create(req.body)
      .then(newPassage => res.status(201).json(newPassage))
      .catch(next)
  } else {
    res.status(401).send('Unauthorized. User Id doesn\'t match.')
  }
})

// PUT /api/passages/
router.put('/:id', (req, res, next) => {
  // console.log('req.user.id', req.user.id)
  Passage.findById(req.params.id)
    .then(passage => {
      if (req.user && req.user.id === passage.authorId) {
        return passage.update(req.body)
      } else {
        res.status(401).send('Unauthorized. Passage is private.')
      }
    })
    .then(passage => res.json(passage))
    .catch(next)
})

//DELETE /api/passages/:id
router.delete('/:id', (req, res, next) => {
 Passage.findById(req.params.id)
  .then(passage => {
    if (req.user && req.user.id === passage.authorId) {
      return passage.destroy()
        .then(data => res.status(204).json(data))
    } else {
      res.status(401).send('Unauthorized. Passage is private.')
    }
  })
  .catch(next)
})

module.exports = router
