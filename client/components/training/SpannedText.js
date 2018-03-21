import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { wordHint } from '../../utils/wordHint'
import { buildDecimationLevelArrays } from '../../utils/decimate'
import './SpannedText.css'
import { relative } from 'path'
import ReactTooltip from 'react-tooltip'
import TipText from './TipText'


export const SpannedText = (props) => {
  let { content, decimateLevel } = props
  let decimateLevels
  if (content !== '') {
    decimateLevels = buildDecimationLevelArrays(content)

  }

  return (content === '' ? null : (
    <div className="passageText" >
      {
        spannifyArray(decimateLevels, decimateLevel)
      }

    </div>
  ))
}


function spannifyArray(grid, level) {
  return grid[level].map((word, i) => {
    const column = grid.map(row => row[i])
    let id = Math.floor((Math.random() * Math.pow(10, 10))).toString(36) + i.toString()
    return (
      <TipText key={id} decimateLevel={level} hintArray={column} />
    )
  }
  )
}
/**
 * PROP TYPES
 */
SpannedText.propTypes = {
  decimateLevel: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
}


export default SpannedText
