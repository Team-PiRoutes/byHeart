import React from 'react'
import { Label } from 'semantic-ui-react'


const DifficultyLabel = (props) => {

  const { decimateLevel } = props


  return (
    <div>
    <Label className="difficulty-label" color="purple" ribbon="right" size="large" style={{marginTop: '15px', marginBottom: '15px'}}>Difficulty level: {decimateLevel}</Label>
  </div>
  )
}

export default DifficultyLabel
