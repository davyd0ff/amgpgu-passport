<template>
  <header>
    <div class="navbar-fixed">
      <nav class="navbar teal">
        <div class="nav-wrapper">
          <a class="white-text" href="#">{{ title | localize }}</a>
          <a class="sidenav-trigger" href="#" data-target="sidenav-left">
            <i class="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" class="right">
            <notifications-drop-down />
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import NotificationsDropDown from "@/components/NotificationsDropDown";

export default {
  name: "Navbar",
  components: { NotificationsDropDown },
  computed: {
    title: function () {
      if (typeof this.$route.meta.title === "function") {
        return this.$route.meta.title(this.$route);
      }
      return this.$route.meta?.title || "";
    },
  },
};
</script>

<style scoped></style>
