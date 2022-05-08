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

  // Find purchases by service API
  router.get("/purchases-graph", async (req, res) => {
    try {
      Invoice.aggregate(
        [{
            $unwind: "$lineItems",
          },
          {
            $group: { _id:
               {
                title: "$lineItems.title",
                price: "$lineItems.price",
              },
              count: { $sum: 1, },
            },
          },
          {
            $sort: { "_id.title": 1, },
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
            const findPurchasesByServiceGraphResponse = new BaseResponse(200,"Query successful", purchaseGraph);
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
});

module.exports = router;
