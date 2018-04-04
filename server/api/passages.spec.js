import { expect } from 'chai'
const db = require('../db')
const Passage = db.model('passage')
const User = db.model('user')
const app = require('../index')
const request = require('supertest')
// const requestAgent = require('superagent')

const initialPassages = [
  {
    title: 'speech',
    content: 'Several paragraphs of golden words',
    isPublic: true
  },
  {
    title: 'monolog',
    content: 'Extremely dramatic lines',
    isPublic: true
  },
  {
    title: 'another speech',
    content: 'Several private paragraphs of golden words',
    isPublic: false
  },
  {
    title: 'monolog from play',
    content: 'Not yet for publication',
    isPublic: false
  },
  {
    title: 'mark 1:2',
    content: 'Bible quotations',
    isPublic: true
  },
]

const newPassage = {
  title: 'new passage',
  content: 'some lines to learn'
}

const userOwner = {
  email: 'chris@chris.com',
  password: 'chris123'
}

const userOther = {
  email: 'sam@sam.com',
  password: 'sam123'
}

describe('Passage routes', () => {
  let dbUsers = []
  let dbPassages = []

  beforeEach(async () => {
    await db.sync({ force: true })
    dbUsers = await Promise.all([
      User.create(userOwner),
      User.create(userOther)
    ])

    const passages = await initialPassages.map(passage => {
      passage.authorId = dbUsers[0].id // i.e. userOwner
      return passage
    })

    dbPassages = await Passage.bulkCreate(passages)

  })

  describe('with guest user', () => {

    describe('GET /api/passages', () => {
      it('should return public passages only', () => {
        return request(app)
          .get('/api/passages')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.be.equal(3)
          })
      })
    })

    describe('GET /api/passages/:id', () => {
      it('should return a public passage', () => {
        return request(app)
          .get('/api/passages/1')
          .expect(200)
          .then(res => {
            expect(res.body.title).to.equal('speech')
          })
      })

      it('should NOT return a private passage', () => {
        return request(app)
          .get('/api/passages/3')
          .expect(401)
      })
    })

    describe('POST /api/passages', () => {
      it('should return an error', () => {
        return request(app)
          .post(`/api/passages/`)
          .send(newPassage)
          .expect(401)
      })
    })

    describe('PUT /api/passages', () => {
      it('should return an error', () => {
        return request(app)
          .put(`/api/passages/1`)
          .send({title: 'new title'})
          .expect(401)
      })
    })

    describe('DELETE /api/passages', () => {
      it('should return an error', () => {
        return request(app)
          .delete(`/api/passages/1`)
          .send({title: 'new title'})
          .expect(401)
      })
    })

  })

  describe('with authenticated user', () => {

    describe('who owns passage', () => {
      const authenticatedUser = request.agent(app)

      before(() => {
        authenticatedUser
          .post('/login')
          .send(userOwner)
          .then(res => {
            expect(res.statusCode).to.equal(200)
          })
      })

      describe('GET /api/passages', () => {
        it('should retrieve all passages', () => {
          authenticatedUser
            .get('/api/passages')
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('array')
              expect(res.body.length).to.be.equal(5)
            })
        })
      })

      describe('GET /api/passages/:id', () => {
        it('should retrieve public passage', () => {
          return request(app)
            .get('/api/passages/1')
            .expect(200)
            .then(res => {
              expect(res.body.title).to.equal('speech')
            })
        })
        it('should retrieve private passage', () => {
          return request(app)
            .get('/api/passages/3')
            .expect(200)
            .then(res => {
              expect(res.body.title).to.equal('another speech')
            })
        })
      })

      describe('POST /api/passages/:id', () => {
        it('should save a new message')
      })

      describe('PUT /api/passages/:id', () => {
        it('should edit a saved message')
      })

      describe('PUT /api/passages/:id', () => {
        it('should delete a saved message')
      })

    })

    describe('who does not own passage', () => {
      describe('GET /api/passages', () => {
        it('should retrieve all public passages')
      })

      describe('GET /api/passages/:id', () => {
        it('should retrieve public passage')
        it('should NOT retrieve private passage')
      })

      describe('PUT /api/passages/:id', () => {
        it('should NOT edit a saved message')
      })

      describe('PUT /api/passages/:id', () => {
        it('should NOT delete a saved message')
      })

    })
  })


  // beforeEach(() => {
  //   return db.sync({ force: true })
  // })


  // describe('GET /api/passages', () => {

  //   beforeEach(() => Passage.bulkCreate(passages))

  //   it('should return all the public passages', () => {
  //     return request(app)
  //       .get('/api/passages')
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body).to.be.an('array')
  //         expect(res.body.length).to.be.equal(2)
  //       })
  //   })
  // })

  // describe('POST /api/passages', () => {
  //   const userCredentials = {
  //     email: 't@t.com',
  //     password: '123'
  //   }

  //   const passage = { title: 'my title', content: 'my content' }
  //   let userId

  //   beforeEach(() => {
  //     return User.create(userCredentials)
  //       .then(newUser => {
  //         userId = newUser.id
  //         return userId
  //       })
  //   })

  //   it('should create a new passage', () => {
  //     passage.authorId = userId
  //     return request(app)
  //       .post(`/api/passages/`)
  //       .send(passage)
  //       .expect(201)
  //       .then(res => {
  //         expect(res.body.title).to.be.equal('my title')
  //       })
  //   })
  // })

  // describe('PUT /api/passages/:id', () => {
  //   const user = { email: 't@t.com', password: '123' }
  //   const passage = { title: 'my title', content: 'my content' }
  //   let token
  //   beforeEach(() => {
  //     return User.create(user)
  //       .then(newUser => {
  //         passage.id = newUser.id
  //         return Passage.create(passage)
  //       })
  //       .then(() => {
  //         return request(app)
  //           .post(`/auth/login`)
  //           .send({ user })
  //           .then(res => {
  //             // if (err) throw err
  //             console.log('res.body.token: ', res.body.token)
  //             token = { accessToken: res.body.token }
  //           })
  //           .catch(err => console.error(err))
  //       })
  //   })

  //   it('should update an existing passage when logged in', () => {
  //     return request(app)
  //       .put(`/api/passages/${passage.id}`)
  //       .send({ title: 'new title' })
  //       .query(token)
  //       .expect(201)
  //       .then(res => {
  //         expect(res.body.title).to.equal('new title')
  //       })
  //   })

  //   xit('should NOT update an existing passage when not logged in', () => {
  //     return request(app)
  //       .put(`/api/passages/${passage.id}`)
  //       .send({ title: 'new title' })
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.title).to.equal('new title')
  //       })
  //   })
  // })

  // describe('GET /api/passages/:id', () => {
  //   beforeEach(() => Passage.bulkCreate(passages))

  //   it('should get one passage', () => {
  //     return request(app)
  //       .get('/api/passages/2')
  //       .expect(401)
  //   })
  // })

  // describe('DELETE /api/passages/:id', () => {
  //   beforeEach(() => Passage.bulkCreate(passages))

  //   xit('given the id, it should NOT delete a passage when not logged in', () => {
  //     return request(app)
  //       .delete('/api/passages/1')
  //       .expect(401)
  //   })
  // })
})
