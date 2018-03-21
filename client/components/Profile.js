import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { gotPassage, fetchPassages } from '../store/'
import { Card, Button, Icon, Label, Popup } from 'semantic-ui-react'
import history from '../history'

export class Profile extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { passages, user, handleNewPassage, handleTrainPassage, handleEditPassage } = this.props
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
                <Card key={`passage-${passage.id}`} className="card" color="purple" centered>
                  <Card.Content>
                    <Button floated="right" animated="vertical" size="mini" className="cardButton">
                      <Button.Content hidden>Delete</Button.Content>
                      <Button.Content visible>
                        <Icon name="delete" size="small" />
                      </Button.Content>
                    </Button>
                    <Card.Header style={{overflowWrap: 'break-word', padding: '0.5em'}}>
                        {passage.title}
                    </Card.Header>
                    <Card.Description style={{overflowWrap: 'break-word'}}>
                      {passage.content.slice(0, 80).concat('(...)')}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
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
                    <Popup
                      trigger={
                        <Button as="div" size="mini" floated="right" labelPosition="right">
                          <Button color="purple">
                            <Icon name="clock" size="large" />
                          </Button>
                          <Label as="a" basic color="purple" pointing="left">00:00:08:4</Label>
                        </Button>
                      }
                      content="Last time you read this passage in this amount of time"
                      position="bottom center"
                      on="hover"
                      inverted
                    />
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
