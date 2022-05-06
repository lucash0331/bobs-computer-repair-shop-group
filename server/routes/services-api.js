/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint3
; Author: Professor Krasso
; Date: May 3, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App services-api.js file
; API for services operations
;===========================================
*/

const express = require("express");
const BaseResponse = require("../models/base-response");
const router = express.Router();
const Service = require("../models/service");

// Find all services
//If deleted service becomes "Disabled", will uncomment 22-25 and delete 26

router.get("/", async (req, res) => {
  try {
    //Service.find({})
    //.where("isDisabled")
    //.equals(false)
    //.exec(function (err, services) {
    Service.find({}, function (err, services) {
      if (err) {
        const readServicesMongodbErrorResponse = new BaseResponse(500, "Internal Server Error", err);
        res.status(500).send(readServicesMongodbErrorResponse.toObject());
      } else {
        const readServicesResponse = new BaseResponse(200, "Query Successful", services);
        res.json(readServicesResponse.toObject());
      }
    });
  } catch (e) {
    const readServiceCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(readServiceCatchErrorResponse.toObject());
  }
});

/**
 * API to find service by ID (OK)
 */

router.get("/:id", async (req, res) => {
  try {
    Service.findOne({ _id: req.params.id }, function (err, service) {
      console.log(req.params.id);
      if (err) {
        console.log(err);
        const readServiceMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        res.status(500).send(readServiceMongodbErrorResponse.toObject());
      } else {
        if (!service) {
          const response = `Invalid service ID`;
          console.log(response);
          res.send(response);
        } else {
          const readServiceResponse = new BaseResponse(200, "Query successful", service);
          console.log(service);
          res.json(readServiceResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const readServiceCatchErrorResponse = new BaseResponse(500, "Internal server error", err);
    res.status(500).send(readServiceCatchErrorResponse.toObject());
  }
});
//Create Service API

router.post("/services", async (req, res) => {
  try {
    const newService = {
      name: req.body.name,
      price: req.body.price,
    };
    Service.create(newService, function (err, service) {
      if (err) {
        console.log(err);
        const newServiceMongodbErrorResponse = new BaseResponse(500, "Internal Server Error", err);
        res.status(500).send(newServiceMongodbErrorResponse.toObject());
      } else {
        console.log(newService);
        const newServiceResponse = new BaseResponse(200, "Query Successful", err);
        res.json(newServiceResponse.toObject());
      }
    });
  } catch (e) {
    const newServiceCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(newServiceCatchErrorResponse.toObject());
  }
});

// Update service API

module.exports = router;
