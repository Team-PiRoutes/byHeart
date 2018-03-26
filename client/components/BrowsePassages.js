import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPassages } from '../store'
import { Card, Button, Icon, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// import history from '../history'

export class BrowsePassages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  render () {
    const { passages, user } = this.props
    const filteredPassages = passages.filter(passage => passage.authorId !== user.id)

    return (
      <div>
      <div className="profile">
        <h1>Browse Public Passages</h1>
        <div className="passage-cards">
          <Card.Group itemsPerRow={3}>
            {filteredPassages && filteredPassages.map(passage => {
              return (
                <Card key={`passage-${passage.id}`} className="card" color="purple" centered>
                  <Card.Content>
                    <Card.Header style={{ overflowWrap: 'break-word', padding: '0.5em' }}>
                      <Link to={`/train/${passage.id}`} >
                        {passage.title}
                      </Link>
                    </Card.Header>
                    <Card.Description style={{ overflowWrap: 'break-word' }}>
                      {passage.content.slice(0, 80).concat('(...)')}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        </div>
      </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    passages: state.passages,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchPassages())
    }
  }
}

export default connect(mapState, mapDispatch)(BrowsePassages)


BrowsePassages.propTypes = {
  passages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      isPublic: PropTypes.bool,
      authorId: PropTypes.number
    })
  )
}
