import axios from 'axios'

const initialState = []

const ADD_REHEARSAL = 'ADD_REHEARSAL'
const GOT_REHEARSALS = 'GOT_REHEARSALS'

export const addRehearsal = (rehearsal => {
  return {
    type: ADD_REHEARSAL,
    rehearsal
  }
})

export const gotRehearsals = (rehearsals => {
  return {
    type: GOT_REHEARSALS,
    rehearsals
  }
})

/* Thunks */

export const createRehearsal = rehearsal =>
  dispatch =>
    axios.post('/api/rehearsals', rehearsal)
      .then(res => res.data)
      .then(newRehearsal => {
        dispatch(addRehearsal(newRehearsal))
      })
      .catch(err => console.error(err.message))

export const fetchRehearsals = (userId, passageId) =>
  dispatch =>
    axios.get(`/api/rehearsals/?userId=${userId}&passageId=${passageId}`)
      .then(res => res.data)
      .then(rehearsals => {
        dispatch(gotRehearsals(rehearsals))
      })
      .catch(err => console.error(err.message))

/* Reducer */

export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_REHEARSALS:
      return action.rehearsals

    case ADD_REHEARSAL:
      return [...state, action.rehearsal]

    default:
      return state
  }
}
