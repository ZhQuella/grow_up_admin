/*
 * @Description: 元素更改
 * @Author: Aaron
 * @Date: 2022-01-06 22:35:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-23 14:31:14
 */

import ResizeObserver from "resize-observer-polyfill";
import { Fn } from "types/index";

const resizeHandler = function (entries: any) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: Fn) => {
        fn();
      });
    }
  }
};

export const addEventResize = (node: any, fun: Fn) => {
  if (!node.__resizeListeners__) {
    node.__resizeListeners__ = [];
  }
  node.__ro__ = new ResizeObserver(resizeHandler);
  node.__ro__.observe(node);
  node.__resizeListeners__.push(fun);
};

export const removeResizeListener = (node: any, fun: Fn) => {
  if (!node || !node.__resizeListeners__) return;
  node.__resizeListeners__.splice(node.__resizeListeners__.indexOf(fun), 1);
  if (!node.__resizeListeners__.length) {
    node.__ro__.disconnect();
  }
};
