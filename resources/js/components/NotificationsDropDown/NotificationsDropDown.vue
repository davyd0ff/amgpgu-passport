<template>
  <li>
    <notifications-drop-down-button v-bind:active="isActive" ref="dropdown" />
    <notifications-drop-down-content
      v-bind:notifications="notifications"
      v-on:notification-click="onNotificationClick"
      v-on:clear="onClearNotifications"
    />
  </li>
</template>

<script>
import M from 'materialize-css';
import NotificationsDropDownButton from './NotificationsDropDownButton';
import NotificationsDropDownContent from './NotificationsDropDownContent';

export default {
  name: 'NotificationsDropDown',
  components: { NotificationsDropDownContent, NotificationsDropDownButton },
  computed: {
    isActive: function () {
      return this.$store.getters.hasNotReadedNotifications;
    },
    notifications: function () {
      return this.$store.getters.getNotReadedNotifications(3);
    },
  },
  methods: {
    onNotificationClick: function (id) {
      this.$store.dispatch('readNotification', id);
    },
    onClearNotifications: function () {
      this.$store.dispatch('readNotifications');
    },
  },

  mounted() {
    this.$dropdown = M.Dropdown.init(this.$refs.dropdown.$el, {
      constrainWidth: false,
      closeOnClick: false,
      alignment: 'left',
    });
  },
  beforeDestroy() {
    if (this.$dropdown && this.$dropdown.hasOwnProperty('destroy')) {
      this.$dropdown.destroy();
    }
  },
};
</script>
