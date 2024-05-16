import { ref } from "vue";
import { Stencil } from '@antv/x6-plugin-stencil';
import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';

const ports = {
    groups: {
        top: {
            position: 'top',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
    },
    items: [
        {
            group: 'top',
        },
        {
            group: 'right',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
    ],
};

export const initStencil = ({
    stencilRef
}) => {

    const stencil = ref();

    const createStencil = (graph: any) => {
        stencil.value = new Stencil({
            title: '流程图',
            target: graph,
            stencilGraphWidth: 'auto',
            stencilGraphHeight: 'auto',
            collapsable: true,
            groups: [
                {
                    title: '基础流程图',
                    name: 'group1',
                    graphHeight: 250,
                    layoutOptions: {
                        rowHeight: 70,
                    },
                },
                {
                    title: '系统设计图',
                    name: 'group2'
                },
            ],
            layoutOptions: {
                columns: 2,
                columnWidth: 80,
                rowHeight: 55,
            },
        });
        stencilRef.value.appendChild(stencil.value.container);
    }

    const initNode = (Graph: any) => {
        Graph.registerNode(
            'custom-rect',
            {
                inherit: 'rect',
                width: 66,
                height: 36,
                attrs: {
                    body: {
                        strokeWidth: 1,
                        stroke: '#5F95FF',
                        fill: '#EFF4FF',
                    },
                    text: {
                        fontSize: 12,
                        fill: '#262626',
                    },
                },
                ports
            },
            true,
        )
        Graph.registerNode(
            'custom-polygon',
            {
                inherit: 'polygon',
                width: 66,
                height: 36,
                attrs: {
                    body: {
                        strokeWidth: 1,
                        stroke: '#5F95FF',
                        fill: '#EFF4FF',
                    },
                    text: {
                        fontSize: 12,
                        fill: '#262626',
                    },
                },
                ports
            },
            true,
        )
        Graph.registerNode(
            'custom-circle',
            {
                inherit: 'circle',
                width: 45,
                height: 45,
                attrs: {
                    body: {
                        strokeWidth: 1,
                        stroke: '#5F95FF',
                        fill: '#EFF4FF',
                    },
                    text: {
                        fontSize: 12,
                        fill: '#262626',
                    },
                },
                ports
            },
            true,
        )
    };

    const createNodes = (graph: any) => {
        const r1 = graph.createNode({
            shape: 'custom-rect',
            label: '开始',
            attrs: {
                body: {
                    rx: 20,
                    ry: 26,
                },
            },
        });
        const r2 = graph.createNode({
            shape: 'custom-rect',
            label: '过程',
        });
        const r3 = graph.createNode({
            shape: 'custom-rect',
            attrs: {
                body: {
                    rx: 6,
                    ry: 6,
                },
            },
            label: '可选过程',
        });
        const r4 = graph.createNode({
            shape: 'custom-polygon',
            attrs: {
                body: {
                    refPoints: '0,10 10,0 20,10 10,20',
                },
            },
            label: '决策',
        });
        const r5 = graph.createNode({
            shape: 'custom-polygon',
            attrs: {
                body: {
                    refPoints: '10,0 40,0 30,20 0,20',
                },
            },
            label: '数据',
        });
        const r6 = graph.createNode({
            shape: 'custom-circle',
            label: '连接',
        });
        stencil.value.load([r1, r2, r3, r4, r5, r6], 'group1');
    }

    const initPlugins = (graph) => {
        graph
            .use(
                new Transform({
                    resizing: true,
                    rotating: true,
                }),
            )
            .use(
                new Selection({
                    rubberband: true,
                    showNodeSelectionBox: true,
                }),
            )
            .use(new Snapline())
            .use(new Keyboard())
            .use(new Clipboard())
            .use(new History())
    }

    return {
        createStencil,
        createNodes,
        initNode,
        initPlugins
    }
}
