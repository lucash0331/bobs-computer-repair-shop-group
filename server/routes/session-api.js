/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint2
; Author: Professor Krasso
; Date: April 28, 2022
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

// Register API

router.post("/register", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        const registerUserMongodbErrorResponse = new BaseResponse("500", "Internal Server Error", err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      } else {
        if (!user) {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          standardRole = {
            role: "standard",
          };
          let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions,
          };
          User.create(registeredUser, function (err, newUser) {
            if (err) {
              const newUserMongodbErrorResponse = new BaseResponse("500", "Internal Server Error", err);
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            } else {
              const registeredUserResponse = new BaseResponse("200", "Query Successful", newUser);
              res.json(registeredUserResponse.toObject());
            }
          });
        } else {
          const userInUseError = new BaseResponse("400", `The username '${req.body.userName}' is already in use`, null);
          res.status(400).send(userInUseError.toObject());
        }
      }
    });
  } catch (e) {
    const registeredUserCatchErrorResponse = new BaseResponse("500", "Internal Server Error", e.message);
    res.status(500).send(registeredUserCatchErrorResponse.toObject());
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
          const firstQuestion = user.selectedSecurityQuestions.find(
            (question) => question.questionText === req.body.question1
          );
          const secondQuestion = user.selectedSecurityQuestions.find(
            (question) => question.questionText === req.body.question2
          );
          const thirdQuestion = user.selectedSecurityQuestions.find(
            (question) => question.questionText === req.body.question3
          );

          const isValidFirstAnswer = firstQuestion.answerText === req.body.answer1;
          const isValidSecondAnswer = secondQuestion.answerText === req.body.answer2;
          const isValidThirdAnswer = thirdQuestion.answerText === req.body.answer3;

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

//Reset Password API

router.post("/users/:userName/reset-password", async (req, res) => {
  try {
    const password = req.body.password;

    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new BaseResponse("500", "Internal server error", err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        //Salt and hash the password
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        user.set({
          password: hashedPassword,
        });

        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err);
            const updatedUserMongodbErrorResponse = new BaseResponse("500", "Internal server error", err);
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
          } else {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse("200", "Query Successful", updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const resetPasswordCatchError = new BaseResponse("500", "Internal server error", e);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});

//verify user API
router.get("/verify/users/:userName", async (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (user) {
        if (err) {
          console.log(err);
          const verifyUserMongodbErrorResponse = new BaseResponse("500", "Internal server", err);
          res.status(500).send(verifyUserMongodbErrorResponse.toObject());
        } else {
          console.log(user);
          const verifyUserResponse = new BaseResponse("200", "Query successful", user);
          res.json(verifyUserResponse.toObject());
        }
      } else {
        const invalidUserNameResponse = new BaseResponse("400", "Invalid username", req.params.userName);
        res.status(400).send(invalidUserNameResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new BaseResponse("500", "Internal server error", e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

module.exports = router;
