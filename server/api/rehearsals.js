const router = require('express').Router()
const { Op } = require('sequelize')
const { Rehearsal } = require('../db/models')

router.get('/', (req, res, next) => {
  console.log(req.query)
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

module.exports = router
