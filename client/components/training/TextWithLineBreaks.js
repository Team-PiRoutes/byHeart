import React from 'react'
import SpannedText from './SpannedText'
const TextWithLineBreaks = (props) => {
  const { text } = props
  const lines = text.split('\n')
  return (
    <div>
      {lines && lines.map((line) => {

        return (
          <div key={line}>
            <SpannedText
              content={line.trim()}
              decimateLevel={props.decimateLevel}
              hideHardSpace={props.hideHardSpace}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TextWithLineBreaks
