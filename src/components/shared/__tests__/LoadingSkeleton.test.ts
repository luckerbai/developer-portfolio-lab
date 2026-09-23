import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSkeleton from '../LoadingSkeleton.vue'

describe('LoadingSkeleton', () => {
  it('should render', () => {
    const wrapper = mount(LoadingSkeleton)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with default count of cards', () => {
    const wrapper = mount(LoadingSkeleton)
    const cards = wrapper.findAll('.rounded-lg.border')
    expect(cards.length).toBe(6)
  })

  it('should render with custom count of cards', () => {
    const wrapper = mount(LoadingSkeleton, {
      props: {
        count: 3,
      },
    })
    const cards = wrapper.findAll('.rounded-lg.border')
    expect(cards.length).toBe(3)
  })
})
