
import React from 'react'
import GraphLargeView from './GraphLargeView'
import { connect } from 'react-redux'


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
    } else if (toDisplayText) {
      return 'Insufficient data to display a graph. Save more practice times to receive data.'
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
