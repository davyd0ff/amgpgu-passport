<template>
  <fragment>
    <menu-item v-for="item in menu" v-bind:key="item.title" v-bind:item="item">
      <education-menu
        v-for="education in educations"
        v-bind:key="education.group"
        v-bind:group="education.group"
        v-bind:academic-plan-code="education.academicPlanCode"
      />
    </menu-item>
  </fragment>
</template>

<script>
import MenuItem from './items/MenuItem';
import EducationMenu from './EducationMenu';

export default {
  name: 'StudentMenu',
  components: { EducationMenu, MenuItem },
  props: {
    menu: Array,
  },
  computed: {
    educations: function () {
      return this.$store.getters.educations;
    },
  },
  mounted() {
    console.log('StudentMenu: ', this.props);
  },
};
</script>

<style scoped></style>
