/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint2
; Author: Professor Krasso
; Date: May 3, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App user-api.js file
; APIs for the user role
;===========================================
*/

const express = require("express");
const Role = require("../models/role");
const BaseResponse = require("../models/base-response");
const router = express.Router();

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
              name: req.body.name,
            });
  
            role.save(function (err, updatedRole) {
              if (err) {
                console.log(err);
                const saveRoleInvalidIdResponse = new BaseResponse(500, "Internal server error", err);
                res.status(500).send(saveRoleInvalidIdResponse.toObject);
              } else {
                console.log(updatedSecurityQuestion);
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
  

module.exports = router;