/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint3
; Author: Professor Krasso
; Date: May2, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App role.js file
; Model for the application's user roles
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("Role", roleSchema);
