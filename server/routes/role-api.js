/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App role-api.js file
; APIs for the user roles
;===========================================
*/

const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");

const router = express.Router();

//Find all roles API
router.get("/", async (req, res) => {
  try {
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new BaseResponse("500", "internal server error", err);
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse("200", "Query successful", roles);
          res.json(findAllRolesResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new BaseResponse("500", "Internal server error", e.message);
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

module.exports = router;
