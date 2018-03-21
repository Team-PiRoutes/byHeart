import axios from 'axios'
import { passPassage } from './passage'

const GOT_PASSAGES = 'GOT_PASSAGES'
const ADD_PASSAGE = 'ADD_PASSAGE'
const GOT_UPDATED_PASSAGE = 'GOT_UPDATED_PASSAGE'

const initialState = []

/* Action creators */

export const gotPassages = passages => ({
  type: GOT_PASSAGES,
  passages
})

export const addPassage = passage => ({
  type: ADD_PASSAGE,
  passage
})

export const gotUpdatedPassage = passage => ({
  type: GOT_UPDATED_PASSAGE,
  passage
})

/* Thunks */

export const fetchPassages = () =>
  dispatch =>
    axios.get('/api/passages')
      .then(res => res.data)
      .then(passages => {
        dispatch(gotPassages(passages))
      })

export const fetchPassage = (id) =>
  dispatch =>
    axios.get(`/api/passages/${id}`)
      .then(res => res.data)
      .then(passage => {
        dispatch(gotUpdatedPassage(passage))
        dispatch(passPassage(passage))
      })

export const postPassage = (passage) =>
  dispatch =>
    axios.post('/api/passages', passage)
      .then(res => res.data)
      .then(newPassage => {
        dispatch(addPassage(newPassage))
        dispatch(passPassage(newPassage))
      })
      .catch(err => console.error('posting new passage went wrong', err))

export const updatePassage = (passage) =>
  dispatch =>
    axios.put(`/api/passages/${passage.id}`, passage)
      .then(res => res.data)
      .then(updatedPassage => {
        dispatch(gotUpdatedPassage(updatedPassage))
        dispatch(passPassage(updatedPassage))
      })

/* Reducer */

export default function (state = initialState, action) {
  switch (action.type) {

    case GOT_UPDATED_PASSAGE:
      state = state.filter(passage => passage.id !== action.passage.id)
      return [...state, action.passage]

    case GOT_PASSAGES:
      return action.passages

    case ADD_PASSAGE:
      return [...state, action.passage]

    default:
      return state
  }
}
