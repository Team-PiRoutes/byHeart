
/* eslint-disable */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TextWithLineBreaks from './TextWithLineBreaks'
import SpannedText from './SpannedText'


describe('Text with Line break', () => {
  const adapter = new Adapter()
  enzyme.configure({ adapter })

  let wrapper
  const text = `I
  am
  testing`

  beforeEach(() => {
    wrapper = shallow(<TextWithLineBreaks text={text} />)
  })
  it('Component renders a SpannedText for each line break', () => {
    expect(wrapper.find(SpannedText).length).to.equal(3)
  })
})