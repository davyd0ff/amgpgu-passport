import DialogTreeSelect from '@/components/DialogTreeSelect/DialogTreeSelect.vue';
import { shallowMount } from '@vue/test-utils';
import { tree, filteredTree } from './__fixtures__/tree';

describe('component: DialogTreeSelect.vue', () => {
  const createWrapper = (options) =>
    shallowMount(DialogTreeSelect, { ...options });

  it('call loadTree() props when mounted', () => {
    const loadTree = jest.fn(() => Promise.resolve({}));

    const wrapper = createWrapper({ propsData: { loadTree } });

    expect(loadTree).toHaveBeenCalled();
  });

  it('filtered tree', async () => {
    const wrapper = createWrapper({
      propsData: {
        tree,
      },
    });

    await wrapper.setData({ filter: 'мн' });

    expect(wrapper.vm.filteredTree).toStrictEqual(filteredTree);
  });

  // it('toggle method', () => {

  // });
});
// // describe("component: DialogTreeSelect", () => {
// //     const createWrapper = (propsData) => shallowMount(DialogTreeSelect, {propsData});

// //     it("dialog opened if prop isOpened is true", () => {
// //         const wrapper = createWrapper({isOpened : true});

// //         wrapper.find()
// //     });
// // });
