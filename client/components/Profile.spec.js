import { Profile } from './Profile.js'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import seedPassages from '../../script/passages'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<Profile />', () => {
  let passages
  let user = { id: 1 }

  beforeEach(() => {
    passages = shallow(<Profile passages={seedPassages} user={user} loadInitialData={() => {}} />)
  })

  it('should render as an h1', () => {
    expect(passages.find('h1').text()).to.equal('My Profile')
  })
})
