import React from 'react'
import { Progress } from 'semantic-ui-react'


const ProgressBar = (props) => {

  const { lines, currentLineIndex } = props
  const progress = currentLineIndex * 100 / lines.length

  return (
    <div>
      <Progress percent={progress} size="tiny" color="purple" />
    </div>
  )
}

export default ProgressBar
