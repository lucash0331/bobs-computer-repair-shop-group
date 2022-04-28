/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 21, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App session-api.js file
; API for user session sign-in
;===========================================
*/

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const userRoleSchema = require("../schemas/user-role");
const BaseResponse = require("../models/base-response");

const router = express.Router();
const saltRounds = 10;

// User sign-in
router.post("/signin", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signinMongodbErrorResponse = new BaseResponse(500, "Internal Server Error", err);
        res.status(500).send(signinMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        if (user) {
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

          if (passwordIsValid) {
            console.log("Login Successful");
            const signinResponse = new BaseResponse(200, "Login Successful", user);
            res.json(signinResponse.toObject());
          } else {
            console.log(`Invalid password for username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(
              401,
              "Invalid username and/or password.  Please try again",
              null
            );
            console.log(invalidPasswordResponse.toObject());
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        } else {
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUserNameResponse = new BaseResponse(
            200,
            "Invalid username and/or password.  Please try again",
            null
          );
          console.log(invalidUserNameResponse.toObject());
          res.status(401).send(invalidUserNameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const signinCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(signinCatchErrorResponse.toObject());
  }
});
/**
 * API to verify security questions (OK)
 */

 router.post("/verify/users/:userName/security-questions", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          const response = `Invalid userName`;
          console.log(response);
          res.send(response);
        } else {

          const firstQuestion = user.securityQuestions.find(
            (question) => question.question === req.body.question1
          );
          const secondQuestion = user.securityQuestions.find(
            (question) => question.question === req.body.question2
          );
          const thirdQuestion = user.securityQuestions.find(
            (question) => question.question === req.body.question3
          );

          const isValidFirstAnswer =
            firstQuestion.answer === req.body.answer1;
          const isValidSecondAnswer =
            secondQuestion.answer === req.body.answer2;
          const isValidThirdAnswer =
            thirdQuestion.answer === req.body.answer3;

            if (isValidFirstAnswer && isValidSecondAnswer && isValidThirdAnswer) {
              console.log("Answers are correct");
              const validSecurityQuestionsResponse = new BaseResponse("200", "Answers are correct", user);
              res.json(validSecurityQuestionsResponse.toObject());
            } else {
              console.log("Answers are incorrect");
              const invalidSecurityQuestionsResponse = new BaseResponse("200", "Answers are incorrect", user);
              res.json(invalidSecurityQuestionsResponse.toObject());
            }
        }
      }
    });
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionsErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    res.status(500).send(verifySecurityQuestionsErrorResponse.toObject());
  }
});

module.exports = router;
