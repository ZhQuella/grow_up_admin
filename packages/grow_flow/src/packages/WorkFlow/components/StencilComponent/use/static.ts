
export const baseCreateNodeData = [
    {
        shape: 'custom-rect',
        label: '开始',
        attrs: {
            body: {
                rx: 20,
                ry: 26,
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
        }
    },
    {
        shape: 'custom-rect',
        attrs: {
            body: {
                rx: 6,
                ry: 6,
            },
        },
        label: '可选过程',
        data: {
            type: "process"
        }
    },
    {
        shape: 'custom-polygon',
        attrs: {
            body: {
                refPoints: '0,10 10,0 20,10 10,20',
            },
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
        data: {
            type: "approver"
        }
    },
    {
        shape: 'custom-rect',
        label: '抄送人',
        data: {
            type: "copy"
        }
    },
    {
        shape: 'custom-rect',
        label: '发起人',
        data: {
            type: "initiator"
        }
    }
]
