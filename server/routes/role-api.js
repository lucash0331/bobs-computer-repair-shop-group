/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint2
; Author: Professor Krasso
; Date: May 3, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App user-api.js file
; APIs for the user roles
;===========================================
*/

const express = require("express");
const Role = require("../models/role");
const BaseResponse = require("../models/base-response");
const router = express.Router();
const User = require("../models/user");

// Create role API - SHOULD BE DELETED (ONLY FOR TEST) - OK
router.post("/", async (req, res) => {
  let status = 200;
  try {
    const newRole = {
      text: req.body.text,
    };
    Role.create(newRole, function (err, role) {
      // If statement for an error with Mongo
      if (err) {
        console.log(err);
        status = 500;
        const createRoleMongodbErrorResponse = new BaseResponse(status, "Internal server error", err);
        return res.status(status).send(createRoleMongodbErrorResponse.toObject());
      }

      //  new Role
      console.log(role);
      const createRoleResponse = new BaseResponse(status, "Query Successful", role);
      return res.status(status).send(createRoleResponse.toObject());
    });
  } catch (error) {
    // Server error goes here
    console.log(error);
    status = 500;
    const createRoleCatchErrorResponse = new BaseResponse(status, "Internal server error", error.message);
    res.status(status).send(createRoleCatchErrorResponse.toObject());
  }
});

/**
 * API to update a role (OK)
 */

router.put("/:id", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.id }, function (err, role) {
      if (err) {
        console.log(err);
        const updateRoleMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      } else {
        if (!role) {
          const response = `Invalid ID`;
          console.log(response);
          res.send(response);
        } else {
          console.log(role);
          role.set({
            text: req.body.text,
          });

          role.save(function (err, updatedRole) {
            if (err) {
              console.log(err);
              const saveRoleInvalidIdResponse = new BaseResponse(500, "Internal server error", err);
              res.status(500).send(saveRoleInvalidIdResponse.toObject);
            } else {
              console.log(updatedRole);
              const updateRoleResponse = new BaseResponse(200, "Query successful", updatedRole);
              res.json(updateRoleResponse.toObject());
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    const updateRoleCatchErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    res.status(500).send(updateRoleCatchErrorResponse.toObject());
  }
});

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

//Delete role API


// API to delete role - SHOULD BE DELETED (ONLY FOR TEST) - OK

 router.delete("/:id", async (req, res) => {
  try {
    const roleId = req.params.id;

    Role.findByIdAndDelete(
      { _id: roleId },
      function (err, role) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(role);
          res.json(role);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
