import React from 'react'
import { List, Popup, Icon, Grid, Header } from 'semantic-ui-react'


const Instructions = () => {

  const passageTips = [
    'Start practising by slowly reading your passage a few times. When you are ready to move on, increase the difficulty level.',
    'To change the difficulty level - move the fader or use Arrow keys Left and Right.',
    'If the box in the top right corner is not checked places of removed letters will be marked.',
    'Can not remember the word? Move the mouse above it for a hint.'
  ]

  const linesTips = [
    'Choose the difficulty level by moving the fader or using Arrow keys Left and Right. Click Start or press Enter key',
    'If the box in the top right corner is not checked places of removed letters will be marked.',
    'Click Next or press the Space key to move down the lines. Click Start Over or press Enter key to go back to the first line of the passage.',
    'Check how long it took you to read all your lines. Save the time or/and start over by clicking on the button or pressing Enter key.',
    'Can not remember the word? Move the mouse above it for a hint.'
  ]

  return (
    <div className="question">
      <Popup
        trigger={<Icon name="help circle" color="purple" />}
        position="bottom right"
        hoverable
      >
        <Popup.Content>
          <Grid divided="vertically">
            <Grid.Row>
              <Grid.Column>
                <Header>Train Full Passage</Header>
                <List bulleted>
                  {
                    passageTips.map(item => {
                      return (
                        <List.Item key={`${passageTips.indexOf(item)}`}>{item}</List.Item>
                      )
                    })
                  }
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header>Train Line By Line</Header>
                <List bulleted>
                  {
                    linesTips.map(item => {
                      return (
                        <List.Item key={`${linesTips.indexOf(item)}`}>{item}</List.Item>
                      )
                    })
                  }
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Popup.Content>
      </Popup>
    </div>
  )
}

export default Instructions
