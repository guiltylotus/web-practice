export default {
  isObject: function (value) {
    return value !== null && typeof value === 'object'
  },

  isString: function (value) {
    return typeof value === 'string'
  },

  isNumber: function (value) {
    return typeof value === 'number'
  },

  isInt: function (value) {
    return Number(value) === value && value % 1 === 0
  },

  isFloat: function (value) {
    return value === Number(value) && !Number.isNaN(value)
  },

  isFunction: function (value) {
    return typeof value === 'function'
  },

  isDate: function (value) {
    return toString.call(value) === '[object Date]'
  },

  isNullOrUndefined: function (value) {
    return value === null || value === undefined
  },

  isEmpty: function (value) {
    return value === null || value === undefined || value === ''
  }
}
