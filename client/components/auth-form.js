import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
/**
 * COMPONENT
 */

const flexItems = { flex: '1 1', alignSelf: 'center', width: '300px' }
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div
      className="login-form" style={{
        margin: 'auto',
        maxWidth: '600px',
        minWidth: '350px',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Header as="h2" color="purple" textAlign="center">
        {displayName} for by❤️
        </Header>
      <Form
        size="large" onSubmit={handleSubmit} name={name} style={{
          ...flexItems,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'

        }}>
        <Form.Input
          style={{ ...flexItems, marginBottom: '0px', marginPadding: '0px' }}
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          name="email"

        />
        <Form.Input
          style={
            { ...flexItems, marginBottom: '0px', marginPadding: '0px' }
          }
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="password"
        />
        <Button
          style={
            { ...flexItems, margin: '5px 0px' }
          } color="purple" fluid size="large">{displayName}</Button>
      </Form>
      <Message style={{
        margin: 'auto',
        maxWidth: '600px',
        minWidth: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}>
        {error && error.response && <div> {error.response.data} </div>}
        <a style={{ ...flexItems, alignText: 'center', color: 'purple' }} href="/auth/google">{displayName} with Google</a>
        {name !== 'signup' &&
          (<span style={{ ...flexItems, alignText: 'center', color: '#d042ff' }}> New to us?
         <a style={{ ...flexItems, color: '#d042ff' }} href="../signup"> Sign Up</a>
          </span>)}
      </Message>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
