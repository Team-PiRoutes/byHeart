import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gotPassage } from '../store/passage'
import history from '../history'
import { Button } from 'semantic-ui-react'
import { decimateString } from '../utils/decimate'
import { clearInterval } from 'timers'


const card1 = [
  'Read full text at once or line by line',
]
const card2 = [
  'Letters disappear from your text depending on chosen difficulty level',
]
const card3 = [
  'Edit, delete or save passages on your profile.',
]
const card4 = [
  'Hover your mouse over a word to get hints when you are stuck',
]

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexHeart: 0,
      indexTag: 0
    }
    this.interval = null
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        indexHeart: (this.state.indexHeart + 1) % 6,
        indexTag: (this.state.indexTag + 1) % 11
      })
    }, 1200)
  }
  componentWillMount() {
    clearInterval(this.interval)
  }
  render() {
    const { passages, handleTrainPassage, handleStartPassage } = this.props
    const firstPassage = passages.filter(passage => passage.id === 1)
    const heartHeading = ['By Heart', 'By Hear', 'By Hea', 'By He', 'By H', 'by❤️']
    const str = "It doesn't have to be hard to learn your lines"
    const tagLineTwo = decimateString(str, this.state.indexTag)

    return (
      <div id="landing">
        <h2 id="tagLine">
          {tagLineTwo}
        </h2>
        <h1 id="heartHeader">
          {heartHeading[this.state.indexHeart]}
        </h1>
        <div id="home-buttons">
          <Button.Group style={{ marginBottom: '1em' }}>
            <Button onClick={handleStartPassage} basic color="purple">Get Started</Button>
            <Button.Or />
            {
              firstPassage ?
                <Button onClick={() => { handleTrainPassage(firstPassage[0]) }} basic color="purple">Try An Example</Button>
                : null
            }
          </Button.Group>
        </div>
        <div id="landing-cards">
          <div className="card-landing">
            <div>
              <h3>LEARN</h3>
              <p>{card1}</p>
              <img className="landing-card-img" src="views.gif" />
            </div>
          </div>
          <div className="card-landing" color="purple">
            <div>
              <h3>IT</h3>
              <p>{card2}</p>
              <img className="landing-card-img" src="decimation.gif" />
            </div>
          </div>
          <div className="card-landing" color="purple">
            <div>
              <h3>BY</h3>
              <p>{card3}</p>
              <img className="landing-card-img" src="profile.png" />
            </div>
          </div>
          <div className="card-landing" color="purple">
            <div>
              <h3>HEART</h3>
              <p>{card4}</p>
              <img className="landing-card-img" src="hint.gif" />
            </div>
          </div>
        </div>
      </div>
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
