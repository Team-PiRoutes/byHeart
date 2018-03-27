
import React from 'react'
import GraphLargeView from './GraphLargeView'
import { connect } from 'react-redux'

// const shamData = [

//   { x: 0, y: 20452, date: 1520349054966, decimationLevel: 0 },
//   { x: 1, y: 24452, date: 1520449066727, decimationLevel: 1 },
//   { x: 2, y: 25452, date: 1520502056762, decimationLevel: 2 },
//   { x: 3, y: 26452, date: 1520642234366, decimationLevel: 3 },
//   { x: 4, y: 27452, date: 1520349865966, decimationLevel: 4 },
//   { x: 5, y: 28452, date: 1520851299966, decimationLevel: 5 },
//   { x: 6, y: 29452, date: 1520912354966, decimationLevel: 6 },
//   { x: 7, y: 30452, date: 1521149454966, decimationLevel: 7 },
//   { x: 8, y: 20452, date: 1521349554966, decimationLevel: 8 },
//   { x: 9, y: 2952, date: 1521349554966, decimationLevel: 8 },
//   { x: 10, y: 20452, date: 1521349554966, decimationLevel: 8 },
// ]


class GraphWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.filterDecimate = this.filterDecimate.bind(this)
    this.filterByVersion = this.filterByVersion.bind(this)
    this.sufficientData = this.sufficientData.bind(this)
  }

  sufficientData(toDisplayText) {
    const { filterByLevel, filterByVersion } = this.props
    console.log(toDisplayText, 'filterByLevel', filterByLevel, 'filterByVersion', filterByVersion)
    if (toDisplayText && filterByLevel && filterByVersion) {
      return `Insufficient data to display a graph at this difficulty level and passage version.`
    } else if (toDisplayText && filterByLevel) {
      return `Insufficient data to display a graph at this difficulty level.`
    } else if (toDisplayText && filterByVersion) {
      return `Insufficient data to display a graph for this passage version.`
    }

  }

  filterDecimate(level, data) { //eslint-disable-line class-methods-use-this
    let filteredData = []
    data.forEach(dataPoint => {
      if (dataPoint.decimationLevel === level) {
        filteredData.push(dataPoint)
      }
    })
    return filteredData
  }
  setXandY(data, yName) {//eslint-disable-line class-methods-use-this
    const copyOfData = data.map(dataPoint => {
      const newObj = Object.assign({ y: dataPoint[yName] }, dataPoint) //eslint-disable-line id-length
      return newObj
    })
    return copyOfData
  }

  filterByVersion(version, data) {//eslint-disable-line class-methods-use-this
    let filteredData = data
      .filter(dataPoint => (dataPoint.passageUpdatedAt === version))
    return filteredData
  }

  render() {

    const { data, unsavedDataPoint, decimationLevel,
      filterByLevel, filterByVersion, passage } = this.props
    const propertyToBeY = this.props.yName || 'y',
      xLabel = this.props.xLabel || 'Difficulty Level'

    let presentationData = unsavedDataPoint === undefined ? [...data] :
      [...data, unsavedDataPoint]

    if (filterByLevel) { presentationData = this.filterDecimate(decimationLevel, presentationData) }
    if (filterByVersion && passage.id) { presentationData = this.filterByVersion(passage.updatedAt, presentationData) }

    presentationData = this.setXandY(presentationData, propertyToBeY)
    const enoughDataForGraph = presentationData.length > 1
    let noGraphMessage = this.sufficientData(!enoughDataForGraph)

    return (
      <div>
        {
          enoughDataForGraph ? <GraphLargeView
            data={presentationData}
            xLabel={xLabel} /> :
            <h4 style={{
              margin: '15px 10%',
              padding: '30px 10px',
              textAlign: 'center',
              border: 'solid',
              borderWidth: '2px',
              borderRadius: '10px',
              borderColor: 'purple'
            }}> {noGraphMessage}</h4>

        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    passage: state.passage,
    rehearsals: state.rehearsals,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(GraphWrapper)
