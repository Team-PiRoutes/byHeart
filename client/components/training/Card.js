import React from 'react'
import SpannedText from './SpannedText'
import './Card.css'

const Card = (props) => {
  const { lineAbove, currentLine, lineBelow, next, decimationLevel } = props
  return (
    <div className="card">
      <div id="line-above" className="lines blurred">{lineAbove}</div>
      <div id="current-line" className="lines">
        <SpannedText content={currentLine} decimateLevel={decimationLevel} />
      </div>
      <div id="line-below" className="lines blurred">{lineBelow}</div>
      <div className="button-wrapper">
        <button className="button-next" onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default Card
