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
router.post("/", async (req, res) => {
  let status = 200;
  try {
    const newInvoice = {
      text: req.body.text,
    };
    Invoice.create(newInvoice, function (err, invoice) {
      // If statement for an error with Mongo
      if (err) {
        console.log(err);
        status = 500;
        const createInvoiceMongodbErrorResponse = new BaseResponse(status, "Internal server error", err);
        return res.status(status).send(createInvoiceMongodbErrorResponse.toObject());
      }

      //  new invoice
      console.log(invoice);
      const createInvoiceResponse = new BaseResponse(status, "Query Successful", invoice);
      return res.status(status).send(createInvoiceResponse.toObject());
    });
  } catch (error) {
    // Server error goes here
    console.log(error);
    status = 500;
    const createInvoiceCatchErrorResponse = new BaseResponse(status, "Internal server error", error.message);
    res.status(status).send(createInvoiceCatchErrorResponse.toObject());
  }
});

module.exports = router;
