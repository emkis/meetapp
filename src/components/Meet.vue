<template>
  <div class="meet">
    <button v-if="hasOptions" class="options" @click="toggleOptions">
      <IconOptions size="35" color="#26265e" />
    </button>

    <template v-if="optionsIsVisible">
      <div class="options-list">
        <button class="option-item">Edit meet</button>
        <button class="option-item">Remove meet</button>
        <button class="option-item" style="color: #fa5f1c;">
          <IconAttention color="#fa5f1c" style="margin: 0 2px -2px 0;" />
          Click to confirm
        </button>
      </div>
    </template>

    <h4 class="title">Ruby vs. Clojure para desenvolvimento de back-end</h4>
    <p class="category">Frontend</p>

    <strong class="time">
      <IconClock size="20" color="#26265e" />
      50min
    </strong>
  </div>
</template>

<script>
import { IconOptions, IconClock, IconAttention } from '@/components/icons'

export default {
  components: { IconOptions, IconClock, IconAttention },
  props: {
    id: {
      type: String,
    },
    hasOptions: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    duration: [Number, String],
  },
  data() {
    return {
      optionsIsVisible: false,
    }
  },
  methods: {
    toggleOptions() {
      this.optionsIsVisible = !this.optionsIsVisible
    },
    editMeet() {
      console.log('editing meet')
    },
    removeMeet() {
      console.log('removing meet')
    },
  },
}
</script>

<style lang="scss" scoped>
.meet {
  position: relative;
  padding: rem(25px 36px);

  background: #f6f4ff;
  border-radius: var(--border-radius);
  color: var(--color-primary);

  //sidebar
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 8px;
    height: 100%;
    background: #1a55af;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  & + & {
    margin-top: rem(20px);
  }

  .title {
    padding-right: rem(30px);
    font-size: rem(20px);
    font-family: $font-body;
    line-height: 1.3;
  }

  .category {
    margin: rem(6px 0 10px);
    font-size: rem(16px);
    line-height: 1.5;
  }

  .time {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: rem(16px);
    font-weight: 700;
    line-height: 1;

    > svg {
      margin-right: 6px;
    }
  }

  .options {
    all: unset;
    position: absolute;
    top: rem(20px);
    right: rem(20px);
    display: flex;
    align-items: center;
    justify-items: center;
    cursor: pointer;

    // circle
    &::before {
      position: absolute;
      content: '';
      width: 40px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 100ms ease;

      border-radius: 50%;
      background: var(--color-primary-faded);
      opacity: 0;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  .options-list {
    position: absolute;
    top: rem(60px);
    right: rem(20px);
    padding: rem(6px 0);
    min-width: rem(160px);
    max-width: rem(250px);
    overflow: hidden;
    user-select: none;
    z-index: $layer-popover;

    background: white;
    border-radius: var(--border-radius);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);

    .option-item {
      all: unset;
      display: block;
      max-width: 100%;
      width: 100%;
      padding: rem(15px);
      cursor: pointer;

      text-align: left;
      color: var(--color-primary);
      transition: background 100ms ease;

      &:hover {
        background: var(--color-gray-primary);
      }
    }
  }
}
</style>
