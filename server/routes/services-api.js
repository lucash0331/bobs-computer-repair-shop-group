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

router.get("/", async (req, res) => {
  try {
    Service.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, services) {

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
          console.log(err);
          const invalidServiceIdErrorResponse = new BaseResponse(400, "Invalid service ID", err);
          res.status(400).send(invalidServiceIdErrorResponse.toObject());
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

router.post("/", async (req, res) => {
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
        const newServiceResponse = new BaseResponse(200, "Query Successful", service);
        res.json(newServiceResponse.toObject());
      }
    });
  } catch (e) {
    const newServiceCatchErrorResponse = new BaseResponse(500, "Internal Server Error", e.message);
    res.status(500).send(newServiceCatchErrorResponse.toObject());
  }
});

// Delete service API
router.delete("/:id", async (req, res) => {
  try {
    Service.findOne({ _id: req.params.id }, function (err, service) {

      if (err) {
        console.log(err);
        const deleteServiceMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
        return res.status(500).send(deleteServiceMongodbErrorResponse.toObject());
      } else {

        // If statement for service not found in DB
        if (!service) {
          console.log("Service not found");
          const deleteServiceResponse = new BaseResponse(404, "Service not found");
          return res.status(404).send(deleteServiceResponse.toObject());
        } else {
          console.log(service);
          service.set({
            isDisabled: true,
          });
          service.save(function (err, savedService) {
            // If statement 
            if (err) {
              console.log(err);
              const deleteServiceMongodbErrorResponse = new BaseResponse(500, "Internal server error", err);
              return res.status(500).send(deleteServiceMongodbErrorResponse.toObject());
            } else {
              console.log(savedService);
              // This will return the deleted service
              const deleteServiceResponse = new BaseResponse(200, "Query successful", service);
              res.json(deleteServiceResponse.toObject());
            }
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    const deleteServiceCatchErrorResponse = new BaseResponse(500, "Internal server error", e.message);
    return res.status(500).send(deleteServiceCatchErrorResponse.toObject());
  }
});

/* API to delete from DB service
router.delete("/:id", async (req, res) => {
  try {

    Service.findByIdAndDelete(
      { _id: req.params.id },
      function (err, service) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(service);
          res.json(service);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
}); */

// Update service API

router.put("/:id", async (req, res) => {
  try {
    Service.findOne({ _id: req.params.id }, function (err, service) {
      if (err) {
        const updateServiceMongodbErrorResponse = new BaseResponse(500, "Internal Server Error", err);
        res.status(500).send(updateServiceMongodbErrorResponse.toObject());
      } else {
        if (!service) {
          res.send("Invalid ID");
        } else {
          Service.findOne({ name: req.body.name }, function (err, existedService) {
            if (err) {
              const updateServiceMongodbErrorResponse = new BaseResponse(500, "Internal Server Error", err);
              res.status(500).send(updateServiceMongodbErrorResponse.toObject());
            } else {
              if (existedService) {
                const serviceAlreadyExistsResponse = new BaseResponse(400, response);
                res.send(serviceAlreadyExistsResponse.toObject());
              } else {
                service.set({
                  name: req.body.name,
                  price: req.body.price,
                });
                service.save(function (err, updatedService) {
                  if (err) {
                    const saveServiceInvalidIdResponse = new BaseResponse(500, "Internal Server Error", err);
                    res.status(500).send(saveServiceInvalidIdResponse.toObject());
                  } else {
                    const updateServiceResponse = new BaseResponse(200, "Query Successful", updatedService);
                    res.json(updateServiceResponse.toObject());
                  }
                });
              }
            }
          });
        }
      }
    });
  } catch (e) {
    const updateServiceCatchErrorResponse = new BaseResponse(500, "Query Successful", updatedService);
    res.json(updateServiceCatchErrorResponse.toObject());
  }
});

module.exports = router;
