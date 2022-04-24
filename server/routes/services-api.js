const express = require("express");
const BaseResponse = require("../models/base-response");
const router = express.Router();
const Service = require("../models/service");

// Find all services

router.get("/", async (req, res) => {
  try {
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

module.exports = router;
