import React from 'react'
import { shallow } from 'enzyme'
import Routes from '../Routes'
import { Route } from 'react-router'
import FlashcardPreview from './../../../FlashcardPreview/FlashcardPreview'


describe('Routes', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Routes />)
  })

  it('should render component', () => {
    expect(wrapper.length).toBe(1)
  })

  it('should contain react router', () => {
    const router = wrapper.find('BrowserRouter')
    console.log(router.children())
    expect(router.length).toBe(1)
  })

  describe('with react routes', () => {

    let router
    beforeEach(() => {
      router = wrapper.find('BrowserRouter')
    })

    describe.skip('contains default route', () => {
      const defaultPath = '/'
      let defaultRoute

      beforeEach(() => {
        defaultRoute = router.findWhere(n => n.type() === Route && n.prop('path') === defaultPath)
      })

      it('should be rendered', () => {
        expect(defaultRoute.length).toBe(1)
      })

      it('should have exact prop', () => {
        expect(defaultRoute.prop('exact')).toEqual(true)
      })

      it('should contian flashcard preview component', () => {
        expect(defaultRoute.prop('component')).toEqual(FlashcardPreview)
      })
    })
  })
})