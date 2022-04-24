/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 20, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-questions.js file
; Model for the application's security questions
;===========================================
*/

// Mongoose require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let securityQuestionsSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "security-questions" }
);

module.exports = mongoose.model("SecurityQuestions", securityQuestionsSchema);
