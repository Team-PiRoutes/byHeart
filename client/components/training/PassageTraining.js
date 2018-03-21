import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sticky, Checkbox } from 'semantic-ui-react'
import './PassageTrainer.css'
import TextWithLineBreaks from './TextWithLineBreaks'

class PassageTraining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decimateLevel: 0,
      hideHardSpace: true
    }
  }

  componentDidMount() {
    this.slideBar.focus()
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
    this.slideBar.focus()
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
              <Checkbox label="No space?" onChange={this.handleToggleHardSpace} checked={hideHardSpace} />
            </div>
          </Sticky>

          <div className="passageTextContainer">
            <TextWithLineBreaks text={content} decimateLevel={this.state.decimateLevel} />
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
