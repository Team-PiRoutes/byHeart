const db = require('../index')
const Rehearsal = db.model('rehearsal')
const { expect } = require('chai')

describe('Rehearsal model', () => {
  describe('properties', () => {
    it('should have a start time', () => {
      expect(Rehearsal.attributes.startTime).to.be.an('object')
    })
    it('should have an end time', () => {
      expect(Rehearsal.attributes.endTime).to.be.an('object')
    })
    it('should have a decimation level', () => {
      expect(Rehearsal.attributes.decimationLevel).to.be.an('object')
    })
    it('should have a passageModifiedAt', () => {
      expect(Rehearsal.attributes.passageModifiedAt).to.be.an('object')
    })
  })

  describe('getterMethods', () => {
    describe('elapsedTime', () => {
      it('should return the difference between start and end time', () => {
        const rehearsal = Rehearsal.build({
          startTime: 200,
          endTime: 300,
        })

        expect(rehearsal.elapsedTime).to.equal(100)
      })
    })
  })
})
