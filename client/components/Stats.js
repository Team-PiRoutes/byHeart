import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Progress } from 'semantic-ui-react'
import { fetchPassage, fetchRehearsals } from '../store/'


export class Stats extends Component {

  componentDidMount() {
    const { match, loadInitialData } = this.props

    if (match && match.params.id && (match.params.id !== this.props.passage.id)) {
      loadInitialData(match.params.id)
    }
    if (this.props.userId) {
      this.props.loadRehearsals(this.props.userId, match.params.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId && this.props.userId === undefined) {
      this.props.loadRehearsals(nextProps.userId, nextProps.match.params.id)
    }
  }

  render() {

    const { passage } = this.props

    return (
      <div>
        <h3>{passage.title}</h3>
      </div>
    )
  }

}

const mapState = state => {
  return {
    passage: state.passage,
    title: state.passage.title,
    isLoggedIn: !!state.user.id,
    rehearsals: state.rehearsals,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(passageId) {
      dispatch(fetchPassage(passageId))
    },
    loadRehearsals(userId, passageId) {
      dispatch(fetchRehearsals(userId, passageId))
    }
  }
}

export default connect(mapState, mapDispatch)(Stats)
