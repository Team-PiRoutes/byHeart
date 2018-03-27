import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRehearsals } from '../../store'
import { Button, Icon, Label, Segment, Popup } from 'semantic-ui-react'
import timer from '../../utils/timer'
import GraphWrapper from '../data/GraphWrapper'
import DifficultyLabel from './DifficultyLabel'

class Finished extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterGraphBySameLevel: false,
      filterGraphBySameVersion: false
    }
    this.filterGraphBySameLevel = this.filterGraphBySameLevel.bind(this)
    this.filterGraphBySameVersion = this.filterGraphBySameVersion.bind(this)
  }
  filterGraphBySameLevel() {
    this.setState({ filterGraphBySameLevel: !this.state.filterGraphBySameLevel })
  }
  filterGraphBySameVersion() {
    this.setState({ filterGraphBySameVersion: !this.state.filterGraphBySameVersion })
  }

  componentDidMount() {
    const { userId, passage, loadInitialData } = this.props
    loadInitialData(passage.id, userId)
  }

  render() {
    const { saveRehearsal, isRehearsalSaved,
      rehearsals, currentRehearsal, userId,
      passage, decimationLevel } = this.props

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
                {(!isRehearsalSaved && userId && passage.id) ?
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
        {canShowChart &&
          <Button
            onClick={this.filterGraphBySameLevel}
            active={this.state.filterGraphBySameLevel}
            color={this.state.filterGraphBySameLevel ? 'purple' : null}
          >
            Show Same Level Only
        </Button>}
        {canShowChart &&
          <Button
            onClick={this.filterGraphBySameVersion}
            active={this.state.filterGraphBySameVersion}
            color={this.state.filterGraphBySameVersion ? 'purple' : null}
          >
            Show Same Passage Version Only
        </Button>}
        {
          canShowChart ? <GraphWrapper
            data={rehearsals}
            filterByLevel={this.state.filterGraphBySameLevel}
            filterByVersion={this.state.filterGraphBySameVersion}
            yName={'elapsedTime'}
            unsavedDataPoint={currentRehearsal}
            decimationLevel={decimationLevel} /> :
            <p>Insufficient data to show a chart.</p>
        }
        <DifficultyLabel decimateLevel={decimationLevel} />
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
      if (userId && passageId) {
        dispatch(fetchRehearsals(userId, passageId))
      }
    },
  }
}


export default connect(mapState, mapDispatch)(Finished)
