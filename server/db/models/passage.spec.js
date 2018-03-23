/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Passage = db.model('passage')

describe('Passage model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  let hello

  beforeEach(() => {
    return Passage.create({
      title: 'Hello World',
      content: 'Hello yee world of mine!'
    })
    .then(passage => {
      hello = passage
    })
    .catch(err => {
      console.log(err.message)
    })
  })

  describe('Model assignments', () => {
    it('Defaults to not public', () => {
      expect(hello.isPublic).to.be.equal(false)
    })
  })


  describe('Methods', () => {

    it('Preview returns a slice the length you provide it', () => {
      expect(hello.preview(3).length).to.be.equal(3)
      expect(hello.preview(3)).to.be.equal('Hel')
    })
  })//end instance methods
}) // end describe('Passage model')

