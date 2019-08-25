import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'
import { Box, Grid } from 'grommet'
import Logo from '../Logo'

describe('Header', () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Header />)
  })

  it('should be rendered', () => {
    expect(wrapper.length).toBe(1)
  })

  it('should contains Grid wrapper', () => {
    expect(wrapper.find(Grid).length).toBe(1)
  })

  describe('Grid', () => {

    it('should contains Box', () => {
      expect(wrapper.find(Grid).find(Box).length).toBe(1)
    })

    describe('Box' , () => {
      let box

      beforeEach(() => {
        box = wrapper.find(Box)
      })

      it('should Box be rendered with proper GridArea', () => {
        const gridArea = 'header'
        expect(box.props().gridArea).toEqual(gridArea)
      })
  
      it('should contain Logo component' , () => {
        expect(box.find(Logo).length).toBe(1)
      })
    })
  })
})