<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>
                  {{ 'ORDER_TABLE_COLUMN_STUDENT_RECORD_BOOK' | localize }}
                </th>
                <th>{{ 'ORDER_TABLE_COLUMN_ORDER_TITLE' | localize }}</th>
                <th>{{ 'ORDER_TABLE_COLUMN_ORDER_TYPE' | localize }}</th>
                <th>{{ 'ORDER_TABLE_COLUMN_COURSE' | localize }}</th>
                <th>{{ 'ORDER_TABLE_COLUMN_GROUP' | localize }}</th>
                <th>{{ 'ORDER_TABLE_COLUMN_ACADEMIC_YEAR' | localize }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" v-bind:key="order.title">
                <td>{{ order.studentRecordBook }}</td>
                <td>{{ order.title }}</td>
                <td>{{ order.type }}</td>
                <td>{{ order.course }}</td>
                <td>{{ order.group }}</td>
                <td>{{ order.academicYear }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  props: {
    academicPlanCode: String,
  },
  computed: {
    orders() {
      return this.$store.getters.educations.find(
        (education) => education.academicPlanCode === this.academicPlanCode
      ).partOfOrders;
    },
  },

  mounted() {
    // console.log(this.$store.getters.educations);
  },
};
</script>

<style scoped></style>
