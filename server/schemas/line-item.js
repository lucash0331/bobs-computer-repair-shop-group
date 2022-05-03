/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint3
; Author: Professor Krasso
; Date: May 2, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App line-item.js file
; Schema line-items on an invoice
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

module.exports = lineItemSchema;
