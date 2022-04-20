/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: March 2, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App base responses for messages
; APIs for the security questions
;===========================================
*/


//class for error messages
class BaseResponse {
    constructor(code, msg, data) {
      this.code = code;
      this.msg = msg;
      this.data = data;
    }
  
    //toObject function will return an object with all the BaseResponse fields to go into the error message
  
    toObject() {
      return {
        'code': this.code,
        'msg': this.msg,
        'data': this.data,
        'timestamp': new Date().toLocaleDateString()
      }
    }
  }
  
  module.exports = BaseResponse;