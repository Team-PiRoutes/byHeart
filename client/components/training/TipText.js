import React from 'react'
import { individualWordHint } from '../../utils/wordHint'

class TipText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      hintLevel: this.props.decimateLevel
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.hintTick = this.hintTick.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ hintLevel: nextProps.decimateLevel })
  }

  hintTick() {

    const hintObj = individualWordHint(this.props.hintArray, this.state.hintLevel)
    this.setState({
      hintLevel: hintObj.hintLevel
    })
  }

  handleMouseEnter() {
    //this option is for testing.
    let tick = this.props.tickDuration || 1500
    this.setState({
      hover: true
    })

    this.intervalId = setInterval(this.hintTick, tick)
  }


  handleMouseOut() {
    clearInterval(this.intervalId)
    this.setState({
      hover: false,
      hintLevel: this.props.decimateLevel
    })
  }

  render() {
    //optional props for colors
    let { highLight, hintColor } = this.props
    let styleObj = {}

    if (this.state.hover) {
      styleObj.backgroundColor = highLight || `rgb(240, 238, 241)`

      const isHint = this.state.hintLevel !== this.props.decimateLevel
      if (isHint) {
        styleObj.textShadow = hintColor || 'rgb(78, 78, 78) 0px 0px 0.5px'
      }
    }
    return (
      <span
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        style={styleObj}
      >{/* do not refactor ".hintLevel]} </span>" it is
        necessary for proper word spacing.*/}
        {this.props.hintArray[this.state.hintLevel]} </span>
    )
  }
}

export default TipText
