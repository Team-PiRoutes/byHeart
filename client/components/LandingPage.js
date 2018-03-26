import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gotPassage } from '../store/passage'
import history from '../history'
import { Button, Container, Header, Card, Image } from 'semantic-ui-react'
import { decimateString } from '../utils/decimate'
import './LandingPage.css'


const card1 = [
  'Read full text at once or line-by-line',
]
const card2 = [
  'Letters disappear from your text depending on chosen difficulty level',
]
const card3 = [
  'Edit, save or delete your passages',
]
const card4 = [
  'Get hints when you are stuck',
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
      <Container text id="landing" textAlign="center" style={{ height: 100 }} vertical="true">
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
        <Card.Group id="landing-cards" itemsPerRow={4}>
          <Card className="card-landing" color="purple">
            <Card.Content>
              <Card.Header>LEARN</Card.Header>
              <Card.Description>{card1}</Card.Description>
            </Card.Content>
          </Card>
          <Card className="card-landing" color="purple">
            <Card.Content>
              <Card.Header>IT</Card.Header>
              <Card.Description>{card2}</Card.Description>
              <Image src="decimation.gif" />
            </Card.Content>
          </Card>
          <Card className="card-landing" color="purple">
            <Card.Content>
              <Card.Header>BY</Card.Header>
              <Card.Description>{card3}</Card.Description>
            </Card.Content>
          </Card>
          <Card className="card-landing" color="purple">
            <Card.Content>
              <Card.Header>HEART</Card.Header>
              <Card.Description>{card4}</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
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
