/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 20, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-questions.js file
; APIs for the security questions
;===========================================
*/

const express = require("express");
const BaseResponse = require("../models/base-response");
const ErrorResponse = require("../models/error-response");
const router = express.Router();
const SecurityQuestion = require("../models/security-question");

// Create Security question API
router.post("/", async (req, res) => {
  let status = 200;
  try {
    const newSecurityQuestion = {
      text: req.body.text,
    };
    SecurityQuestion.create(newSecurityQuestion, function (err, securityQuestion) {
      // If statement for an error with Mongo
      if (err) {
        console.log(err);
        status = 500;
        const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(status, "Internal server error", err);
        return res.status(status).send(createSecurityQuestionMongodbErrorResponse.toObject());
      }

      //  new securityQuestion
      console.log(securityQuestion);
      const createSecurityQuestionResponse = new BaseResponse(status, "Query Successful", securityQuestion);
      return res.status(status).send(createSecurityQuestionResponse.toObject());
    });
  } catch (error) {
    // Server error goes here
    console.log(error);
    status = 500;
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(status, "Internal server error", error.message);
    res.status(status).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});
// End Create Security Question API

// Find Security Question by ID
router.get("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        const findSecurityQuestionError = new BaseResponse(500, "MongoDB Server Error", err);
        res.status(500).send(findSecurityQuestionError.toObject());
      } else {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, "Query Successful", securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    });
  } catch (e) {
    const findByIdCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

// Find all Security Questions
router.get("/", async (req, res) => {
  try {
    SecurityQuestion.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, securityQuestions) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Server error: " + err.message,
          });
        } else {
          console.log(securityQuestions);
          const findAllResponse = new BaseResponse(200, "Query successful", securityQuestions);
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/**
 * API to update security questions (OK)
 */

router.put("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const updateSecurityQuestionMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
      } else {
        if (!securityQuestion) {
          const response = `Invalid ID`;
          console.log(response);
          res.send(response);
        } else {
          console.log(securityQuestion);
          securityQuestion.set({
            text: req.body.text,
          });

          securityQuestion.save(function (err, updatedSecurityQuestion) {
            if (err) {
              console.log(err);
              const saveSecurityQuestionInvalidIdResponse = new BaseResponse(500, "Internal server error", err);
              res.status(500).send(saveSecurityQuestionInvalidIdResponse.toObject);
            } else {
              console.log(updatedSecurityQuestion);
              const updateSecurityQuestionResponse = new BaseResponse(200, "Query successful", updatedSecurityQuestion);
              res.json(updateSecurityQuestionResponse.toObject());
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * API to delete security questions
 */
router.delete("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        const deleteSecurityQuestionMongoErrorResponse = new BaseResponse("500", "MongoDB Server Error", err);
        res.status(500).send(deleteSecurityQuestionMongoErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: true,
        });
        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = BaseResponse("500", "MongoDB server error", err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse("200", "Question deleted", savedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new BaseResponse("500", "MongoDB server error", err);
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
  }
});

module.exports = router;
