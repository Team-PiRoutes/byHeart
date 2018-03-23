const router = require('express').Router()
const { Op } = require('sequelize')
const { Rehearsal, Passage } = require('../db/models')

router.get('/', (req, res, next) => {
  // console.log(req.body)
  return Rehearsal.findAll({
    where: {
      [Op.and]: [
        { userId: req.body.userId },
        { passageId: req.body.passageId },
        { passageUpdatedAt: req.body.passageUpdatedAt }
      ]
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
