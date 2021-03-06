import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { gotPassage, fetchPassages, removePassage } from '../store/'
import { Card, Button, Icon } from 'semantic-ui-react'
import history from '../history'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.show = this.show.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  show = () => this.setState({ open: true })
  handleCancel = () => this.setState({ open: false })
  handleConfirm = () => this.setState({ open: false })

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { passages, user, handleNewPassage, handleTrainPassage, handleEditPassage, handleDeletePassage, handlePassageStats } = this.props
    const filteredPassages = passages.filter(passage => passage.authorId === user.id)

    return (
      <div className="profile">
        <h1>My Profile</h1>
        <div className="passage-cards">
          <Card.Group itemsPerRow={3}>
            <Card>
              <Card.Content id="newCard" textAlign="center" color="grey">
                <Button animated="fade" size="huge" className="cardButton" onClick={handleNewPassage}>
                  <Button.Content hidden>Add New</Button.Content>
                  <Button.Content visible>
                    <Icon name="plus square outline" size="huge" />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
            {filteredPassages && filteredPassages.map(passage => {
              return (
                <Card key={`passage-${passage.id}`} id="card" className="card" color="purple" raised centered>
                  <Card.Content>
                    <Card.Header style={{ overflowWrap: 'break-word', padding: '0.5em' }}>
                      {passage.title}
                      {
                        passage.isPublic ?
                          <Card.Meta>Public</Card.Meta>
                          : <Card.Meta>Private</Card.Meta>
                      }
                    </Card.Header>
                    <Card.Description style={{ overflowWrap: 'break-word' }}>
                      {passage.content.slice(0, 80).concat('(...)')}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content id="extraContent" extra>
                    <Button animated="vertical" size="mini" className="cardButton" onClick={() => { handleTrainPassage(passage) }}>
                      <Button.Content hidden>Train</Button.Content>
                      <Button.Content visible>
                        <Icon name="file text outline" size="large" />
                      </Button.Content>
                    </Button>
                    <Button animated="vertical" size="mini" className="cardButton" onClick={() => { handleEditPassage(passage) }}>
                      <Button.Content hidden>Edit</Button.Content>
                      <Button.Content visible>
                        <Icon name="edit" size="large" />
                      </Button.Content>
                    </Button>
                    <Button
                      animated="vertical"
                      size="mini"
                      className="cardButton"
                      onClick={() => { handleDeletePassage(passage.id) }}
                    >
                      <Button.Content hidden>Delete</Button.Content>
                      <Button.Content visible>
                        <Icon name="trash" size="large" />
                      </Button.Content>
                    </Button>
                    <Button
                      floated="right"
                      color="purple"
                      size="mini"
                      className="cardButton"
                      onClick={() => { handlePassageStats(passage) }}
                    >
                      <Button.Content>
                        <Icon name="bar graph" size="large" />
                      </Button.Content>
                    </Button>
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
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
    handleNewPassage() {
      event.preventDefault()
      dispatch(gotPassage({}))
      history.push('/newpassage')
    },
    handleEditPassage(passage) {
      dispatch(gotPassage(passage))
      history.push(`/passages/${passage.id}/edit`)
    },
    handleTrainPassage(passage) {
      dispatch(gotPassage(passage))
      history.push(`/train/${passage.id}`)
    },
    loadInitialData() {
      dispatch(fetchPassages())
    },
    handleDeletePassage(id) {
      event.preventDefault()
      dispatch(removePassage(id))
    },
    handlePassageStats(passage) {
      event.preventDefault()
      dispatch(gotPassage(passage))
      history.push(`/passages/${passage.id}/stats`)
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)

Profile.propTypes = {
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
