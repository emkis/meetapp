<template>
  <div id="registration">
    <Header>
      <template #title>Meet's registration</template>

      <BaseButton @click="navigate">
        <IconOrganize size="18" color="#26265e" />
        Organize trails
      </BaseButton>
    </Header>

    <BaseContainer>
      <main class="grid">
        <div class="grid-item">
          <h2 class="secondary-title">{{ currentLabel }}</h2>
          <RegistrationForm :isEditing="isEditing" />
        </div>
        <div class="grid-item">
          <h2 class="secondary-title">Created meets</h2>
          <RegistrationMeetList />
        </div>
      </main>
    </BaseContainer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import RegistrationForm from '@/components/RegistrationForm'
import RegistrationMeetList from '@/components/RegistrationMeetList'
import { IconOrganize } from '@/components/icons'

export default {
  name: 'Registration',
  components: {
    Header,
    IconOrganize,
    RegistrationForm,
    RegistrationMeetList,
  },
  data() {
    return {
      isEditing: false,
    }
  },
  methods: {
    navigate() {
      this.$router.push({ name: 'Trails' })
    },
  },
  computed: {
    currentLabel() {
      return this.isEditing ? 'Edit a meet' : 'Create a meet'
    },
  },
}
</script>

<style lang="scss" scoped>
#registration {
  padding-bottom: 80px;

  .secondary-title {
    width: 100%;
    margin-bottom: rem(30px);

    font-size: rem(24px);
    line-height: 1;
    color: var(--color-primary);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--grid-grap);
  }
}
</style>
