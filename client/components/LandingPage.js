import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gotPassage } from '../store/passage'
import history from '../history'
import { Button, Container, Header, Grid, Segment, Card } from 'semantic-ui-react'
import { decimateString } from '../utils/decimate'
import './LandingPage.css'


const card1 = [
  'Qurious how it works? For a quick start press Try An Example and train memorizing a sonet.',
]

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexHeart: 0,
      indexTag: 0
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        indexHeart: (this.state.indexHeart + 1) % 7,
        indexTag: (this.state.indexTag + 1) % 11
      })
    }, 1200)
  }

  render() {
    const { passages, handleTrainPassage, handleStartPassage } = this.props
    const firstPassage = passages.filter(passage => passage.id === 1)
    const heartHeading = ['By Heart', 'By Hear', 'By Hea', 'By He', 'By H', 'By ', 'By ❤️']
    const str = "It doesn't have to be hard to learn your lines"
    const tagLineTwo = decimateString(str, this.state.indexTag)

    return (
      <Segment textAlign="center" style={{ minHeight: 700 }} vertical>
        <Grid>
          <Grid.Row>
            <Container text id="landing">
              <Header
                id="tagLine"
                as="h2"
                content={tagLineTwo}
              />
              <Header
                id="heartHeader"
                as="h1"
                content={heartHeading[this.state.indexHeart]}
              />
              <Button.Group style={{ marginBottom: '1em' }}>
                <Button onClick={handleStartPassage} basic color="purple">Get Started</Button>
                <Button.Or />
                {
                  firstPassage ?
                  <Button onClick={() => { handleTrainPassage(firstPassage[0]) }} basic color="purple">Try An Example</Button>
                  : null
                }
              </Button.Group>
            </Container>
          </Grid.Row>

          <Grid.Row style={{ padding: '0.5em', marginTop: '4em' }}>
            <Grid columns={3}>
              <Grid.Column width={4}>
                <Card color="purple" style={{ minHeight: 120, fontSize: '1.3em' }}>
                  <Card.Content header="Step 1" style={{ fontSize: '0.7em' }} />
                  <Card.Content description={card1} />
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card color="purple" style={{ minHeight: 120, fontSize: '1.3em' }}>
                  <Card.Content header="Step 2" style={{ fontSize: '0.7em' }} />
                  <Card.Content description={card1} />
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card color="purple" style={{ minHeight: 120, fontSize: '1.3em' }}>
                  <Card.Content header="Step 3" style={{ fontSize: '0.7em' }} />
                  <Card.Content description={card1} />
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card color="purple" style={{ minHeight: 120, fontSize: '1.3em' }}>
                  <Card.Content header="Step 3" style={{ fontSize: '0.7em' }} />
                  <Card.Content description={card1} />
                </Card>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapState = (state) => {
  return {
    passages: state.passages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleTrainPassage(passage) {
      dispatch(gotPassage(passage))
      history.push('/train')
    },
    handleStartPassage() {
      dispatch(gotPassage({}))
      history.push('/passages/new')
    }
  }
}

export default connect(mapState, mapDispatchToProps)(LandingPage)
