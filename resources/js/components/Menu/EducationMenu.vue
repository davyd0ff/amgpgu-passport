<template>
  <li class="bold">
    <a
        v-on:click.prevent
        href="#"
        tabindex="0"
        class="collapsible-header waves-effect waves-teal"
    >
      {{ group }}
      <i class="material-icons chevron">chevron_left</i>
    </a>
    <div class="collapsible-body">
      <ul>
        <li>
          <router-link v-bind:to="`/student/academic-performance/${academicPlanCode}`"
                       class="waves-effect waves-teal">
            {{ 'MENU_ITEM_STUDENT_CURRENT_ACADEMIC_PERFORMANCE' | localize }}
          </router-link>
        </li>
        <li>
          <router-link v-bind:to="`/student/grades/${academicPlanCode}`"
                       class="waves-effect waves-teal">
            {{ 'MENU_ITEM_STUDENT_GRADES' | localize }}
          </router-link>
        </li>
        <li>
          <router-link v-bind:to="`/student/orders/${academicPlanCode}`"
                       class="waves-effect waves-teal">
            {{ 'MENU_ITEM_STUDENT_ORDERS' | localize }}
          </router-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "EducationMenu",
  props: {
    group: String,
    academicPlanCode: String,
  },


  mounted() {
  },
}
</script>

<style scoped>

</style>