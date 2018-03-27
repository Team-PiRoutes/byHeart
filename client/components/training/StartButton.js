import React from 'react'
import { Button, Checkbox } from 'semantic-ui-react'
import { decimateString } from '../../utils/decimate'

const StartButton = (props) => {

  const { click, handleInputChange, decimationLevel, input, handleToggleHardSpace, hideHardSpace } = props

  const helpText = decimateString('Move the fader to change the difficulty', decimationLevel, hideHardSpace)

  return (
    <div className="button-wrapper">
      <div>
        <input
          id="slideBar"
          min={0}
          max={10}
          onChange={handleInputChange}
          type="range"
          value={decimationLevel}
          ref={input}
        />
        <Checkbox
          className="checkbox-spaces"
          label="No spaces?"
          onChange={handleToggleHardSpace}
          checked={hideHardSpace}
        />
      </div>
      <div className="passageText">
        {helpText}
      </div>
      <div style={{padding: '1em'}}>
        <Button className="start" onClick={click} color="purple" size="large">Start</Button>
      </div>
    </div>
  )
}

export default StartButton
