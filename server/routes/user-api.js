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

const bcrypt = require("bcrypt");
const express = require("express");
const BaseResponse = require("../models/base-response");
const router = express.router;
const User = require("../models/user");

// CreateUser API
router.post("/", async (req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    standardRole = {
      role: "standard",
    };

    //user object
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole,
    };

    User.create(newUser, function (err, user) {
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new BaseResponse(500, "Internal Server Error", err);
        res.status(500).send(createUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const createUserResponse = new BaseResponse(200, "Query Successful", user);
        res.json(createUserResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
