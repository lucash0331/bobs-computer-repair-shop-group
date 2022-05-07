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
          Role.findOne({ text: req.body.text }, function (err, existedRole) {
            if (err) {
              console.log(err);
              const updateRoleMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
              res.status(500).send(updateRoleMongodbErrorResponse.toObject());
            } else {
              if (existedRole) {
                const response = `Role: ${req.body.text} already exists`;
                console.log(response);
                const roleAlreadyExistsErrorResponse = new BaseResponse(400, response);
                res.send(roleAlreadyExistsErrorResponse.toObject());
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

// Find by ID
router.get("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        const findRoleByIdMongodbErrorResponse = new BaseResponse("500", "Internal Server Error", err);
        res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
      } else {
        const findRoleByIdResponse = new BaseResponse("200", "Query Successful", role);
        res.json(findRoleByIdResponse.toObject());
      }
    });
  } catch (e) {
    const findRoleByIdCatchErrorResponse = new BaseResponse("500", "Internal Server Error", e.message);
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
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

// API to delete role - SHOULD BE DELETED (ONLY FOR TEST) - OK

//  router.delete("/:id", async (req, res) => {
//   try {
//     const roleId = req.params.id;

//     Role.findByIdAndDelete(
//       { _id: roleId },
//       function (err, role) {
//         if (err) {
//           console.log(err);
//           res.status(501).send({
//             message: `MongoDB Exception: ${err}`,
//           });
//         } else {
//           console.log(role);
//           res.json(role);
//         }
//       }
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       message: `Server Exception: ${e.message}`,
//     });
//   }

module.exports = router;
