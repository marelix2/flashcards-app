

import React from 'react'
import TestComponent from '../TestComponent';
import {shallow} from 'enzyme'

describe( "Test Component", () => {
  let wrapper 
  
  it('should be rendered', () => {
    wrapper = shallow(<TestComponent />)
    expect(wrapper.length).toBe(1)
  })
})