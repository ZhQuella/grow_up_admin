

export const getAllChilds = (arr: any[], isOnlyChild = false) => {
    let result:any[] = [];
    let temporary = [...arr];
    if(!isOnlyChild) {
        result.push(...arr);
    }
    while (temporary.length) {
      let item: any = temporary.shift();
      if(isOnlyChild && (item.children && item.children.length)) {
        result.push(...item.children)
      }
      else{
        result.push(...item.children)
      }
     item.children && temporary.unshift(...item.children);
    };
    return result;
};


export const deepClone = (obj: any) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let stack:any[] = [];
    let result = Array.isArray(obj) ? [] : {};
    stack.push({original: obj, copy: result});
    while (stack.length) {
        let {original, copy} = stack.pop();

        for (let key in original) {
            if (original.hasOwnProperty(key)) {
                let value = original[key];

                if (value !== null && typeof value === 'object') {
                    let newCopy = Array.isArray(value) ? [] : {};
                    stack.push({original: value, copy: newCopy});
                    copy[key] = newCopy;
                } else {
                    copy[key] = value;
                }
            }
        }
    }
    return result;
}

export const deleteByUUID = (data: any[], targetUUID:string) => {
    const newData = deepClone(data);
    const queue = newData.map(node => ({ parent: null, node }));
    while (queue.length > 0) {
        const { parent, node } = queue.shift();
        if (node.uuid === targetUUID) {
            if (parent) {
                // 从父节点的 children 中删除
                const index = parent.children.indexOf(node);
                if (index > -1) {
                    parent.children.splice(index, 1);
                }
            } else {
                const index = newData.indexOf(node);
                if (index > -1) {
                    newData.splice(index, 1);
                }
            }
            break;
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach((child) => queue.push({ parent: node, node: child }));
        }
    }
    return newData;
};
