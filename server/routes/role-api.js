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

router.delete("/:roleId", async (req, res) => {
  try {
    // Find the role by id
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const deleteRoleMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
        // Successful
      } else {
        console.log(role);
        // check if the role assigned to a user.
        User.aggregate(
          [
            {
              $lookup: {
                from: "roles",
                localField: "role.role",
                foreignField: "text",
                as: "userRoles",
              },
            },
            {
              $match: {
                "userRoles.text": role.text,
              },
            },
          ],
          function (err, users) {
            console.log(users);
            if (err) {
              console.log(err);
              const usersMongodbErrorResponse = new BaseResponse("500", "Internal server error", err);
              res.status(500).send(usersMongodbErrorResponse.toObject());
            } else {
              //  If the new role is already in use, then role shouldn't be disabled.
              if (users.length > 0) {
                console.log(`Role <${role.text}> is already in use and cannot be deleted`);
                const userRoleAlreadyInUseResponse = new BaseResponse(400, `Role '${role.text}' is in use.`, role);
                res.status(400).send(userRoleAlreadyInUseResponse.toObject());
              } else {
                console.log(`Role <${role.text}> is not an active role and can be safely removed`);
                role.set({ isDisabled: true });

                role.save(function (err, updatedRole) {
                  if (err) {
                    console.log(err);
                    const updatedRoleMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
                    res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                  } else {
                    console.log(updatedRole);
                    const roleDeletedResponse = new BaseResponse(
                      200,
                      `Role '${role.text}' has been removed successfully`,
                      updatedRole
                    );
                    res.json(roleDeletedResponse.toObject());
                  }
                });
              }
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
    const deleteRoleCatchErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;
