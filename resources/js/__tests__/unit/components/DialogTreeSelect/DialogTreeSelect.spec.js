import { shallowMount } from '@vue/test-utils';
import DialogTreeSelect from '@/components/DialogTreeSelect/DialogTreeSelect.vue';
import { tree, filteredTree } from '@/__tests__/__fixtures__/studentTree';

describe('component: DialogTreeSelect.vue', () => {
  const createWrapper = (options) =>
    shallowMount(DialogTreeSelect, { ...options });

  it('call loadTree() props when mounted', () => {
    const loadTree = jest.fn(() => Promise.resolve({}));

    const wrapper = createWrapper({ propsData: { loadTree } });

    expect(loadTree).toHaveBeenCalled();
  });

  it('computed props', () => {
    const wrapper = createWrapper({ propsData: { tree } });

    expect(wrapper.vm.cssColumnsCount).toBe(2);
    expect(wrapper.vm.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nodes: expect.any(Array),
          name: expect.any(String),
        }),
      ])
    );
  });

  it('render', () => {
    const wrapper = createWrapper({ propsData: { tree, isOpened: true } });

    expect(wrapper).toMatchSnapshot();
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
