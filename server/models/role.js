/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: May 3, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App service.js file
; Model for the role
;===========================================
*/

// Mongoose require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema(
  {
    name: { type: String },    
  },
  { collection: "roles" }
);

module.exports = mongoose.model("Roles", roleSchema);