import { mount, createLocalVue } from '@vue/test-utils'

import vClickOutside from 'v-click-outside'
import ContextMenuRoot from '@/components/ContextMenuRoot'

describe('ContextMenuRoot', () => {
  const localVue = createLocalVue()
  localVue.directive('click-outside', vClickOutside)

  it('should render child component when contextMenu.isOpen is true', () => {
    const mockComputed = {
      isOpen: true,
      options: [{ label: 'Option', action: () => {} }],
      position: { x: 100, y: 400 },
    }

    const wrapper = mount(ContextMenuRoot, {
      computed: { contextMenu: () => mockComputed },
      localVue,
    })

    expect(wrapper.html()).toContain('<div class="context-menu"')
  })
})
