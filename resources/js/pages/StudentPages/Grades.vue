<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <div class="card-tabs" v-if="hasGrades">
            <ul ref="tabs" class="tabs tabs-fixed-width">
              <li
                v-for="(semester, index) in semesters"
                v-bind:key="`tab${semester.replace(' ', '')}`"
                class="tab col s3"
              >
                <a
                  v-bind:class="index === 0 ? 'active' : ''"
                  v-bind:href="`#semester${index + 1}`"
                  >{{ semester }}</a
                >
              </li>
            </ul>
          </div>
          <div
            v-for="(semester, index) in semesters"
            v-bind:key="`grades${semester.replace(' ', '')}`"
            v-bind:id="`semester${index + 1}`"
          >
            <grade-table v-bind:grades="grades | group(semester)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';

import GradeTable from '@/components/GradeTable';

export default {
  name: 'Grades',
  components: { GradeTable },
  props: {
    academicPlanCode: String,
  },
  computed: {
    education() {
      return this.$store.getters.planEducation(this.academicPlanCode);
    },
    grades() {
      return this.education?.partOfGrades || [];
    },
    semesters() {
      return this.grades.reduce((total, current) => {
        return total.some((semester) => semester === current.semester)
          ? total
          : [...total, current.semester];
      }, []);
    },
    hasGrades() {
      return this.grades.length > 0;
    },
  },
  filters: {
    group(grades, semester) {
      return grades.filter((row) => row.semester === semester);
    },
  },

  mounted() {
    if (this.hasGrades) {
      this.$instance = M.Tabs.init(this.$refs.tabs);
    }
  },
  updated() {
    if (this.hasGrades) {
      this.$instance.destroy();
      this.$instance = M.Tabs.init(this.$refs.tabs);
    }
  },
  destroyed() {
    if (this.hasGrades) {
      this.$instance.destroy();
    }
  },
};
</script>

<style scoped></style>
