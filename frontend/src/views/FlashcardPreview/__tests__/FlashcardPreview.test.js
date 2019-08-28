import React from 'react'
import { shallow } from 'enzyme'
import FlashcardPreview from '../FlashcardPreview';

describe('FlashcardPreview',() => {

  it('should be rendered',() => {
    const wrapper = shallow(<FlashcardPreview />)
    expect(wrapper.length).toBe(1)
  })
})