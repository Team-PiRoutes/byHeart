import  { expect } from 'chai'
const db = require('../db')
const Passage = db.model('passage')
const User    = db.model('user')
const app = require('../index')
const request = require('supertest')

describe('Passage routes', () => {
  beforeEach(() => {
    return db.sync({ force: true})
  })

  const passages = [
    {
      title: 'speech',
      content: 'Several paragraphs of golden words',
      isPublic: false
    },
    {
      title: 'monolog',
      content: 'Extremely dramatic lines',
      isPublic: true
    },
    {
      title: 'mark 1:2',
      content: 'Bible quotations',
      isPublic: true
    },
  ]

  describe('GET /api/passages', () => {

    beforeEach(() => Passage.bulkCreate(passages))

    it('should return all the public passages', () => {
      return request(app)
        .get('/api/passages')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
        })
    })
  })

  describe('POST /api/passages', () => {
    const user = { email: 't@t.com', password: '123' }
    const passage = { title: 'my title', content: 'my content' }
    let userId

    beforeEach(() => {
      return User.create(user)
        .then(newUser => {
          userId = newUser.id
          return userId
        })
    })

    it('should create a new passage', () => {
      passage.authorId = userId
      return request(app)
        .post(`/api/passages/`)
        .send(passage)
        .expect(201)
        .then(res => {
          expect(res.body.title).to.be.equal('my title')
        })
    })
  })

  describe('PUT /api/passages/:id', () => {
    const user = { email: 't@t.com', password: '123' }
    const passage = { title: 'my title', content: 'my content' }

    beforeEach(() => {
      return User.create(user)
        .then(newUser => {
          passage.id = newUser.id
          return Passage.create(passage)
        })
    })

    it('should update an existing pin', () => {
      return request(app)
        .put(`/api/passages/${passage.id}`)
        .send({ title: 'new title' })
        .expect(200)
        .then(res => {
          expect(res.body.title).to.equal('new title')
        })
    })
  })

  describe('GET /api/passages/:id', () => {
    beforeEach(() => Passage.bulkCreate(passages))

    it('should get one passage', () => {
      return request(app)
        .get('/api/passages/1')
        .expect(200)
        .then(res => {
          expect(res.body.title).to.equal('speech')
          expect(res.body.content).to.equal('Several paragraphs of golden words')
        })
    })
  })

})
