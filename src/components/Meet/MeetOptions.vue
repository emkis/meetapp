<template>
  <ContextMenuClickableArea :options="options">
    <button type="button" class="options">
      <IconOptions size="35" color="#26265e" />
    </button>
  </ContextMenuClickableArea>
</template>

<script>
import { IconOptions } from '@/components/icons'
import ButtonConfirm from '@/components/ButtonConfirm'
import ContextMenuClickableArea from '@/components/ContextMenuClickableArea'

export default {
  name: 'MeetOptions',
  components: { IconOptions, ContextMenuClickableArea },
  props: { handlers: { type: Object, required: true } },
  computed: {
    options() {
      const { editHandler, deleteHandler } = this.handlers

      return [
        {
          label: 'Edit meet',
          action: editHandler,
        },
        {
          component: ButtonConfirm,
          props: {
            label: 'Remove meet',
            confirmAction: deleteHandler,
          },
        },
      ]
    },
  },
}
</script>
