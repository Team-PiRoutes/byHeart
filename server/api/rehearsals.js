const router = require('express').Router()
// const { Op } = require('sequelize')
const { Rehearsal, Passage } = require('../db/models')

router.get('/', (req, res, next) => {
  console.log(req.query)
  return Rehearsal.findAll({
    where: {
      userId: req.query.userId,
      passageId: req.query.passageId
    }
  }).then(rehearsals => res.json(rehearsals))
    .catch(next)
})

router.post('/', (req, res, next) => {
  // console.log(req.body)
  return Passage.findById(req.body.passageId)
    .then(passage => {
      return Rehearsal.create({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        decimationLevel: req.body.decimationLevel,
        passageUpdatedAt: passage.updatedAt,
        userId: req.user.id,
        passageId: passage.id
      })
    })
    .then(rehearsal => res.status(201).json(rehearsal))
    .catch(next)
})

module.exports = router
