/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: House Gryffindor
; Date: April 20, 2022
; Description: User schema 
;===========================================
*/

// Mongoose statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// value types for security question 
const selectedSecurityQuestionsSchema = require("..schemas/selected-security-questions.js");
const userRoleSchema = require("../schemas/user-role.js");

// UserSchema for database collection
var userSchema = new Schema(
    {
      userName: { type: String, required: true, unique: true, dropDups: true },
      password: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
      address: { type: String },
      email: { type: String },
      isDisabled: { type: Boolean, default: false },
      role: userRoleSchema,
      securityQuestions: [selectedSecurityQuestionsSchema],
      date_created: { type: Date, default: new Date() },
      date_modified: { type: Date },
    },
    { collection: "users" }
  );
  
  module.exports = mongoose.model("User", userSchema);