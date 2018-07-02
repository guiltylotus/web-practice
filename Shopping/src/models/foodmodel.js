class Food {
  constructor (raw) {
    if (raw === null || raw === undefined) {
      raw = {}
    }
    this.id = raw.id ? raw.id : null
    this.shopName = raw.shopName ? raw.shopName : null
    this.itemName = raw.itemName ? raw.itemName : null
    this.price = raw.price ? raw.price : null
    this.imageUrl = raw.imageUrl ? raw.imageUrl : null
    this.description = raw.description ? raw.description : null
    this.itemShow = raw.itemShow
    this.quantity = 0
  }
}

class FoodList {
  constructor (raw) {
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

export const _FoodList = FoodList
