<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <div class="card-tabs">
            <ul class="tabs tabs-fixed-width">
              <li class="tab col s6">
                <a
                  v-bind:class="{ active: showForMe }"
                  v-on:click.prevent="onClickForMe"
                  href="#"
                >
                  {{ 'NOTIFICATIONS_TABS_FOR_ME' | localize }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <table class="highlight">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ 'NOTIFICATIONS_TABLE_COLUMN_TITLE' | localize }}</th>
                  <th>{{ 'NOTIFICATIONS_TABLE_COLUMN_DATE' | localize }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(notification, index) in notifications"
                  v-bind:key="notification.id"
                  v-on:click="onRowClick(notification)"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ notification.title }}</td>
                  <td>{{ notification.created }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuicklyViewNotification',
  data() {
    return {
      showForMe: true,
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.getAllNotifications.filter(
        (notification) =>
          notification.isMeantToMe === this.showForMe ||
          notification.isCreatedByMe === !this.showForMe
      );
    },
  },
  methods: {
    onRowClick(notification) {
      // console.log(notification);
      this.$router.push(`/notifications/${notification.id}`);
    },
    onClickForMe() {
      this.showForMe = true;
    },
    onClickCreatedByMe() {
      this.showForMe = false;
    },
  },
};
</script>

<style scoped></style>
