import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from '../EmptyState.vue'

describe('EmptyState', () => {
  it('should render with default props', () => {
    const wrapper = mount(EmptyState)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render title and description', () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: 'No data',
        description: 'Please add some data',
      },
    })
    expect(wrapper.text()).toContain('No data')
    expect(wrapper.text()).toContain('Please add some data')
  })

  it('should render icon when provided', () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: 'Empty',
        icon: '📭',
      },
    })
    expect(wrapper.text()).toContain('📭')
  })
})
