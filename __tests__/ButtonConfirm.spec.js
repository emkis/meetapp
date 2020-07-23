import { mount } from '@vue/test-utils'

import ButtonConfirm from '@/components/ButtonConfirm'

describe('ButtonConfirm', () => {
  const customLabel = 'Delete account'
  const mockFunction = jest.fn()

  it('should render props.label inside the button', () => {
    const wrapper = mount(ButtonConfirm, {
      propsData: { label: customLabel, confirmAction: mockFunction },
    })

    expect(wrapper.find('button').element.textContent).toContain(customLabel)
  })

  it('should render the confirm message when clicked once', async () => {
    const wrapper = mount(ButtonConfirm, {
      propsData: { label: customLabel, confirmAction: mockFunction },
    })

    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    const message = wrapper.find('button').element.textContent.trim()

    expect(message).toBe('Click to confirm')
  })

  it('should execute props.confirmAction function when double-clicking in less than 1500ms', async () => {
    const wrapper = mount(ButtonConfirm, {
      propsData: { label: customLabel, confirmAction: mockFunction },
    })

    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockFunction).toHaveBeenCalled()
  })

  test('after the first click, if you dont receive another click within the 1500ms interval, you should render the initial label', async () => {
    const initialLabel = 'Do something'

    const wrapper = mount(ButtonConfirm, {
      propsData: { label: initialLabel, confirmAction: mockFunction },
    })

    jest.useFakeTimers()

    wrapper.find('button').trigger('click')
    jest.advanceTimersByTime(1600)
    await wrapper.vm.$nextTick()

    const message = wrapper.find('button').element.textContent.trim()

    expect(message).toBe(initialLabel)
  })
})
