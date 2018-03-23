import React from 'react'
import { Button } from 'semantic-ui-react'
import './StartButton.css'

const StartButton = (props) => {

  const { click, handleInputChange, decimationLevel, input } = props

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
      </div>
      <div style={{padding: '1em'}}>
        <Button className="start" onClick={click} color="purple" size="large">Start</Button>
      </div>
    </div>
  )
}

export default StartButton
