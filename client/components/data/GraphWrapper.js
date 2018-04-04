
import React from 'react'
import GraphLargeView from './GraphLargeView'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const NOT_ENOUGH_ATTEMPTS = `Insufficient data to display a graph. Save more practice times to receive data.`
export const NOT_ENOUGH_VERSION = `Insufficient data to display a graph for this passage version.`
export const NOT_ENOUGH_DIFFICULTY_LEVEL = `Insufficient data to display a graph at this difficulty level.`
export const NOT_ENOUGH_DIFFICULTY_AND_VERSION = `Insufficient data to display a graph at this difficulty level and passage version.`

export function sufficientData(toDisplayText, toFilterByLevel, filterByVersion) {


  if (toDisplayText && toFilterByLevel && filterByVersion) {

    return NOT_ENOUGH_DIFFICULTY_AND_VERSION
  } else if (toDisplayText && toFilterByLevel) {
    return NOT_ENOUGH_DIFFICULTY_LEVEL
  } else if (toDisplayText && filterByVersion) {
    return NOT_ENOUGH_VERSION
  } else if (toDisplayText) {
    return NOT_ENOUGH_ATTEMPTS
  }
}

export function filterDecimate(level, data) {
  let filteredData = []
  data.forEach(dataPoint => {
    if (dataPoint.decimationLevel === level) {
      filteredData.push(dataPoint)
    }
  })
  return filteredData
}
export function setXandY(data, yName) {
  const copyOfData = data.map((dataPoint, i) => {
    const newObj = Object.assign({ y: dataPoint[yName] }, dataPoint, { x: i }) //eslint-disable-line id-length
    return newObj
  })
  return copyOfData


}


export function filterVersion(version, data) {
  let filteredData = data
    .filter(dataPoint => (dataPoint.passageUpdatedAt === version))
  return filteredData
}


export const GraphWrapper = ({ data, unsavedDataPoint, decimationLevel,
  toFilterByLevel, toFilterByVersion, passage, yName, xLabel
}) => {
  const propertyToBeY = yName || 'y'
  xLabel = xLabel || 'Difficulty Level'
  console.dir(toFilterByVersion)
  let presentationData = unsavedDataPoint === undefined ? [...data] :
    [...data, unsavedDataPoint]
  // console.log('data', presentationData)
  if (toFilterByLevel) { presentationData = filterDecimate(decimationLevel, presentationData) }
  if (toFilterByVersion && passage.id) { presentationData = filterVersion(passage.updatedAt, presentationData) }

  presentationData = setXandY(presentationData, propertyToBeY)
  const enoughDataForGraph = presentationData.length > 1
  let noGraphMessage = sufficientData(!enoughDataForGraph, toFilterByLevel, toFilterByVersion)

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

const mapDispatchToProps = (dispatch) => {
  return {
    filterDecimate() {
      return filterDecimate(...arguments)
    }, setXandY() {
      return setXandY(...arguments)
    }, filterVersion() {
      return filterVersions(...arguments)
    }
  }
}//filterDecimate, setXandY, filterByVersion
GraphLargeView.propTypes = {
  data: PropTypes.array.isRequired,
  unsavedDataPoint: PropTypes.object,
  xLabel: PropTypes.string,
}

export default connect(mapState, mapDispatchToProps)(GraphWrapper)
