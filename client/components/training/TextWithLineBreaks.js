import React from 'react'
import SpannedText from './SpannedText'
import './SpannedText.css'
const TextWithLineBreaks = (props) => {
  const { text } = props
  const lines = text.split('\n')
  let key = 1000
  return (
    <div>
      {lines && lines.map((line) => {

        return (
          <div key={key++}>
            <SpannedText
              content={line.trim()} decimateLevel={props.decimateLevel} idPrefix={key}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TextWithLineBreaks
