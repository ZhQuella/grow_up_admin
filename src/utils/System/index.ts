import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
  RouteLocationNormalizedLoaded
} from "vue-router";
import { deepCopy } from "util/index";

export const getImageUrl = (name: string): string => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href;
};

export const lazyComponent = (file: string) => {
  const _modules = import.meta.glob("../../pages/**/*.vue");
  return _modules[file];
};

export const extendComponent = (file: string, options: any) => {
  return () =>
    lazyComponent(file)().then((res: any) => {
      return {
        ...res.default,
        ...options,
      };
    });
};

export const treeIterator = (
  backMenuList: any[] = [],
  frontMenuList: any[] = []
): any[] => {
  const arr: any[] = [];
  const tree = [...frontMenuList, ...backMenuList];
  if (!Array.isArray(tree) || !tree.length) return arr;
  tree.forEach((e) => {
    const index = arr.findIndex((i) => i.name == e.name);
    if (index > -1) {
      const currentChild = arr[index].children;
      const thes = [];
      currentChild && currentChild.length && thes.push(...arr[index].children);
      e.children && e.children.length && thes.push(...e.children);
      const children = treeIterator(thes);
      if (children.length) {
        arr[index].children = children;
      }
    } else {
      const the = { ...e };
      if (e.children && e.children.length) {
        the.children = treeIterator(e.children);
      }
      arr.push(the);
    }
  });
  return arr;
};

export const filterBinaryTree = (tree: any[]) => {
  const _tree = [...tree];
  for (let i = 0; i < _tree.length; i++) {
    _tree[i] = { ..._tree[i] };
    const the = _tree[i];
    const { children, hidden } = the;
    hidden && _tree.splice(i, 1);
    if (children) {
      _tree[i].children = filterBinaryTree(children);
    }
  }
  return _tree;
};

export const getRawRoute = (
  route: RouteLocationNormalized
): RouteLocationNormalized => {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
};

export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn);
  }
  let index = -1;
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item, i, ary);
    if (ret) {
      index = i;
      return ret;
    }
  });
  return index;
};

export function formatConversion(target: any) {
  const output = {};
  for (const quantityKey in target) {
    const keySplits = quantityKey.split(".");
    let current: any = output;
    let value = target[quantityKey];
    const lastKey = keySplits[keySplits.length - 1];
    const reg = /\[[a-zA-Z\d_]+\]/g;
    for (let j = 0; j < keySplits.length; j++) {
      const key = keySplits[j];
      const isArray = reg.test(key);
      if (!current[key]) {
        current[key] = {};
      }
      if (key === lastKey) {
        if (Array.isArray(value)) {
          const [item] = value;
          const itemType = getElType(item);
          if (["Array"].includes(itemType)) {
            value = value.map((el) => el[el.length - 1]);
          }
        }
        !isArray && (current[lastKey] = value);
      }
      current = current[key];
    }
  }
  return output;
}

export const getElType = (arg: any) => {
  return Object.prototype.toString.call(arg).slice(8, -1);
};

export const deleteMatched = (list: RouteLocationNormalizedLoaded[]) => { 
  return list.map(el => {
    const deepObj:any = { ...el, matched: [] };
    return deepCopy(deepObj);
  })
}