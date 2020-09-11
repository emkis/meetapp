<template>
  <div class="trail-column">
    <p class="title">Trail one</p>

    <div class="scrollable">
      <Meet
        :key="index"
        v-for="(meet, index) in meetsNumber"
        :id="index"
        title="Typescript Tips & Tricks"
        category="Advanced Topics"
        :schedule="{ startTime: '15:00', endTime: '15:30' }"
        :hasOptions="false"
      />
    </div>
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
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;

  .title {
    margin-bottom: rem(10px);

    font-size: rem(20px);
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-gray-dark);
  }

  .scrollable {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 100%;

    overflow-y: auto;

    .meet {
      margin-right: 5px;
    }
  }
}
</style>
