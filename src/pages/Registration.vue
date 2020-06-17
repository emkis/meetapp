<template>
  <div id="registration">
    <Header>
      <template #title>Meet's registration</template>

      <Button @click="navigate">
        <IconOrganize size="18" color="#26265e" />
        Organize trails
      </Button>
    </Header>

    <Container>
      <main class="grid">
        <div class="grid-item">
          <h2 class="secondary-title">Create a meet</h2>
          <RegistrationForm />
        </div>
        <div class="grid-item">
          <h2 class="secondary-title">Created meets</h2>
          <RegistrationMeetList />
        </div>
      </main>
    </Container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Container from '@/components/Container'
import Button from '@/components/Button'
import RegistrationForm from '@/components/RegistrationForm'
import RegistrationMeetList from '@/components/RegistrationMeetList'
import { IconOrganize } from '@/components/icons'

export default {
  components: {
    Header,
    Button,
    IconOrganize,
    Container,
    RegistrationForm,
    RegistrationMeetList,
  },
  methods: {
    navigate() {
      this.$router.push({ name: 'Trails' })
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
