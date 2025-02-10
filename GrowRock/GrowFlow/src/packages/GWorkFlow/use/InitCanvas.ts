import type { Ref } from "vue";
import { Graph, Shape } from "@antv/x6";
import { ref } from "vue";
import { Transform } from "@antv/x6-plugin-transform";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import { Selection } from "@antv/x6-plugin-selection";
import { Export } from "@antv/x6-plugin-export";

export const initCanvas = () => {
  const graph: Ref<any> = ref(null);

  const initGraph = (container: HTMLDivElement) => {
    graph.value = new Graph({
      container,
      autoResize: true,
      grid: {
        visible: true,
        type: "dot",
        args: {
          color: "#a0a0a0",
          thickness: 1 // 网点大小
        }
      },
      panning: {
        enabled: true,
        modifiers: ["space"]
      },
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true
      },
      scaling: {
        min: 0.05,
        max: 12
      },
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: "rgba(223,234,255)"
            }
          }
        }
      },
      connecting: {
        snap: true,
        allowBlank() {
          return false;
        },
        allowLoop: false,
        allowEdge: false,
        createEdge() {
          return new Shape.Edge({
            router: { name: "manhattan" },
            attrs: {
              line: {
                stroke: "#1890ff",
                strokeDasharray: 5,
                targetMarker: "classic"
              }
            }
          });
        }
      }
    });
  };

  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };

  const initEvents = (container: HTMLDivElement) => {
    graph.value.on("node:mouseenter", ({ cell }) => {
      const ports = container.querySelectorAll(".x6-port-body") as NodeListOf<SVGElement>;
      showPorts(ports, true);
    });
    graph.value.on("node:mouseleave", () => {
      const ports = container.querySelectorAll(".x6-port-body") as NodeListOf<SVGElement>;
      showPorts(ports, false);
    });

    graph.value.on("edge:mouseenter", ({ cell }) => {
      cell.addTools([
        {
          name: "source-arrowhead",
          args: {
            "stroke-width": 0,
            attrs: {
              fill: "#1890ff",
              cursor: "move"
            }
          }
        },
        {
          name: "target-arrowhead",
          args: {
            "stroke-width": 0,
            attrs: {
              fill: "#1890ff",
              cursor: "move"
            }
          }
        },
        {
          name: "button-remove",
          args: {
            distance: -50
          }
        }
      ]);
    });

    graph.value.on("edge:mouseleave", ({ cell }) => {
      cell.removeTool("source-arrowhead");
      cell.removeTool("target-arrowhead");
    });

    graph.value.bindKey("backspace", () => {
      const cells = graph.value.getSelectedCells();
      if (cells.length) {
        graph.value.removeCells(cells);
      }
    });

    graph.value.on("node:mouseenter", ({ node }) => {
      const edges = graph.value.getOutgoingEdges(node);
      const allEdges = graph.value.getEdges();
      allEdges?.forEach((edge: any) => {
        edge.attr("line/strokeDasharray", "");
        edge.attr("line/style/animation", "");
      });
      edges?.forEach((edge: any) => {
        edge.attr("line/strokeDasharray", 5);
        edge.attr("line/style/animation", "running-line 30s infinite linear");
      });
    });

    graph.value.on("node:mouseleave", () => {
      const allEdges = graph.value.getEdges();
      allEdges?.forEach((edge: any) => {
        edge.attr("line/strokeDasharray", "");
        edge.attr("line/style/animation", "");
      });
    });

    graph.value.on("blank:click", () => {
      const allEdges = graph.value.getEdges();
      allEdges?.forEach((edge) => {
        edge.attr("line/strokeDasharray", "");
        edge.attr("line/style/animation", "");
      });
      const ports = container.querySelectorAll(".x6-port-body") as NodeListOf<SVGElement>;
      showPorts(ports, false);
    });

    graph.value.on("edge:mouseleave", ({ cell }) => {
      cell.removeTools();
    });
  };

  const initPlugins = () => {
    graph.value
      .use(
        new Transform({
          resizing: true,
          rotating: true
        })
      )
      .use(
        new Selection({
          rubberband: true,
          showNodeSelectionBox: true
        })
      )
      .use(new Export())
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History());
  };

  return {
    initGraph,
    graph,
    Graph,
    initEvents,
    initPlugins
  };
};
