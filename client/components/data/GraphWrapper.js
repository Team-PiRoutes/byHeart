
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
  }
  filterDecimate(level, data, yName) {
    let filteredData = []
    data.forEach(dataPoint => {

      if (dataPoint.decimationLevel === level) {

        filteredData.push(dataPoint)
      }
    })
    return filteredData
  }
  setXandY(data, yName) {
    const copyOfData = data.map(dataPoint => {
      const newObj = Object.assign({ y: dataPoint[yName] }, dataPoint)
      return newObj
    })
    return copyOfData
  }

  filterByVersion(version, data) {
    console.log('version')
    let filteredData = data
      .filter(dataPoint => (dataPoint.passageUpdatedAt === version))
    return filteredData
  }

  render() {

    const { data, unsavedDataPoint, decimationLevel, filterByLevel, filterByVersion, passage } = this.props
    const propertyToBeY = this.props.yName || 'y',
      xLabel = this.props.xLabel || 'Decimation Level'
    // consoles.log('GraphWrapper = unsavedDataPoint ', unsavedDataPoint)
    let presentationData = unsavedDataPoint === undefined ? [...data] :
      [...data, unsavedDataPoint]
    if (filterByLevel) { presentationData = this.filterDecimate(decimationLevel, presentationData) }
    if (filterByVersion && passage.id) { presentationData = this.filterByVersion(passage.updatedAt, presentationData) }
    presentationData = this.setXandY(presentationData, propertyToBeY)
    { console.log('presentationData', presentationData) }
    const enoughDataForGraph = presentationData.length > 1
    return (
      <div>
        {
          enoughDataForGraph && <GraphLargeView data={presentationData} xLabel={xLabel} />
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
