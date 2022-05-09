/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: May 4, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App invoices-api.js file
; APIs for the invoices
;===========================================
*/

const express = require("express");
const BaseResponse = require("../models/base-response");
const router = express.Router();
const Invoice = require("../models/invoice");

// Create invoice
router.post("/:userName", async (req, res) => {
  try {
    const newInvoice = {
      userName: req.params.userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };
    Invoice.create(newInvoice, function (err, invoice) {
      // If statement for an error with Mongo
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        return res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      }

      //  new invoice
      console.log(invoice);
      const createInvoiceResponse = new BaseResponse(200, "Query Successful", invoice);
      return res.status(200).send(createInvoiceResponse.toObject());
    });
  } catch (error) {
    // Server error goes here
    console.log(error);
    const createInvoiceCatchErrorResponse = new BaseResponse(500, "Internal server error", error.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

// Find purchases by service API
router.get("/purchases-graph", async (req, res) => {
  try {
    Invoice.aggregate(
      [
        {
          $unwind: "$lineItems",
        },
        {
          $group: {
            _id: {
              title: "$lineItems.name",
              price: "$lineItems.price",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.title": 1 },
        },
      ],

      // IF/ELSE statement
      function (err, purchaseGraph) {
        if (err) {
          console.log(err);
          const findPurchasesByServiceGraphMongodbErrorResponse = new BaseResponse(500, "Internal Server error", err);
          res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
        } else {
          console.log(purchaseGraph);
          const findPurchasesByServiceGraphResponse = new BaseResponse(200, "Query successful", purchaseGraph);
          res.json(findPurchasesByServiceGraphResponse.toObject());
        }
      }
    );

    // Catch exception with server error
  } catch (e) {
    console.log(e);
    const findPurchaseByServiceCatchErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    res.status(500).send(findPurchaseByServiceCatchErrorResponse.toObject());
  }
});

/**
 * API to find invoice (OK)
 */

router.get("/", async (req, res) => {
  try {
    Invoice.find({}, function (err, invoices) {
      if (err) {
        console.log(err);
        const readInvoicesMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        res.status(500).send(readInvoicesMongodbErrorResponse.toObject());
      } else {
        console.log(invoices);
        const readInvoicesResponse = new BaseResponse(200, "Query successful", invoices);
        res.json(readInvoicesResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const readInvoicesCatchErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    res.status(500).send(readInvoicesCatchErrorResponse.toObject());
  }
});

//API to delete invoice from DB  (OK)

router.delete("/:id", async (req, res) => {
  try {
    Invoice.findByIdAndDelete(
      { _id: req.params.id },
      function (err, invoice) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(invoice);
          res.json(invoice);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});


module.exports = router;