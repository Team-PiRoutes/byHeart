import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Label, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchPassage, updatePassage, gotPassage, postPassage } from '../store'
import history from '../history'
import './PassageForm.css'

class PassageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.passage.title || '',
      content: this.props.passage.content || '',
      label: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClearButton = this.handleClearButton.bind(this)
    this.getLabel = this.getLabel.bind(this)
  }

  componentWillMount() {
    if (this.props.match.path === '/passages/:id/edit') {
      if (this.props.match.params.id) {
        this.props.loadInitialData(this.props.match.params.id)
      } else if (!this.props.passage.content) {
        history.push('/passages/new')
      }
    } else if (this.props.match.path === '/newpassage') {
      history.push('/passages/new')
    }
  }

  componentWillReceiveProps(nextProps) {

    // if user goes to the 'new' form with a passage in the store
    if (nextProps.match.path === '/passages/new') {
      if (nextProps.passage.id) {
        history.push(`/passages/${nextProps.passage.id}/edit`)
      }
    }

    if (nextProps.passage && (nextProps.passage.title || nextProps.passage.content)) {
      this.setState({
        title: nextProps.passage.title,
        content: nextProps.passage.content
      })
    }
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleClearButton(event) {
    event.preventDefault()
    this.setState({
      title: '',
      content: ''
    })
    this.props.clearPassage()
  }

  getLabel() {
    if (this.props.match.path === '/passages/new') {
      return 'What do you want to memorize?'
    } else {
      return 'You are editing your saved passage'
    }
  }

  render() {

    const { handleStart, handleSave, userId, handleUpdate, passage } = this.props
    // console.log('passage: ', passage)
    const { title, content } = this.state
    const label = this.getLabel()

    return (

      <Segment style={{ marginLeft: '2%', marginRight: '2%' }}>
        <Form onSubmit={(event) => {handleStart(event, passage)}}>
          <Label pointing="below" size="large">{label}</Label>
          <Input
            value={title}
            onChange={(event) => {this.handleChange(event, 'title')}}
            id="formTitle"
            style={{ width: '100%', marginLeft: '0' }}
            name="passageTitle"
            placeholder="Title"
          />
          <TextArea
            value={content}
            onChange={(event) => {this.handleChange(event, 'content')}}
            id="formContent"
            autoHeight
            style={{ minHeight: 200 }}
            name="passageContent"
            label="Passage"
            placeholder="Passage"
          />
          <div style={{ width: '100%' }}>
            <Button type="submit" content="Start" floated="right" style={{ marginRight: '2%' }} />
            {(title !== '' || content !== '') ?
            <Button
              onClick={(event) => { this.handleClearButton(event) }}
              content="Clear"
              floated="right"
              style={{ marginRight: '2%' }}
            /> : null }
            {(userId && !passage.id)
              ? <Button onClick={(event) => { handleSave(userId, passage, event) }} content="Save" floated="right" style={{ marginRight: '2%' }} />
              : null
            }
            {(passage.id && userId && passage.authorId === userId)
              ? <Button onClick={(event) => { handleUpdate(passage, event) }} content="Update" floated="right" style={{ marginRight: '2%' }} />
              : null
            }
          </div>
        </Form>
      </Segment>
    )
  }
}

const mapState = state => {
  return {
    passage: state.passage,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(passageId) {
      dispatch(fetchPassage(passageId))
    },
    handleStart(event, passage) {

      event.preventDefault()
      passage.title = event.target.passageTitle.value
      passage.content = event.target.passageContent.value

      dispatch(gotPassage(passage))

      if (passage.id) {
        history.push(`/train/${passage.id}`)
      } else {
        history.push('/train/')
      }
    },
    handleSave(authorId, passage, event) {
      passage.title = document.getElementById('formTitle').value
      passage.content = document.getElementById('formContent').value
      event.preventDefault()
      if (authorId && !passage.id) {
        passage.authorId = authorId
        dispatch(postPassage(passage))
      }
    },
    handleUpdate(passage, event) {
      passage.title = document.getElementById('formTitle').value
      passage.content = document.getElementById('formContent').value
      event.preventDefault()
      if (passage.id) {
        dispatch(updatePassage(passage))
      }
    },
    clearPassage() {
      dispatch(gotPassage({}))
      history.push('/passages/new')
    }
  }
}


export default connect(mapState, mapDispatch)(PassageForm)
