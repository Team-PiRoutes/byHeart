import { addRehearsal, createRehearsal } from './rehearsals'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Rehearsals store', () => {
  const rehearsal = {
    elapsedTime: -100,
    id: 1,
    startTime: 200,
    endTime: 100,
    decimationLevel: 5,
    passageUpdatedAt: '2018-03-23T15:27:00.512Z',
    userId: 1,
    passageId: 1,
  }

  describe('action creators', () => {
    describe('addRehearsal', () => {

      it('should return the correct type and object', () => {
        const action = addRehearsal(rehearsal)
        expect(action.type).to.equal('ADD_REHEARSAL')
        expect(action.rehearsal).to.deep.equal(rehearsal)
      })
    })
  })

  describe('thunks', () => {
    let store, mockAxios

    const initialState = []

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('createRehearsal', () => {
      it('saves a new rehearsal to the database', () => {
        const fakeRehearsal = rehearsal
        mockAxios.onPost('/api/rehearsals', fakeRehearsal).replyOnce(201, fakeRehearsal)
        return store.dispatch(createRehearsal(fakeRehearsal))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('ADD_REHEARSAL')
            expect(actions[0].rehearsal).to.deep.equal(fakeRehearsal)
          })
      })
    })
  })
})
