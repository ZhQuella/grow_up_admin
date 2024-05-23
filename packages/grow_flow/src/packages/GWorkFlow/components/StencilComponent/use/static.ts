
export const baseCreateNodeData = [
    {
        shape: 'custom-rect',
        label: '开始',
        attrs: {
            body: {
                rx: 20,
                ry: 26,
                stroke: '#67c23a',
                fill: '#e1f3d8'
            },
        },
        data: {
            type: "start"
        }
    },
    {
        shape: 'custom-rect',
        label: '流程',
        data: {
            type: "flow"
        },
        attrs: {
            body: {
                fill: '#efdbff',
                stroke: '#9254de',
            }
        }
    },
    {
        shape: 'custom-rect',
        attrs: {
            body: {
                rx: 6,
                ry: 6,
                fill: '#efdbff',
                stroke: '#9254de'
            },
        },
        label: '可选过程',
        data: {
            type: "process"
        }
    },
    {
        shape: 'custom-tick',
        attrs: {
            body: {
                rx: 6,
                ry: 6,
                stroke: '#73d13d',
                fill: '#73d13d'
            },
        },
        data: {
            type: "yes"
        }
    },
    {
        shape: 'custom-wrong',
        attrs: {
            body: {
                rx: 6,
                ry: 6,
                stroke: '#f56c6c',
                fill: '#f56c6c'
            },
        },
        data: {
            type: "no"
        }
    },
    {
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '0,10 10,0 20,10 10,20',
                stroke: '#ffa940',
                fill: '#ffd591'
            }
        },
        label: '判断',
        data: {
            type: "judge"
        }
    },
    {
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '10,0 40,0 30,20 0,20',
                stroke: '#437294',
                fill: '#e1e6e9'
            },
        },
        label: '数据',
        data: {
            type: "data"
        }
    },
    {
        shape: 'custom-circle',
        label: '连接',
        attrs: {
            body: {
                refPoints: '10,0 40,0 30,20 0,20',
                stroke: '#437294',
                fill: '#e1e6e9'
            },
        },
        data: {
            type: "start"
        }
    },
    {
        shape: 'custom-rect',
        label: '结束',
        attrs: {
            body: {
                rx: 20,
                ry: 26,
                stroke: '#f56c6c',
                fill: '#fef0f0'
            },
        },
        data: {
            type: "end"
        }
    }
];

export const approveCreateNodeData = [
    {
        shape: 'custom-rect',
        label: '审批人',
        attrs: {
            body: {
                stroke: '#409eff',
                fill: '#d9ecff'
            }
        },
        data: {
            type: "approver"
        }
    },
    {
        shape: 'custom-rect',
        label: '抄送人',
        attrs: {
            body: {
                stroke: '#409eff',
                fill: '#d9ecff'
            }
        },
        data: {
            type: "copy"
        }
    },
    {
        shape: 'custom-rect',
        label: '发起人',
        attrs: {
            body: {
                stroke: '#409eff',
                fill: '#d9ecff'
            }
        },
        data: {
            type: "initiator"
        }
    },
    {
        shape: 'custom-rect',
        label: '通知',
        attrs: {
            body: {
                stroke: '#409eff',
                fill: '#d9ecff'
            }
        },
        data: {
            type: "initiator"
        }
    }
]
