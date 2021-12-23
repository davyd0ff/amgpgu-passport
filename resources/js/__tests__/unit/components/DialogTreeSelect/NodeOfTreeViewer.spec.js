import { mount } from '@vue/test-utils';
import NodeOfTreeViewer from '@/components/DialogTreeSelect/NodeOfTreeViewer.vue';

describe('NodeOfTreeViewer.vue', () => {
  const node = {
    name: '1',
    nodes: [
      {
        name: '2-1',
        nodes: [{ name: '3-1' }],
      },
      { name: '2-2' },
    ],
  };

  it('render with depth equals 0', () => {
    const depthDisplayed = 0;
    const isDisplayed = true;

    const wrapper = mount(NodeOfTreeViewer, {
      propsData: {
        depthDisplayed,
        isDisplayed,
        node,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('render with depth equals 1', () => {
    const depthDisplayed = 1;
    const isDisplayed = true;

    const wrapper = mount(NodeOfTreeViewer, {
      propsData: {
        depthDisplayed,
        isDisplayed,
        node,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
