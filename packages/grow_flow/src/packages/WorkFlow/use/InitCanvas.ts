import type { Ref } from "vue";
import { Graph, Shape } from '@antv/x6';
import { ref } from "vue";

export default Graph;

export const initCanvas = ({

}) => {

    const graph: Ref<any> = ref(null);

    const initGraph = (container: HTMLDivElement) => {
        graph.value = new Graph({
            container,
            autoResize: true,
            grid: {
                visible: true,
                type: 'dot',
                args: {
                    color: '#a0a0a0',
                    thickness: 1, // 网点大小
                },
            },
            panning: {
                enabled: true,
            },
            mousewheel: {
                enabled: true,
                zoomAtMousePosition: true
            },
            scaling: {
                min: 0.05,
                max: 12,
            },
            connecting: {
                snap: true,
                allowBlank() {
                    return false
                },
                allowLoop: false,
                allowEdge: false,
                createEdge(){
                    return new Shape.Edge({
                        attrs: {
                            line: {
                                stroke: '#A2B1C3',
                                strokeWidth: 2,
                                targetMarker: {
                                    name: 'block',
                                    width: 12,
                                    height: 8,
                                },
                            },
                        },
                        zIndex: 0,
                    })
                }
            }
        })
    }

    return {
        initGraph,
        graph,
        Graph
    }
}
