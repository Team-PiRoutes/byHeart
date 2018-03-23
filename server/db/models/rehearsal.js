const Sequelize = require('sequelize')
const db = require('../db')


const Rehearsal = db.define('rehearsal', {
  startTime: { // milliseconds
    type: Sequelize.INTEGER
  },
  endTime: { // milliseconds
    type: Sequelize.INTEGER
  },
  decimationLevel: {
    type: Sequelize.INTEGER
  },
  passageUpdatedAt: {
    type: Sequelize.DATE
  },
}, {
  getterMethods: {
    elapsedTime() {
      return this.endTime - this.startTime
    }
  }
})

Rehearsal.prototype.preview = function (length) {
  return this.content.slice(0, length)
}

module.exports = Rehearsal
