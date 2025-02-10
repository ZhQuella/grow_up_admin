export const getAllChilds = (arr: any[], isOnlyChild = false) => {
  let result: any[] = [];
  let stack = [...arr];
  while (stack.length > 0) {
    let node = stack.pop();
    if (!isOnlyChild) {
      result.push({
        uuid: node.uuid,
        children: node.children
      });
    }
    if (node.children && node.children.length > 0) {
      stack.push(...node.children);
    } else if (isOnlyChild) {
      result.push({
        uuid: node.uuid,
        children: node.children
      });
    }
  }
  return result;
};

export const deepClone = (obj: any) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  let stack: any[] = [];
  let result = Array.isArray(obj) ? [] : {};
  stack.push({ original: obj, copy: result });
  while (stack.length) {
    let { original, copy } = stack.pop();

    for (let key in original) {
      if (original.hasOwnProperty(key)) {
        let value = original[key];

        if (value !== null && typeof value === "object") {
          let newCopy = Array.isArray(value) ? [] : {};
          stack.push({ original: value, copy: newCopy });
          copy[key] = newCopy;
        } else {
          copy[key] = value;
        }
      }
    }
  }
  return result;
};

export const deepCopyArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  const result = [];
  const queue = [{ src: arr, target: result }];
  while (queue.length > 0) {
    const { src, target } = queue.shift() as any;
    for (let i = 0; i < src.length; i++) {
      if (Array.isArray(src[i])) {
        target[i] = [];
        queue.push({ src: src[i], target: target[i] });
      } else if (typeof src[i] === "object" && src[i] !== null) {
        target[i] = {};
        for (const key in src[i]) {
          if (src[i].hasOwnProperty(key)) {
            if (Array.isArray(src[i][key])) {
              target[i][key] = [];
              queue.push({ src: src[i][key], target: target[i][key] });
            } else if (typeof src[i][key] === "object" && src[i][key] !== null) {
              target[i][key] = {};
              queue.push({ src: src[i][key], target: target[i][key] });
            } else {
              target[i][key] = src[i][key];
            }
          }
        }
      } else {
        target[i] = src[i];
      }
    }
  }
  return result;
};

export const deleteByUUID = (data: any[], targetUUID: string) => {
  const newData = deepClone(data);
  const queue = newData.map((node) => ({ parent: null, node }));
  while (queue.length > 0) {
    const { parent, node } = queue.shift();
    if (node.uuid === targetUUID) {
      if (parent) {
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

export const findArrayByUUID = (data: any, targetUUID: string) => {
  const dataCopy = deepClone(data);
  let queue = [{ parent: null, children: dataCopy }];
  while (queue.length > 0) {
    const { parent, children } = queue.shift() as any;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.uuid === targetUUID) {
        return parent ? parent.children : dataCopy;
      }
      if (child.children) {
        queue.push({ parent: child, children: child.children });
      }
    }
  }
  return [];
};

export const findParentByUUID = (data: any[], targetUUID: string) => {
  let queue = [{ parent: null, node: data }];
  while (queue.length > 0) {
    const { parent, node } = queue.shift() as any;
    for (let i = 0; i < node.length; i++) {
      const child = node[i];
      if (child.uuid === targetUUID) {
        return parent;
      }
      if (child.children) {
        queue.push({ parent: child, node: child.children });
      }
    }
  }
  return null;
};

export const updateArrayUUIDs = (data: any[], callback) => {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array");
  }
  const dataCopy = deepCopyArray(data);
  const queue: any[] = [...dataCopy];
  while (queue.length > 0) {
    const node = queue.shift() as any;
    const oldUUID = node.uuid;
    node.uuid = callback(oldUUID);
    if (node.children && Array.isArray(node.children)) {
      queue.push(...node.children);
    }
  }
  return dataCopy;
};

export const updateUUIDs = (data, callback) => {
  let newData = deepClone(data);
  let stack = [newData];
  while (stack.length > 0) {
    let node = stack.pop();
    node.uuid = callback(node.uuid);
    if (node.children && node.children.length > 0) {
      stack.push(...node.children);
    }
  }
  return newData;
};

export const findByUUID = (data: any[], targetUUID: string) => {
  let stack = [...data];
  while (stack.length > 0) {
    let node = stack.pop();
    if (node.uuid === targetUUID) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      stack.push(...node.children);
    }
  }
  return null;
};
