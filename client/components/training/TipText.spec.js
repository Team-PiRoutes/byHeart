
/* eslint-disable */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TipText from './TipText'


const adapter = new Adapter()
enzyme.configure({ adapter })

describe('TipText ', () => {
  const fakeArray = [
    "0123456789",
    "_123456789",
    "__23456789",
    "___3456789",
    "____456789",
    "_____56789",
    "______6789",
    "_______789",
    "________89",
    "__________9",
    "___________",]

  let wrapper
  const originalText =
    describe('TipText shallow tests', () => {

      it('Component renders the original word at decimation 0', () => {
        wrapper = shallow(<TipText
          decimateLevel={0}
          hintArray={fakeArray} />)
        expect(wrapper.render().text()).to.include(fakeArray[0])
      })
      it('Component renders the correct word for current decimation level', () => {
        let level = 5
        expect(shallow(<TipText
          decimateLevel={level}
          hintArray={fakeArray} />).render().text()).to.include(fakeArray[level++])

        expect(shallow(<TipText
          decimateLevel={level}
          hintArray={fakeArray} />).render().text()).to.include(fakeArray[level++])

        expect(shallow(<TipText
          decimateLevel={level}
          hintArray={fakeArray} />).render().text()).to.include(fakeArray[level++])
      })
    })


  describe('TipText behavior tests', () => {
    let wrapper
    let level = 5
    beforeEach(() => {
      console.log('before each')
      wrapper = mount(<TipText
        decimateLevel={level}
        hintArray={fakeArray}
        tickDuration={10} />)
      console.log('the wrapper:  ')
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it("State's hover property should start as false", () => {
      // console.log('state check #@$%@# ', wrapper.state("hover"))
      expect(wrapper.state("hover")).to.be.false
    })
    it("Set state hover property to true on mouse in for span", () => {

      wrapper.find("span").simulate('mouseEnter')
      expect(wrapper.state("hover")).to.be.true
    })

  })
})
