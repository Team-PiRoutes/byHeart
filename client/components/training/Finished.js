import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRehearsals } from '../../store'
import { Button, Icon, Label, Segment, Popup } from 'semantic-ui-react'
import timer from '../../utils/timer'
import GraphWrapper from '../data/GraphWrapper'
class Finished extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     filterSameLevel: false,
  //     filterSameVersion: false


  //   }
  componentDidMount() {
    const { userId, passage, loadInitialData } = this.props
    loadInitialData(passage.id, userId)
  }

  render() {
    const { saveRehearsal, isRehearsalSaved, rehearsals, currentRehearsal } = this.props
    let time = timer(this.props.time)
    //react-vis will not display single data point charts.rehearsals &&
    const canShowChart = rehearsals && this.props.passage.id !== undefined

    return (
      <div>
        <Segment clearing>
          <Popup
            trigger={
              <Button as="div" labelPosition="left">
                <Label basic pointing="right" size="big" color="purple">
                  <Icon name="time" /> {time}
                </Label>
                {!isRehearsalSaved ?
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
          <Popup
            trigger={
              <Button
                icon
                labelPosition="right"
                onClick={this.props.startHarder}
                floated="right"
                style={{ marginLeft: '0.5em' }}>
                <Icon name="plus" />
                Make Harder
              </Button>
            }
            content="Makes letters disappear from your lines. You can also control the level of difficulty with 'up' and 'down' keys."
            on="hover"
            position="bottom center"
            inverted
          />
          <Popup
            trigger={
              <Button
                icon
                labelPosition="left"
                onClick={this.props.startEasier}
                floated="right"
                style={{ marginLeft: '0.5em' }}>
                <Icon name="minus" />
                Make Easier
              </Button>
            }
            content="Was it too difficult this time? Click to add back some letters to your lines."
            on="hover"
            position="bottom center"
            inverted
          />
        </Segment>
        {
          canShowChart && <GraphWrapper
            data={rehearsals}
            filter={}
            yName={'elapsedTime'}
            unsavedDataPoint={currentRehearsal} />
        }
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
