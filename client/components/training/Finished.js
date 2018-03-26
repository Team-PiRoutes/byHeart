import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRehearsals } from '../../store'
import { Button, Icon, Label, Segment, Popup } from 'semantic-ui-react'
import timer from '../../utils/timer'

class Finished extends Component {
  componentDidMount() {
    const { userId, passage, loadInitialData } = this.props
    loadInitialData(passage.id, userId)
  }

  render() {
    const { saveRehearsal, isRehearsalSaved, rehearsals } = this.props

    let time = timer(this.props.time)

    return (
      <div>
        <Segment clearing>
          <Popup
            trigger={
              <Button as="div" labelPosition="left">
                <Label basic pointing="right" size="big" color="purple">
                  <Icon name="time" /> {time}
                </Label>
                { !isRehearsalSaved ?
                      (<Button onClick={saveRehearsal} animated="vertical" color="purple">
                        <Button.Content hidden>Save</Button.Content>
                        <Button.Content visible>
                          <Icon name="save" />
                        </Button.Content>
                      </Button>)
                    : null
                }
              </Button>
            }
            content="This is how long it took you to read your lines."
            on="hover"
            position="bottom left"
            inverted
          />
          <Popup
            trigger={
              <Button onClick={this.props.startOver} floated="right" style={{ marginLeft: '0.5em' }}>Start Over</Button>}
            content="Click to read your lines again without changing the difficulty level."
            on="hover"
            position="bottom right"
            inverted
          />
        </Segment>
        <ul>
          {rehearsals && rehearsals.map(rehearsal => {
            return (
              <li key={rehearsal.id}>
                {rehearsal.elapsedTime} ms
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    rehearsals: state.rehearsals,
    userId: state.user.id,
    passage: state.passage
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(passageId, userId) {
      if (userId) {
        dispatch(fetchRehearsals(userId, passageId))
      }
    },
  }
}


export default connect(mapState, mapDispatch)(Finished)
