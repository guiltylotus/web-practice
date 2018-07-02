var express = require('express');
var uuidv4 = require('uuid/v4');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID || 'AKIAJXEUDUD7OL2GJLQQ',
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY || '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',
  "region": process.env.AWS_REGION || 'us-east-2'
});

var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
var FoodModel = require('../models/foodmodel')
var TableName = 'FOOD_LIST'

// get all food in table which itemShow = true
router.get("/all", function (req, res) {
  getAllFood()
  .then(function(response) {
    res.status(200).json(response)
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
});

// add food to table
// body: obj food
router.post("/add", function(req, res) {
  addItemToFoodList(req.body)
  .then(function(response) {
    res.status(200).send({ message: 'Success' })
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
})

// update food information
// body: obj food
router.post("/update", function(req, res) {
  updateItemInFoodList(req.body)
  .then(function(response) {
    res.status(200).send({ message: 'Success' })
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
})

// remove food
// Option: itemShow = false (current) || delete Item from table (?)
router.post("/remove/:id", function(req, res) {
  removeItemById(req.params.id)
  .then(function(response) {
    res.status(200).send({ message: 'Success'})
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
})

module.exports = router;

var getAllFood = function() {
  var params = {
    ExpressionAttributeValues: {
      ":s": {
        BOOL: true
      }
    },
    FilterExpression: "itemShow = :s",
    TableName: TableName
   };
   
   return new Promise ((resolve, reject) => {
    ddb.scan(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(new FoodModel.FoodList(data.Items).items)
      }
    });
   })
}

var addItemToFoodList = function (item) {
  let params = {
    TableName: TableName,
    Item: {
      'id': uuidv4(),
      'shopName': item.shopName,
      'itemName': item.itemName,
      'price': item.price,
      'imageUrl': item.imageUrl,
      'description': item.description,
      'itemShow': true
    }
  }
  return new Promise (function(resolve, reject) {
    docClient.put(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

var updateItemInFoodList = function(item) {
  var params = {
    TableName: TableName,
    ExpressionAttributeValues: {
      ':s': item.shopName,
      ':i': item.itemName,
      ':p': item.price,
      ':img': item.imageUrl,
      ':d': item.description
    },
    Key: {
      'id': item.id
    },
    UpdateExpression: 'set shopName = :s, itemName = :i, price = :p, imageUrl = :img, description = :d'
  }
  return new Promise (function(resolve, reject) {
    docClient.update(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

var removeItemById = function(id) {
  var params = {
    TableName: TableName,
    ExpressionAttributeValues: {
      ':s': false
    },
    Key: {
      'id' : id
    },
    UpdateExpression: 'set itemShow = :s',
  };
  return new Promise (function(resolve, reject) {
    docClient.update(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}
