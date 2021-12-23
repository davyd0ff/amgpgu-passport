<template>
  <fragment>
    <a
        href="#"
        tabindex="0"
        class="collapsible-header waves-effect waves-teal"
    >
      Уведомления
      <i class="material-icons chevron">chevron_left</i>
    </a>
    <div class="collapsible-body">
      <ul>
        <li>
          <router-link to="/notifications/add-for-students"
                       class="waves-effect waves-teal">
            Уведомление для студентов
          </router-link>
        </li>


      </ul>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "NotificationMenu"
}
</script>

<style scoped>

</style>