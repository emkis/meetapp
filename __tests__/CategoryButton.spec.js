import { mount } from '@vue/test-utils'
import CategoryButton from '@/components/CategoryButton'

describe('CategoryButton', () => {
  it('renders props.name inside component', () => {
    const name = 'Cool Category'
    const wrapper = mount(CategoryButton, {
      propsData: { name },
    })

    expect(wrapper.text()).toMatch(name)
  })

  test('if props.active is true, should have "active" class', () => {
    const name = 'Cool Category'
    const wrapper = mount(CategoryButton, {
      propsData: { name, active: true },
    })

    expect(wrapper.classes()).toContain('active')
  })
})
