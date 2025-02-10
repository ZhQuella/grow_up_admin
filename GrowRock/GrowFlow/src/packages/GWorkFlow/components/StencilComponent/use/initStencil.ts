import { ref } from "vue";
import { Stencil } from "@antv/x6-plugin-stencil";
import { baseCreateNodeData, approveCreateNodeData } from "./static";

const ports = {
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden"
          }
        }
      }
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden"
          }
        }
      }
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden"
          }
        }
      }
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden"
          }
        }
      }
    }
  },
  items: [
    {
      group: "top"
    },
    {
      group: "right"
    },
    {
      group: "bottom"
    },
    {
      group: "left"
    }
  ]
};

export const initStencil = ({ stencilRef }) => {
  const stencil = ref();

  const createStencil = (graph: any) => {
    stencil.value = new Stencil({
      title: "流程图",
      target: graph,
      stencilGraphWidth: "auto",
      stencilGraphHeight: "auto",
      collapsable: true,
      groups: [
        {
          title: "基础流程图",
          name: "base",
          graphHeight: Math.ceil(baseCreateNodeData.length / 2) * 60 + 10,
          layoutOptions: {
            rowHeight: 60
          }
        },
        {
          title: "审批流程",
          name: "approve",
          graphHeight: Math.ceil(approveCreateNodeData.length / 2) * 60 + 10,
          layoutOptions: {
            rowHeight: 60
          }
        }
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55
      }
    });
    stencilRef.value.appendChild(stencil.value.container);
  };

  const initNode = (Graph: any) => {
    Graph.registerNode(
      "custom-rect",
      {
        inherit: "rect",
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF"
          },
          text: {
            fontSize: 12,
            fill: "#262626"
          }
        },
        ports
      },
      true
    );
    Graph.registerNode(
      "custom-polygon",
      {
        inherit: "polygon",
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF"
          },
          text: {
            fontSize: 12,
            fill: "#262626"
          }
        },
        ports
      },
      true
    );
    Graph.registerNode(
      "custom-circle",
      {
        inherit: "circle",
        width: 45,
        height: 45,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF"
          },
          text: {
            fontSize: 12,
            fill: "#262626"
          }
        },
        ports
      },
      true
    );

    Graph.registerNode(
      "custom-ellipse",
      {
        inherit: "ellipse",
        width: 65,
        height: 45,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF"
          },
          text: {
            fontSize: 12,
            fill: "#262626"
          }
        },
        ports
      },
      true
    );

    Graph.registerNode(
      "custom-tick",
      {
        inherit: "path",
        width: 35,
        height: 30,
        path: "M387.072 611.328L236.6464 460.8 128 569.3952l259.072 259.1232 515.1232-515.072L793.6 204.8z",
        attrs: {
          body: {
            strokeWidth: 1
          },
          text: {
            fontSize: 12,
            fill: "#262626"
          }
        },
        ports
      },
      true
    );

    Graph.registerNode(
      "custom-wrong",
      {
        inherit: "path",
        width: 30,
        height: 30,
        path: "M617.92 516.096l272 272-101.824 101.824-272-272-272 272-101.856-101.824 272-272-275.008-275.04L241.056 139.2l275.04 275.04 275.04-275.04 101.824 101.824-275.04 275.04z",
        attrs: {
          body: {
            strokeWidth: 1
          },
          text: {
            fontSize: 12,
            fill: "#262626"
          }
        },
        ports
      },
      true
    );
  };

  const createNodes = (graph: any) => {
    const baseNodes = baseCreateNodeData.map((el) => {
      return graph.createNode(el);
    });
    const approveNodes = approveCreateNodeData.map((el) => {
      return graph.createNode(el);
    });
    stencil.value.load(baseNodes, "base");
    stencil.value.load(approveNodes, "approve");
  };

  return {
    createStencil,
    createNodes,
    initNode
  };
};
