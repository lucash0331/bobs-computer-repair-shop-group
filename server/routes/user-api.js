/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 21, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App user-api.js file
; APIs for the user APIs
;===========================================
*/

const express = require("express");
const BaseResponse = require("../models/base-response");
const router = express.router;
const User = require("../models/user");
