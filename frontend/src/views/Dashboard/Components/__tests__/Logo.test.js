import React from 'react'
import { shallow } from 'enzyme'
import Logo from '../Logo'
import toUpper from 'lodash/toUpper'

const defaultProps = {
  text: 'flashcard'
}

describe('Logo', () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Logo {...defaultProps}/>)
  })

  it('should be rendered', () => {
    expect(wrapper.length).toBe(1)
  })

  it('should contain flashcard text inside', () => {
    expect(wrapper.text()).toEqual(toUpper('flashcard'))
  })

  it('should logo text be always upper case' , () => {
    const text = 'some new logo text'
    wrapper = shallow(<Logo  text={text}/>)
    expect(wrapper.text()).toEqual(toUpper(text))
  })
})