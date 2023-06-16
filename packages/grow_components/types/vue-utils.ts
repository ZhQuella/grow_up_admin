import type {
  Component,
  Slot,
  Slots,
  VNode,
  VNodeTypes,
  VNodeArrayChildren,
  ComponentPublicInstance,
  RenderFunction,
} from 'vue';
const opt = Object.prototype.toString;
export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]';
}
// Quoted from vue-next
// https://github.com/vuejs/vue-next/blob/master/packages/shared/src/shapeFlags.ts
export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
}
export const isElement = (vn: VNode) => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT);
};
export const isComponent = (
  vn: VNode,
  type?: VNodeTypes
): type is Component => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT);
};
export const isTextChildren = (
  child: VNode,
  children: VNode['children']
): children is string => {
  return Boolean(child && child.shapeFlag & 8);
};
export const isArrayChildren = (
  vn: VNode,
  children: VNode['children']
): children is VNode[] => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
};
export const isText = (
  vn: VNode,
  children: VNode['children']
): children is string => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.TEXT_CHILDREN);
};
export const isSlotsChildren = (
  vn: VNode,
  children: VNode['children']
): children is Slots => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.SLOTS_CHILDREN);
};
export const getAllElements = (
  children: VNode[] | undefined,
  includeText = false
) => {
  const results: VNode[] = [];
  for (const item of children ?? []) {
    if (
      isElement(item) ||
      isComponent(item) ||
      (includeText && isTextChildren(item, item.children))
    ) {
      results.push(item);
    } else if (isArrayChildren(item, item.children)) {
      results.push(...getAllElements(item.children, includeText));
    } else if (isSlotsChildren(item, item.children)) {
      results.push(...getAllElements(item.children.default?.(), includeText));
    } else if (isArray(item)) {
      results.push(...getAllElements(item, includeText));
    }
  }
  return results;
};