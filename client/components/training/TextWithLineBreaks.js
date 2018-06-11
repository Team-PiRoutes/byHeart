import React from 'react'
import SpannedText from './SpannedText'

const TextWithLineBreaks = ({
  text,
  decimateLevel,
  hideHardSpace
}) => {

  const lines = text.split('\n')
  return (
    <div>
      {lines && lines.map((line) => {

        return (
          <div key={line}>
            <SpannedText
              content={line.trim()}
              decimateLevel={decimateLevel}
              hideHardSpace={hideHardSpace}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TextWithLineBreaks
