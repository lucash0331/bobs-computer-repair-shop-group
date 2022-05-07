/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App service.js file
; Model for the application's services
;===========================================
*/

// Mongoose require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let serviceSchema = new Schema(
  {
    name: { type: String },
    price: { type: String },
    icon: { type: String },
    description: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "services" }
);

module.exports = mongoose.model("Services", serviceSchema);
