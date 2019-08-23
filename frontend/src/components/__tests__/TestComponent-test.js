

import React from 'react'
import TestComponent from '../TestComponent';
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe( "Test Component", () => {
  let wrapper 
  
  it('should be rendered', () => {
    wrapper = shallow(<TestComponent />)
    expect(wrapper.length).toBe(1)
  })
})