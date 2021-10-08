const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/printers").get(function (req, res) {
  let db_connect = dbo.getDb("toner");
  db_connect
    .collection("printers")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect
//       .collection("records")
//       .findOne(myquery, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
// });

// This section will help you create a new record.
recordRoutes.route("/printers/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    printer_name: req.body.printer_name,
    toner_type: req.body.toner_type,
    toner_percent: req.body.toner_percent,
  };
  db_connect.collection("printers").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/printers/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { printer_name: req.params.id };
  let newvalues = {
    $set: {
        toner_percent: req.body.toner_percent,
    },
  };
  db_connect
    .collection("printers")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/printers/delete").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { };
  db_connect.collection("printers").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;