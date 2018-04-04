
/* eslint-disable */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  NOT_ENOUGH_ATTEMPTS,
  NOT_ENOUGH_VERSION,
  NOT_ENOUGH_DIFFICULTY_LEVEL,
  NOT_ENOUGH_DIFFICULTY_AND_VERSION,
  filterDecimate,
  setXandY,
  filterVersion,
  sufficientData,
} from './GraphWrapper'
const adapter = new Adapter()


enzyme.configure({ adapter })


describe('GraphWrapper: ', () => {
  describe('Functions: ', () => {


    describe('SufficientData function', () => {
      let toDisplayText,
        toFilterByLevel,
        toFilterByVersion

      it('returns correct text when not enough data', () => {
        toDisplayText = true
        toFilterByLevel = false
        toFilterByVersion = false
        expect(sufficientData(toDisplayText, toFilterByLevel, toFilterByVersion)).to.be.equal(NOT_ENOUGH_ATTEMPTS)
      })
      it('returns correct text when difficulty filter leaves less than 2 datapoints', () => {

        toDisplayText = true
        toFilterByLevel = true
        toFilterByVersion = false
        expect(sufficientData(toDisplayText, toFilterByLevel, toFilterByVersion)).to.be.equal(NOT_ENOUGH_DIFFICULTY_LEVEL)
      })
      it('returns correct text when sorted by version ', () => {
        toDisplayText = true
        toFilterByLevel = false
        toFilterByVersion = true
        expect(sufficientData(toDisplayText, toFilterByLevel, toFilterByVersion)).to.be.equal(NOT_ENOUGH_VERSION)
      })
      it('returns correct text when not enough data', () => {
        toDisplayText = true
        toFilterByLevel = true
        toFilterByVersion = true
        expect(sufficientData(toDisplayText, toFilterByLevel, toFilterByVersion)).to.be.equal(NOT_ENOUGH_DIFFICULTY_AND_VERSION)
      })
    })
    describe('filterDecimate function ', () => {
      let testData = []
      const countPerLevel = 5
      const numberOfLevels = 13 // 0 thru 10
      for (let i = 0; i < countPerLevel * numberOfLevels; i++) {
        testData.push({
          decimationLevel: i % numberOfLevels
        })
      }

      it('Removes all data points not at decimationLevel', () => {
        for (let i = 0; i < numberOfLevels; i++) {

          expect(filterDecimate(i, testData).length).to.be.equal(countPerLevel)
        }
      })
      it('Does not mutate the original array', () => {
        filterDecimate(0, testData)
        expect(testData).to.be.equal(testData)
      })
      it('handles empty data sets', () => {
        let result = filterDecimate(0, [])
        expect(Array.isArray(result)).to.be.equal(true)
        expect(result.length).to.be.equal(0)

      })
    })
    describe('setXandY function ', () => {
      const buildData = (array) => {
        for (let i = 0; i < 5; i++) {
          array.push({ z: i * 2, a: i * -2 })
        }
        return array
      }
      let testData = buildData([])

      for (let i = 0; i < 5; i++) {
        testData.push({ z: i * 2, a: i * -2 })
      }

      it('does not mutate the data points', () => {
        let corrected = setXandY(testData, 'z')
        expect(testData[0] === corrected[0]).to.be.equal(false)
        expect(testData[0].x).to.be.equal(undefined)
        expect(testData[0].y).to.be.equal(undefined)
      })

      it('all y properties are equal to yName property ', () => {
        let updatedZ = setXandY(testData, 'z')
        let updatedA = setXandY(testData, 'a')
        let i = 0
        expect(updatedZ[i].y).to.be.equal(testData[i].z)
        expect(updatedA[i].y).to.be.equal(testData[i].a)
        i++
        expect(updatedZ[i].y).to.be.equal(testData[i].z)
        expect(updatedA[i].y).to.be.equal(testData[i].a)
        expect(updatedZ[i].y).to.not.equal(testData[i].a)
        expect(updatedA[i].y).to.not.equal(testData[i].z)
        i++
        expect(updatedZ[i].y).to.be.equal(testData[i].z)
        expect(updatedA[i].y).to.be.equal(testData[i].a)
        expect(updatedZ[i].y).to.not.equal(testData[i].a)
        expect(updatedA[i].y).to.not.equal(testData[i].z)

      })
      it('All objects have an x property equal to their index.', () => {
        let updatedZ = setXandY(testData, 'z')
        let updatedA = setXandY(testData, 'a')
        for (let i = 0; i < updatedZ.length; i++) {
          expect(updatedZ[i].x).to.be.equal(i)
        }
      })
    })
    describe('filterDecimate function ', () => {
      const buildData = (array) => {
        for (let i = 0; i < 11; i++) {
          array.push({ x: i, z: i * 2, a: i * -2, decimationLevel: i })
        }
        return array
      }
      let array = []
      const testArray = buildData(array)
      const filteredArray = filterDecimate(2, testArray)

      it('does not mutate the array', () => {
        expect(testArray).to.not.equal(filteredArray)
      })
      it('elminates all but the correct decimationLevel', () => {
        const filteredArray = filterDecimate(2, testArray)
        expect(filteredArray.length).to.be.equal(1)
        expect(filteredArray[0].decimationLevel).to.be.equal(2)
      })

    })
    describe('filterVersion function ', () => {
      const buildData = (array) => {
        for (let i = 0; i < 5; i++) {
          array.push({ x: i, z: i * 2, a: i * -2, passageUpdatedAt: i % 2 })
        }
        return array
      }
      let array = []
      const testArray = buildData(array)
      const filteredV0 = filterVersion(0, testArray)
      const filteredV1 = filterVersion(1, testArray)

      it('does not mutate the array', () => {
        expect(testArray).to.not.equal(filteredV0)
        expect(testArray).to.not.equal(filteredV1)
      })

      it('Eliminate only the dataPoints that do not match version provided', () => {
        let version = 0
        let filteredArray = filterVersion(version, testArray)
        expect(filteredArray.length).to.be.equal(3)
        expect(filteredArray[0].passageUpdatedAt).to.be.equal(version)
        version = 1
        filteredArray = filterVersion(version, testArray)
        expect(filteredArray.length).to.be.equal(2)
        expect(filteredArray[0].passageUpdatedAt).to.be.equal(version)
        version = 2
        filteredArray = filterVersion(version, testArray)
        expect(filteredArray.length).to.be.equal(0)
      })
    })
  })
})
