import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LineByLineTrainer.css'
import { decimateString } from '../../utils/decimate'
import { breakIntoLines } from '../../utils/text-to-lines'
import { createRehearsal } from '../../store/'
import DifficultyLabel from './DifficultyLabel'

import Card from './Card'
import StartButton from './StartButton'
import Finished from './Finished'
import ProgressBar from './ProgressBar'

const WAITING_TO_BEGIN = 'WAITING_TO_BEGIN'
const TRAINING = 'TRAINING'
const FINISHED = 'FINISHED'
// const PREVIOUS = 'ArrowUp'
const NEXT = 'ArrowDown'
const HARDER = 'ArrowRight'
const EASIER = 'ArrowLeft'
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
      lastKeyPressed: null,
      isRehearsalSaved: false,
      hideHardSpace: false
    }
    this.startTraining = this.startTraining.bind(this)
    this.nextCard = this.nextCard.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.makeHarder = this.makeHarder.bind(this)
    this.startHarder = this.startHarder.bind(this)
    this.startEasier = this.startEasier.bind(this)
    this.startOver = this.startOver.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFinishedKey = this.handleFinishedKey.bind(this)
    this.handleTrainingKey = this.handleTrainingKey.bind(this)
    this.handleWaitingKey = this.handleWaitingKey.bind(this)
    this.saveRehearsal = this.saveRehearsal.bind(this)
    this.handleToggleHardSpace = this.handleToggleHardSpace.bind(this)
  }

  handleKeyPress(event) {
    const { status } = this.state
    const { code } = event

    if (status === WAITING_TO_BEGIN) {
      this.handleWaitingKey(code)
    } else if (status === TRAINING) {
      this.handleTrainingKey(code)
    } else if (status === FINISHED) {
      this.handleFinishedKey(code)
    }
  }

  handleWaitingKey(code) {
    if (code === START || code === MOVE) this.startTraining()
    else if (code === HARDER) this.makeHarder()
    else if (code === EASIER) this.makeEasier()
  }

  handleTrainingKey(code) {
    if (code === NEXT) this.nextCard()
    // else if (code === PREVIOUS) this.previousCard()
    else if (code === START) this.startTraining()
    else if (code === MOVE) this.nextCard()
  }

  handleFinishedKey(code) {
    if (code === START) this.startOver()
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
      timeFinished: null,
      isRehearsalSaved: !this.props.userId // prevent non-users from saving
    })
  }

  startOver() {
    this.setState({
      currentLineIndex: 0,
      status: WAITING_TO_BEGIN,
      timeStarted: null,
      timeFinished: null,
      isRehearsalSaved: !this.props.userId // prevent non-users from saving
    })
  }

  handleInputChange = (event) => {
    this.setState({ decimationLevel: +event.target.value })
  }

  handleToggleHardSpace = () => {
    console.log('handleHardSpace')
    this.setState({
      ...this.state,
      hideHardSpace: !this.state.hideHardSpace
    })
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

  saveRehearsal() {
    const rehearsal = {
      userId: this.props.userId,
      passageId: this.props.passage.id,
      startTime: this.state.timeStarted,
      endTime: this.state.timeFinished,
      decimationLevel: this.state.decimationLevel,
      passageUpdatedAt: this.props.passage.updatedAt
    }

    if (rehearsal.userId && rehearsal.passageId && !this.state.isRehearsalSaved) {
      this.setState({ isRehearsalSaved: true })
      this.props.createRehearsal(rehearsal)
    }
  }

  render() {
    const { decimationLevel, currentLineIndex, status, isRehearsalSaved, hideHardSpace } = this.state
    const { passage } = this.props

    const lines = breakIntoLines(passage.content)
    const lineAbove = (currentLineIndex > 0) ? decimateString(lines[currentLineIndex - 1], decimationLevel, hideHardSpace) : ''
    // const currentLine = decimateString(lines[currentLineIndex], decimationLevel)
    const currentLine = lines[currentLineIndex]
    const lineBelow = (currentLineIndex < lines.length - 1) ? decimateString(lines[currentLineIndex + 1], decimationLevel, hideHardSpace) : ''


    switch (status) {
      case WAITING_TO_BEGIN:
        return (
          <div>
            <StartButton
              click={this.startTraining}
              handleInputChange={this.handleInputChange}
              decimationLevel={this.state.decimationLevel}
              input={(input) => { this.slideBar = input }}
              hideHardSpace={hideHardSpace}
              handleToggleHardSpace={this.handleToggleHardSpace}
            />
            <DifficultyLabel decimateLevel={this.state.decimationLevel} />
          </div>
        )
      case TRAINING:
        return (
          <div>
            <ProgressBar lines={lines} currentLineIndex={currentLineIndex} />
            <Card
              startOver={this.startOver}
              lineAbove={lineAbove}
              currentLine={currentLine}
              lineBelow={lineBelow}
              decimationLevel={decimationLevel}
              next={this.nextCard}
              hideHardSpace={hideHardSpace}
            />
            <DifficultyLabel decimateLevel={this.state.decimationLevel} />
          </div>
        )
      case FINISHED:
        return (
          <Finished
            startHarder={this.startHarder}
            startEasier={this.startEasier}
            startOver={this.startOver}
            time={this.state.timeFinished - this.state.timeStarted}
            saveRehearsal={this.saveRehearsal}
            isRehearsalSaved={isRehearsalSaved}
            decimationLevel={decimationLevel}
          />
        )
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
    passage: state.passage,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRehearsal(rehearsal) {
      dispatch(createRehearsal(rehearsal))
    },
  }
}

export default connect(mapState, mapDispatchToProps)(LineByLineTrainer)
