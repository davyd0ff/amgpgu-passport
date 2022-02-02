<template>
  <li>
    <notifications-drop-down-button v-bind:active="isActive" ref="dropdown" />
    <notifications-drop-down-content v-on:clear="onClearNotifications">
      <notifications-drop-down-card
        v-for="notification in notifications"
        v-bind:key="notification.id"
        v-bind:notification="notification"
        v-on:open="onOpenNotification"
        v-on:read="onReadNotification"
      />
    </notifications-drop-down-content>
  </li>
</template>

<script>
import M from 'materialize-css';
import NotificationsDropDownButton from './NotificationsDropDownButton';
import NotificationsDropDownContent from './NotificationsDropDownContent';
import NotificationsDropDownCard from './NotificationsDropDownCard.vue';

export default {
  name: 'NotificationsDropDown',
  components: {
    NotificationsDropDownContent,
    NotificationsDropDownButton,
    NotificationsDropDownCard,
  },
  computed: {
    isActive() {
      return this.$store.getters.hasNotReadedNotifications;
    },
    notifications() {
      const notifications = this.$store.getters.getNotReadedNotifications(3);
      return notifications;
    },
  },
  methods: {
    onReadNotification(id) {
      this.$store.dispatch('readNotification', { id });
    },
    onOpenNotification(id) {
      this.$router.push(`/notification/${id}`, () =>
        this.onReadNotification(id)
      );
    },
    onClearNotifications() {
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
