/*
 * @Author: 事件总线
 * @Date: 2021-09-18 13:37:40
 * @LastEditTime: 2023-04-23 14:06:22
 * @LastEditors: Please set LastEditors
 * @Description: 用于事件监听
 * @FilePath: \nova_ui_mobile\src\utils\Event.ts
 */

import type { Fn } from "types/index";

/**
 * @description: 事件总线类
 * @param {void}
 * @return {void}
 */
export default class EventEmiter {
  private hashMap: any = {};

  static $instance: EventEmiter | null = null;
  /**
   * @description: 构造函数，处理单例
   * @param {void}
   * @return {EventEmiter}  返回实例
   */
  constructor() {
    if (!EventEmiter.$instance) {
      EventEmiter.$instance = this;
    }
    return EventEmiter.$instance;
  }

  /**
   * @description: 添加事件监听
   * @param {EventName} eventName 需要监听的事件
   * @param {Listener} listener 事件监听执行的函数
   * @return {EventEmiter}  返回实例
   */
  on(eventName: string, listener: Fn): EventEmiter {
    if (!this.hashMap[eventName]) {
      this.hashMap[eventName] = [];
    }
    this.hashMap[eventName].push(listener);
    return this;
  }

  /**
   * @description: 触发事件总线
   * @param {EventName} eventName 事件名称
   * @param {array} args  传递的参数
   * @return {EventEmiter}  返回实例
   */
  emit(eventName: string, ...args: any[]): EventEmiter {
    const listeners = this.hashMap[eventName] || [];
    //  ~ 持久事件总线
    listeners.forEach((listener: Fn) => {
      listener(...args);
    });
    return this;
  }

  /**
   * @description: 事件销毁
   * @param {EventName} eventName 事件名称
   * @param {Listener} listener 事件函数
   * @return {EventEmiter}  返回实例
   */
  off(eventName: string, listener: Fn): EventEmiter {
    const listeners = this.hashMap[eventName];
    if (listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    return this;
  }

  /**
   * @description: 添加只执行一次事件监听
   * @param {EventName} eventName 事件名称
   * @param {Listener} listener 事件函数
   * @return {EventEmiter}  返回实例
   */
  once(eventName: string, listener: Fn): EventEmiter {
    if (!this.hashMap[eventName]) {
      this.hashMap[eventName] = [];
    }
    const _once: Fn = (...args) => {
      listener(...args);
      this.off(eventName, _once);
    };
    this.hashMap[eventName].push(listener);
    return this;
  }
}
