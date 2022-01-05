import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Grades from '@/pages/StudentPages/Grades.vue';
import getters from '@/store/student/getters';

import * as studentDataFixture from '@/__tests__/__fixtures__/studentData';

describe('Grades.vue', () => {
  const makeWrapper = (options = {}) => {
    const filter = (str) => str;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', filter);

    const store = new Vuex.Store({
      state: {
        educations:
          studentDataFixture.studentDataHasSeveralEducations.educations,
      },
      getters,
    });

    return mount(Grades, {
      localVue,
      store,
      ...options,
    });
  };

  it('computed properties are not empty', () => {
    const wrapper = makeWrapper({
      propsData: {
        academicPlanCode: '000000490',
      },
    });

    expect(wrapper.vm.education).toStrictEqual({
      academicPlanCode: '000000490',
      formOfEducation: expect.any(String),
      baseOfEducation: expect.any(String),
      faculty: expect.any(String),
      group: expect.any(String),
      course: expect.any(String),
      speciality: expect.any(Object),
      partOfGrades: expect.any(Array),
      partOfAcademicPerformance: expect.any(Array),
      partOfOrders: expect.any(Array),
    });
    expect(wrapper.vm.semesters).toStrictEqual([
      'Первый семестр',
      'Второй семестр',
      'Третий семестр',
      'Четвертый семестр',
      'Пятый семестр',
      'Шестой семестр',
      'Седьмой семестр',
      'Восьмой семестр',
    ]);
    expect(wrapper.vm.grades).toStrictEqual(expect.any(Array));
    expect(wrapper.vm.hasGrades).toBeTruthy();
  });

  it('render', () => {
    const wrapper = makeWrapper({
      propsData: {
        academicPlanCode: '000000490',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('smoke, when education has not been found', () => {
    it('computed properties are empty', () => {
      const wrapper = makeWrapper({
        propsData: {
          academicPlanCode: 'null',
        },
      });

      expect(wrapper.vm.education).toStrictEqual({});
      expect(wrapper.vm.semesters).toStrictEqual([]);
      expect(wrapper.vm.grades).toStrictEqual([]);
      expect(wrapper.vm.hasGrades).toBeFalsy();
    });

    it('render', () => {
      const wrapper = makeWrapper({
        propsData: {
          academicPlanCode: 'null',
        },
      });

      expect(wrapper).toMatchSnapshot();
    });
  });
});
