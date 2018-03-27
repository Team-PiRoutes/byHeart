import React from 'react'
import { Button } from 'semantic-ui-react'
import SpannedText from './SpannedText'

const Card = (props) => {

  const { lineAbove, currentLine, lineBelow, next, decimationLevel, startOver, hideHardSpace } = props

  return (
    <div className="card">
      <div id="line-above" className="lines blurred">{lineAbove}</div>
      <div id="current-line" className="lines">
        <SpannedText content={currentLine} decimateLevel={decimationLevel} hideHardSpace={hideHardSpace} />
      </div>
      <div id="line-below" className="lines blurred">{lineBelow}</div>
      <div className="button-wrapper">
        <Button.Group>
          <Button onClick={startOver} style={{ marginLeft: '0.5em' }}>Start Over</Button>
          <Button.Or />
          <Button onClick={next} style={{ marginLeft: '0.5em' }}>Next</Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default Card
