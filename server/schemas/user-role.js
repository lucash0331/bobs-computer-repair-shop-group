/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 21, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App user-role.js file
; Schema for user roles
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  role: { type: String, default: 'standard' }
})

module.exports = userRoleSchema