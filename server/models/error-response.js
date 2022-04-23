/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 20, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App error responses for messages
; APIs for the security questions and users
;===========================================
*/

class ErrorResponse {
    constructor(httpCode, message, data) {
      this.httpCode = httpCode;
      this.message = message;
      this.data = data;
    }
  
    toObject() {
      return {
        httpCode: this.httpCode,
        message: this.message,
        data: this.data,
        timestamp: new Date().toLocaleDateString(),
      };
    }
  }
  
  module.exports = ErrorResponse;
  