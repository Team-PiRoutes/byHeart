import React from 'react'
import GraphWrapper from './GraphWrapper'
import { connect } from 'react-redux'
import DifficultyLabel from '../training/DifficultyLabel'

const HARDER = 'ArrowRight'
const EASIER = 'ArrowLeft'
export default class TestingGraphView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decimateLevel: 0,
      filterGraphByLevel: false,
      filterGraphByVersion: false
    }
    this.makeEasier = this.makeEasier.bind(this)
    this.makeHarder = this.makeHarder.bind(this)
    this.filterGraphByLevel = this.filterGraphByLevel.bind(this)
    this.filterGraphByVersion = this.filterGraphByVersion.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  makeEasier() {
    const decimateLevel = this.state.decimateLevel
    if (decimateLevel > 0) {
      this.setState({
        decimateLevel: decimateLevel - 1
      })
    }
  }

  makeHarder() {
    const { decimateLevel } = this.state
    if (decimateLevel < 10) {
      this.setState({
        decimateLevel: decimateLevel + 1
      })
    }
  }
  filterGraphByLevel() {
    this.setState({ filterGraphByLevel: !this.state.filterGraphByLevel })
  }
  filterGraphByVersion() {
    this.setState({ filterGraphByVersion: !this.state.filterGraphByVersion })
  }
  handleInputChange = (event) => {
    this.setState({ decimateLevel: +event.target.value })
  }
  handleKeyPress(event) {

    if (event.code === HARDER) this.makeHarder()
    else if (event.code === EASIER) this.makeEasier()
  }

  render() {
    let { rehearsals, passage } = this.props
    const canShowChart = rehearsals && this.props.passage.id !== undefined

    const shamData = [

      { x: 0, y: 20452, date: 1520349054966, decimationLevel: 0 },
      { x: 1, y: 24452, date: 1520449066727, decimationLevel: 1 },
      { x: 2, y: 25452, date: 1520502056762, decimationLevel: 2 },
      { x: 3, y: 26452, date: 1520642234366, decimationLevel: 3 },
      { x: 4, y: 27452, date: 1520349865966, decimationLevel: 4 },
      { x: 5, y: 28452, date: 1520851299966, decimationLevel: 5 },
      { x: 6, y: 29452, date: 1520912354966, decimationLevel: 6 },
      { x: 7, y: 30452, date: 1521149454966, decimationLevel: 7 },
      { x: 8, y: 20452, date: 1521349554966, decimationLevel: 8 },
      { x: 9, y: 2952, date: 1521349554966, decimationLevel: 8 },
      { x: 10, y: 20452, date: 1521349554966, decimationLevel: 8 },
    ]
    rehearsals = shamData
    // const propertyToBeY = this.props.yName || 'y',
    //   xLabel = this.props.xLabel || 'Decimation Level'

    // let presentationData = unsavedDataPoint === undefined ? [...data] :
    //   [...data, unsavedDataPoint]
    // if (filterByLevel) { presentationData = this.filterDecimate(decimationLevel, presentationData) }
    // if (filterByVersion && passage.id) { presentationData = this.filterByVersion(passage.updatedAt, presentationData) }
    // presentationData = this.setXandY(presentationData, propertyToBeY)

    // const enoughDataForGraph = presentationData.length > 1

    return (
      <div className="container" style={{ minHeight: '200px' }}>
        <h3 style={{ textAlign: 'center', color: 'purple' }}>Choose Current Filter Level</h3>
        <div className="decimate">
          <input
            id="slideBar"
            min={0}
            max={10}
            style={{ backgroundColor: '#cce2ff' }}
            onChange={this.handleInputChange}
            type="range"
            value={this.state.decimateLevel}
            ref={(input) => { this.slideBar = input }}
          />
        </div>
        <p style={{ size: '2.6em', textAlign: 'center', color: 'purple' }}>
          {`Current Level: ${decimateLevel}`}
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
    )
  }
}
