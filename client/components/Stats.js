import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Progress } from 'semantic-ui-react'
import GraphWrapper from './data/GraphWrapper'
import { fetchPassage, fetchRehearsals } from '../store/'
import { Button } from 'semantic-ui-react'


export class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decimationLevel: 0,
      filterGraphByLevel: false,
      filterGraphByVersion: false
    }
    this.filterGraphByLevel = this.filterGraphByLevel.bind(this)
    this.filterGraphByVersion = this.filterGraphByVersion.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount() {
    const { match, loadInitialData } = this.props

    if (match && match.params.id && (match.params.id !== this.props.passage.id)) {
      loadInitialData(match.params.id)
    }
    if (this.props.userId) {
      this.props.loadRehearsals(this.props.userId, match.params.id)
    }
  }

  filterGraphByLevel() {
    this.setState({ filterGraphByLevel: !this.state.filterGraphByLevel })
  }
  filterGraphByVersion() {
    this.setState({ filterGraphByVersion: !this.state.filterGraphByVersion })
  }
  handleInputChange = (event) => {
    this.setState({ decimationLevel: +event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId && this.props.userId === undefined) {
      this.props.loadRehearsals(nextProps.userId, nextProps.match.params.id)
    }
  }

  render() {
    const { rehearsals, passage } = this.props
    const canShowChart = rehearsals && rehearsals.length > 0 &&
      this.props.passage.id !== undefined


    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>{passage.title}</h2>

        <div className="container" style={{ minHeight: '200px', border: '1px solid #d4d4d5', background: '#fff' }}>
          {canShowChart &&
            <Button
              style={{ margin: '6px' }}
              onClick={this.filterGraphByLevel}
              active={this.state.filterGraphByLevel}
              color={this.state.filterGraphByLevel ? 'purple' : null}
            >
              Show Same Level Only
          </Button>}
          {canShowChart &&
            <Button
              onClick={this.filterGraphByVersion}
              active={this.state.filterGraphByVersion}
              color={this.state.filterGraphByVersion ? 'purple' : null}
            >
              Show Same Passage Version Only
            </Button>}
          <h4 style={{ textAlign: 'center', color: 'purple' }}>Choose Current Filter Level</h4>
          <div className="decimate">
            <input
              id="slideBar"
              min={0}
              max={10}
              style={{ backgroundColor: '#cce2ff' }}
              onChange={this.handleInputChange}
              type="range"
              value={this.state.decimationLevel}
              ref={(input) => { this.slideBar = input }}
            />
          </div>
          <p style={{ size: '2.6em', textAlign: 'center', color: 'purple' }}>
            {`Current Level: ${this.state.decimationLevel}`}
          </p>
          {
            canShowChart && <GraphWrapper
              data={rehearsals}
              filterByLevel={this.state.filterGraphByLevel}
              filterByVersion={this.state.filterGraphByVersion}
              yName={'elapsedTime'}
              decimationLevel={this.state.decimationLevel} />
          }
        </div>
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
