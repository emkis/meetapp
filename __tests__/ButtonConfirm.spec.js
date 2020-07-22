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

  // quando clicado uma vez e esperado mais de 1500ms deve voltar a a label original
})
