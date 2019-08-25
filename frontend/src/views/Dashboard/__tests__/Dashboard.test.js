import React from 'react'
import {shallow} from 'enzyme'
import Dashboard from '../Dashboard'
import Header from '../Components/Header'
import Routes from '../Components/Routes'
import {Grommet} from 'grommet'

const defaultProps = {
  theme: {}
}

describe("Dashboard", () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Dashboard {...defaultProps}/>)
    })

  it('should be rendered', () => {
    expect(wrapper.length).toBe(1)
  })

  it('should contain Header component', () => {
    expect(wrapper.find(Header).length).toBe(1)
  })

  it('should contain routes component', () => {
    expect(wrapper.find(Routes).length).toBe(1)
  })
  
  it('should render Grommet Wrapper', () => {
    expect(wrapper.find(Grommet).length).toBe(1)
  })

    describe("Grommet Wrapper", () => {
      it('should contain theme prop' , () => {
        const grommet = wrapper.find(Grommet)
        expect(grommet.props().theme).toEqual(defaultProps.theme)
      })
    })

} )
