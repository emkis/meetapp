import { mount, createLocalVue } from '@vue/test-utils'

import vClickOutside from 'v-click-outside'
import ContextMenuRoot from '@/components/ContextMenuRoot'

describe('ContextMenuRoot', () => {
  describe('Computed', () => {
    const localVue = createLocalVue()
    localVue.directive('click-outside', vClickOutside)

    it('contextMenu.isOpen | when is true should render child component with passed-in props', () => {
      const mockComputed = {
        isOpen: true,
        options: [
          { label: 'Option 1', action: () => {} },
          { label: 'Option 2', action: () => {} },
        ],
        position: { x: 130, y: 210 },
      }

      const wrapper = mount(ContextMenuRoot, {
        computed: { contextMenu: () => mockComputed },
        localVue,
      })

      const renderedOptions = wrapper
        .findAll('.context-menu__option')
        .wrappers.map((label) => label.text())

      expect(wrapper.classes()).toContain('context-menu')
      expect(wrapper.attributes('style')).toContain('top: 210px; left: 130px;')
      expect(renderedOptions).toHaveLength(2)
      expect(renderedOptions).toStrictEqual(['Option 1', 'Option 2'])
    })
  })

  describe('Methods', () => {
    test('handleClose | should dispatch action when @onClose event was emitted', () => {})

    test('handleClose | should dispatch action when v-click-outside directive is active', () => {})
  })
})
