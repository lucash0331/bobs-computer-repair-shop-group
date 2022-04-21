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

const express  = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const userRoleSchema = require('../schemas/user-role');
const BaseResponse = require('../models/base-response');

const router = express.Router();

//update user API

router.put('/:id', async(req,res) => {

    try {
        User.findOne({'_id': req.params.id}, function(err, user) {
            if (err) 
            {
                console.log(err);
                const updateSecurityQuestionMongodbErrorResponse = new BaseResponse('500', 'Internal server error', err);
                res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
            } else {
                console.log(user);

                user.set({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    email: req.body.email
                })

                user.save(function(err, savedUser) {
                    if (err) {
                        console.log(err);
                        const saveUserMongodbErrorResponse = new BaseResponse('200', 'Query successful', savedUser);
                        res.json(saveUserResponse.toObject()); 
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
        const updateUserCatchErrorResponse = BaseResponse('500', 'Internal server error', e.message);
        res.status(500).send(updateUserCatchErrorResponse.toObject());
    }
});

