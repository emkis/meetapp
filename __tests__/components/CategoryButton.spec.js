import { mount } from '@vue/test-utils'
import CategoryButton from '@/components/CategoryButton'

describe('CategoryButton', () => {
  describe('Props', () => {
    test('label | should render component with the passed-in text', () => {
      const name = 'Cool Category'

      const wrapper = mount(CategoryButton, { propsData: { name } })

      expect(wrapper.text()).toMatch(name)
    })

    test('active | if is true, the component should have "active" class', () => {
      const name = 'Cool Category'

      const wrapper = mount(CategoryButton, {
        propsData: {
          name,
          active: true,
        },
      })

      expect(wrapper.classes()).toContain('active')
    })
  })
})
