import React from 'react'
import { Button } from 'semantic-ui-react'
import './StartButton.css'

const StartButton = (props) => {
  const { click } = props
  return (
    <div className="button-wrapper">
      <Button className="start" onClick={click} color="purple" size="large">Start</Button>
    </div>
  )
}

export default StartButton
