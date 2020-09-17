<template>
  <div class="trail-column">
    <section class="inner">
      <p class="title">Trail one</p>

      <div class="scrollable">
        <Meet
          :key="index"
          v-for="(meet, index) in meetsNumber"
          :id="index"
          title="Typescript Tips & Tricks"
          category="Advanced Topics"
          :schedule="{ start_time: '15:00', end_time: '15:30' }"
          :hasOptions="false"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Meet from '@/components/Meet'

export default {
  name: 'TrailColumn',
  components: { Meet },
  data() {
    return {
      meetsNumber: 6,
    }
  },
}
</script>

<style lang="scss" scoped>
.trail-column {
  .inner {
    display: flex;
    flex-direction: column;
    max-height: 100%;
  }

  .title {
    margin-bottom: rem(10px);

    font-size: rem(20px);
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-gray-dark);
  }

  .scrollable {
    overflow-y: auto;

    .meet {
      margin-right: 5px;
    }
  }
}
</style>
