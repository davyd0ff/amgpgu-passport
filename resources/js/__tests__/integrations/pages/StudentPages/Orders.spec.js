import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Orders from '@/pages/StudentPages/Orders.vue';
import getters from '@/store/student/getters';

import * as studentData from '@/__tests__/__fixtures__/studentData';

describe('Orders.vue', () => {
  const makeWrapper = (options = {}) => {
    const localize = (str) => str;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', localize);

    const store = new Vuex.Store({
      state: {
        educations: studentData.studentDataHasSeveralEducations.educations,
      },
      getters,
    });

    return mount(Orders, {
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

    expect(wrapper.vm.orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          type: expect.any(String),
          studentRecordBook: expect.any(String),
          dateOfBegin: expect.any(String),
          formOfEducation: expect.any(String),
          faculty: expect.any(String),
          speciality: expect.any(Object),
          course: expect.any(String),
          group: expect.any(String),
          academicYear: expect.any(String),
        }),
      ])
    );
  });

  it('render', () => {
    const wrapper = makeWrapper({
      propsData: {
        academicPlanCode: '000000490',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('smoke tests', () => {
    it('when data is not exists for given academicPlanCode', () => {
      const wrapper = makeWrapper({
        propsData: {
          academicPlanCode: 'null',
        },
      });

      expect(wrapper.vm.orders).toStrictEqual([]);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
