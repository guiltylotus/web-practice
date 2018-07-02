class Food {
  constructor(raw) {
    if (raw === null || raw === undefined) {
      raw = {}
    }
    for (let key in raw) {
      for (let miniKey in raw[key]) {
        this[key] = raw[key][miniKey] ? raw[key][miniKey] : null
      }
    }
  }
}

module.exports.Food = Food

class FoodList {
  constructor(raw) {
    if (raw === null || raw === undefined) {
      raw = []
    }
    var items = []
    for (let i = 0, l = raw.length; i < l; i++) {
      items.push(new Food(raw[i]))
    }
    this.items = items
  }
}

module.exports.FoodList = FoodList
