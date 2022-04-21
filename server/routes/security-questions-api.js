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
const router = express.router;
const SecurityQuestion = require("../models/security-question");

// Find Security Question by ID (not complete)
// Should this be "/questions/:id" ?
router.get("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne({ _id: req.params.id }, function (err, securityQuestion) {
      if (err) {
        const findSecurityQuestionError = new BaseResponse("500", "MongoDV Server Error", err);
        res.status(500).send(findSecurityQuestionError.toObject());
      } else {
        res.json(securityQuestion);
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Server error: " + e.message,
    });
  }
});

// Find all Security Questions
router.get("/questions", async (req, res) => {
  // in progress
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
        res.status(500).send(deleteSecurityQuestionMongoErrorResponse.toObjects());
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
