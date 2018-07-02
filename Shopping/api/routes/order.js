var express = require('express');
var uuidv1 = require('uuid/v1');
var moment = require('moment');
var router = express.Router();

var AWS = require('aws-sdk');
AWS.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID || 'AKIAJXEUDUD7OL2GJLQQ',
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY || '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',
  "region": process.env.AWS_REGION || 'us-east-2'
});

var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
var OrderModel = require('../models/ordermodel')
var TableName = 'ORDER_LIST'

// req.body: obj order
// add order
router.post("/add", function (req, res) {
  addOrderToList(req.body)
  .then(function(response) {
    res.status(200).send({ message: 'Success' })
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
});

// req.params: account
// get order by account
router.get("/list/:account", function (req, res) {
  getOrderListByAccount(req.params.account)
  .then(function(response) {
    res.status(200).json(response)
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
});

// get all order
router.get("/all", function (req, res) {
  getAllOrder()
  .then(function(response) {
    res.status(200).json(response)
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
});

// get all order, filter by today (?)
router.get("/today", function (req, res) {
  getAllOrderToday()
  .then(function(response) {
    res.status(200).json(response)
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
});

// req.params: id, account
// update order as paid by id
router.post("/update", function (req, res) {
  markOrderAsPaid(req.body.account, req.body.id)
  .then(function(response) {
    res.status(200).send({ message: 'Success' })
  })
  .catch(function(error) {
    res.status(400).send({ message: 'Fail' })
  })
});

module.exports = router;

var addOrderToList = function (order) {
  let params = {
    TableName: TableName,
    Item: {
      'id': uuidv1(),
      'account': order.account,
      'time': order.time,
      'items': order.items,
      'paid': false
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

var getOrderListByAccount = function (account) {
  var params = {
    ExpressionAttributeValues: {
      ':a': account
     },
   KeyConditionExpression: 'account = :a',
   TableName: TableName
  };
  
  return new Promise (function(resolve, reject) {
    docClient.query(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    });
  })
}

var getAllOrder = function () {
  let params = {    
    TableName: TableName
  };
  return new Promise (function(resolve, reject) {
    ddb.scan(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(new OrderModel.OrderList(data.Items).items)
      }
    });
  })
}

var getAllOrderToday = function () {
  let params = {    
    TableName: TableName
  };
  return new Promise (function(resolve, reject) {
    ddb.scan(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(new OrderModel.OrderListToday(data.Items).items)
      }
    });
  })
}

var markOrderAsPaid = function (account, id) {
  var params = {
    TableName: TableName,
    ExpressionAttributeValues: {
      ':p': true
    },
    Key: {
      'account' : account,
      'id': id
    },
    UpdateExpression: 'set paid = :p',
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