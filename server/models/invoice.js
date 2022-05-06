/*
============================================
; Title: WEB450 Bob's Computer Repair Shop SPrint3
; Author: Professor Krasso
; Date: May 2, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App invoice.js file
; Model for services for purchase
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lineItemDocument = require("../schemas/line-item");

const invoiceSchema = new Schema(
  {
    userName: { type: String },
    lineItems: [lineItemDocument],
    partsAmount: { type: Number },
    laborAmount: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    userName: { type: String },
    orderDate: { type: Date, default: new Date() },
  },
  { collection: "invoices" }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
