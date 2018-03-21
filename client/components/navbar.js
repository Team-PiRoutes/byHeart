import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu, Button } from 'semantic-ui-react'
import './Navbar.css'


const Navbar = ({ handleClick, isLoggedIn }) => (
  <Menu borderless className="navbar" fixed="top">
    <Menu.Menu>
      {/*<Menu.Item as="a" header>
        <Image
          size="small"
          src={'byheart-logo.png'}
          style={{ marginRight: '0.2em', padding: '0px' }}
        />
</Menu.Item>*/}
      <Menu.Item style={{ fontSize: '1.5em', padding: '0.7em' }}>
        by<Link to="/">❤️</Link>
      </Menu.Item>
    </Menu.Menu>
    {isLoggedIn ?
      <Menu.Menu position="right">
        {/* The navbar will show these links after you log in */}
        <Menu.Item>
          <Button className="navButton" style={{ marginLeft: '0.5em' }} as={Link} to="/profile">Profile</Button>
          <Button className="navButton" style={{ marginLeft: '0.5em' }} as={Link} to="/">Home</Button>
          <Button className="navButton" style={{ marginLeft: '0.5em' }} as={Link} to="/" href="#" onClick={handleClick}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
      :
      <Menu.Menu position="right">
        {/* The navbar will show these links before you log in */}
        <Menu.Item>
          <Button className="navButton" style={{ marginLeft: '0.5em' }} as={Link} to="/login">Login</Button>
          <Button className="navButton" style={{ marginLeft: '0.5em' }} as={Link} to="/signup">Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
    }
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
* PROP TYPES
*/
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
