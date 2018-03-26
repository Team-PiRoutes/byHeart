import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sticky, Checkbox } from 'semantic-ui-react'
import './PassageTrainer.css'
import TextWithLineBreaks from './TextWithLineBreaks'
import DifficultyLabel from './DifficultyLabel'

const HARDER = 'ArrowRight'
const EASIER = 'ArrowLeft'

class PassageTraining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decimateLevel: 0,
      hideHardSpace: false
    }
    this.makeEasier = this.makeEasier.bind(this)
    this.makeHarder = this.makeHarder.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  // componentDidMount() {
  //   this.slideBar.focus()
  // }

  makeEasier() {
    const decimateLevel = this.state.decimateLevel
    if (decimateLevel > 0) {
      this.setState({
        decimateLevel: decimateLevel - 1
      })
    }
  }

  makeHarder() {
    const decimateLevel = this.state.decimateLevel
    if (decimateLevel < 10) {
      this.setState({
        decimateLevel: decimateLevel + 1
      })
    }
  }

  handleKeyPress(event) {
    console.log('event: ', event.code)
    console.log('this.makeHarder: ', this.makeHarder)
    if (event.code === HARDER) this.makeHarder()
    else if (event.code === EASIER) this.makeEasier()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress, true)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress, true)
  }

  handleContextRef = contextRef => {
    this.setState({ contextRef })
  }

  handleInputChange = (event) => {
    this.setState({ decimateLevel: +event.target.value })
  }

  handlePaginationChange = (event, { decimateLevel }) => this.setState({ decimateLevel })

  handleToggleHardSpace = () => {
    this.setState({
      ...this.state,
      hideHardSpace: !this.state.hideHardSpace
    })
    // this.slideBar.focus()
  }

  render() {
    let { contextRef, hideHardSpace } = this.state

    let content = !this.props.content ? '' :
      this.props.content


    if (this.state.hideHardSpace) {
      content = content.replace(/_/g, '')
    }

    return (
      <div className="container">
        <div id="stickyZone" ref={this.handleContextRef}>
          <Sticky context={contextRef} >
            <div className="decimate">
              <input
                id="slideBar"
                min={0}
                max={10}
                onChange={this.handleInputChange}
                type="range"
                value={this.state.decimateLevel}
                ref={(input) => { this.slideBar = input }}
              />
              <Checkbox className="checkbox-spaces" label="No spaces?" onChange={this.handleToggleHardSpace} checked={hideHardSpace} />
            </div>
            <DifficultyLabel decimateLevel={this.state.decimateLevel} />
          </Sticky>

          <div className="passageTextContainer">
            <TextWithLineBreaks
              text={content}
              decimateLevel={this.state.decimateLevel}
              hideHardSpace={this.state.hideHardSpace}
            />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    content: state.passage.content,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(PassageTraining)
