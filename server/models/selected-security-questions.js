/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: March 2, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-questions.js file
; Schema for the user selected security questions 
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

let selectedSecurityQuestionsSchema = new Schema ({
    question: { type: String },
    answer: { type: String }
});

module.export = selectedSecurityQuestionsSchema;