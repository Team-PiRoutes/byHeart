import reducer, { addRehearsal, createRehearsal, fetchRehearsals, gotRehearsals } from './rehearsals'
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

    describe('gotRehearsals', () => {

      it('should return the correct type and object', () => {
        const rehearsals = [rehearsal, rehearsal, rehearsal]
        const action = gotRehearsals(rehearsals)
        expect(action.type).to.equal('GOT_REHEARSALS')
        expect(action.rehearsals).to.deep.equal(rehearsals)
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

    describe('fetchRehearsals', () => {
      it('dispatches the GOT_REHEARSALS action', () => {
        const fakeRehearsals = [rehearsal, rehearsal, rehearsal]
        const userId = 1
        const passageId = 1
        mockAxios.onGet('/api/rehearsals/?userId=1&passageId=1').replyOnce(200, fakeRehearsals)
        return store.dispatch(fetchRehearsals(userId, passageId))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.equal('GOT_REHEARSALS')
            expect(actions[0].rehearsals).to.deep.equal(fakeRehearsals)
          })
      })
    })
  })

  describe('reducer', () => {
    describe('ADD_REHEARSAL', () => {
      it('should add to the array of rehearsals', () => {
        const state = []
        const newState = reducer(state, {
          type: 'ADD_REHEARSAL',
          rehearsal
        })
        expect(newState).to.deep.equal([rehearsal])
      })
    })
  })
})
