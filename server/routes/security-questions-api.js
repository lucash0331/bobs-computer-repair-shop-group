/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: March 2, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-questions.js file
; APIs for the security questions
;===========================================
*/

const express = require('express');
const BaseResponse = require('../models/base-response');
const router = express.router;
const SecurityQuestion = require ('../models/security-question');


/**
 * API to delete security questions
 */
router.delete('/:id', async(req, res) => {
    try {
       SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
        if(err) {
            console.log(err);
            const deleteSecurityQuestionMongoErrorResponse = new BaseResponse('500', 'MongoDB Server Error', err);
            res.status(500).send(deleteSecurityQuestionMongoErrorResponse.toObjects());  
        } else {
            console.log(securityQuestion);

            securityQuestion.set({
                isDisabled: true
            });
            securityQuestion.save(function(err, savedSecurityQuestion) {
                if (err)
                {
                    console.log(err);
                    const savedSecurityQuestionMongodbErrorResponse = BaseResponse('500', 'MongoDB server error', err);
                    res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                } else {
                    console.log(savedSecurityQuestion);
                    const deleteSecurityQuestionResponse = new BaseResponse('200','Question deleted', savedSecurityQuestion);
                    res.json(deleteSecurityQuestionResponse.toObject());
                }
            })
        }
       }) 
    }
    catch (e) {
        console.log(e);
        const deleteSecurityQuestionCatchErrorResponse = new BaseResponse('500', 'MongoDB server error', err);
        res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
    }
});

module.exports = router;