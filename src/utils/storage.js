/**
 * storage 二次封装
 */

import config from '../config'

export default {
  // 设置storage
  setItem(key, val) {
    const storage = this.getStorage()
    storage[key] = val

    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  // 获取storage
  getItem(key) {
    return this.getStorage()[key]
  },
  // 清空storage
  clearItem(key) {
    const storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  // 清空所有item
  clearAll() {
    window.localStorage.clear()
  },

  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
}
