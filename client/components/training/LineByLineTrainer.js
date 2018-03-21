import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LineByLineTrainer.css'
import { decimateString } from '../../utils/decimate'
import { breakIntoLines } from '../../utils/text-to-lines'
import Card from './Card'
import StartButton from './StartButton'
import Finished from './Finished'

const WAITING_TO_BEGIN = 'WAITING_TO_BEGIN'
const TRAINING = 'TRAINING'
const FINISHED = 'FINISHED'
const PREVIOUS = 'ArrowLeft'
const NEXT = 'ArrowRight'
const HARDER = 'ArrowDown'
const EASIER = 'ArrowUp'
const START = 'Enter'
const MOVE = 'Space'

class LineByLineTrainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decimationLevel: 0,
      currentLineIndex: 0,
      status: WAITING_TO_BEGIN,
      timeStarted: null,
      timeFinished: null,
      lastKeyPressed: null
    }
    this.startTraining = this.startTraining.bind(this)
    this.nextCard = this.nextCard.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.makeHarder = this.makeHarder.bind(this)
    this.startHarder = this.startHarder.bind(this)
    this.startEasier = this.startEasier.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFinishedKey = this.handleFinishedKey.bind(this)
    this.handleTrainingKey = this.handleTrainingKey.bind(this)
    this.handleWaitingKey = this.handleWaitingKey.bind(this)
  }

  handleKeyPress(event) {
    const { status } = this.state
    const { code } = event
    console.log('code: ', code)

    if (status === WAITING_TO_BEGIN) {
      this.handleWaitingKey(code)
    } else if (status === TRAINING) {
      this.handleTrainingKey(code)
    } else if (status === FINISHED) {
      this.handleFinishedKey(code)
    }
  }

  handleWaitingKey(code) {
    if (code === START) this.startTraining()
    else if (code === MOVE) this.startTraining()
  }

  handleTrainingKey(code) {
    if (code === NEXT) this.nextCard()
    else if (code === PREVIOUS) this.previousCard()
    else if (code === HARDER) this.makeHarder()
    else if (code === EASIER) this.makeEasier()
    else if (code === START) this.nextCard()
  }

  handleFinishedKey(code) {
    if (code === START) this.startTraining()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress, true)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress, true)
  }

  startTraining() {
    this.setState({
      ...this.state,
      currentLineIndex: 0,
      status: TRAINING,
      timeStarted: Date.now(),
      timeFinished: null
    })
  }
  handleInputChange = (event) => {
    this.setState({ decimationLevel: +event.target.value })
  }
  nextCard() {
    if (this.state.status === TRAINING) {
      const currentLineIndex = this.state.currentLineIndex + 1
      const numOfLines = breakIntoLines(this.props.passage.content).length
      if (currentLineIndex < numOfLines) {
        this.setState({
          ...this.state,
          currentLineIndex
        })
      } else {
        this.setState({
          ...this.state,
          timeFinished: Date.now(),
          status: FINISHED
        })
      }
    }
  }

  previousCard() {
    if (this.state.status === TRAINING) {
      const currentLineIndex = this.state.currentLineIndex
      const numOfLines = breakIntoLines(this.props.passage.content).length
      if (currentLineIndex > 0) {
        this.setState({
          ...this.state,
          currentLineIndex: (currentLineIndex - 1) % numOfLines
        })
      }
    }
  }

  makeEasier() {
    const decimationLevel = this.state.decimationLevel
    if (decimationLevel > 0) {
      this.setState({
        ...this.state,
        decimationLevel: decimationLevel - 1
      })
    }
  }

  makeHarder() {
    const decimationLevel = this.state.decimationLevel
    if (decimationLevel < 10) {
      this.setState({
        ...this.state,
        decimationLevel: decimationLevel + 1
      })
    }
  }

  startHarder() {
    this.makeHarder()
    setTimeout(() => {
      this.startTraining()
    }, 1)
  }

  startEasier() {
    this.makeEasier()
    setTimeout(() => {
      this.startTraining()
    }, 1)
  }

  render() {
    const { decimationLevel, currentLineIndex, status } = this.state
    const { passage } = this.props

    const lines = breakIntoLines(passage.content)

    const lineAbove = (currentLineIndex > 0) ? decimateString(lines[currentLineIndex - 1], decimationLevel) : ''
    const currentLine = decimateString(lines[currentLineIndex], decimationLevel)
    const lineBelow = (currentLineIndex < lines.length - 1) ? decimateString(lines[currentLineIndex + 1], decimationLevel) : ''

    switch (status) {
      case WAITING_TO_BEGIN:
        return (
          <StartButton click={this.startTraining} />
        )
      case TRAINING:
        return (
          <div>
            <input
              id="slideBar"
              min={0}
              max={10}
              onChange={this.handleInputChange}
              type="range"
              value={this.state.decimationLevel}
              ref={(input) => { this.slideBar = input }}
            />
            <Card
              lineAbove={lineAbove}
              currentLine={currentLine}
              lineBelow={lineBelow}
              next={this.nextCard}
            />
          </div>
        )
      case FINISHED:
        return <Finished startHarder={this.startHarder} startEasier={this.startEasier} startOver={this.startTraining} time={this.state.timeFinished - this.state.timeStarted} />
      default:
        return <div>Something went wrong</div>
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    passage: state.passage
  }
}

export default connect(mapState)(LineByLineTrainer)
