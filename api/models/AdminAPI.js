/**
 * AdminAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pidm: {
      type: 'string',
      // primaryKey: true,
      // required: true,
      size: 15
    },
    fname :{
      type:'string',
      required:true,
      size:20
    },
    lname :{
      type:'string',
      required:true,
      size:25
    },    
    email :{
      type:'string',
      email:true,
      required:true,
      // unique:true,
      size:45
    },
    // profile:{
    //   type:'string'
    // },
    ePassword:{
      type:'string',
      required:true,
    },  
    phone: {
      type: 'string',
      required: true,
      size: 15
    },
  },
  toJSON: function () {
    var obj = this.toObject();
    delete jstring.ePassword;
    return obj;
  },

  beforeCreate: function (values, next) {
    if (!values.password || values.password != values.confirmation) {
      return next({ err: ["Password doesn't match password Confirmation ERR#0006"] });
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypter(err, ePassword) {
      if (err) { return next(err); }
      values.ePassword = ePassword;
      values.online = true;
      next();
    });
  },

  connection: 'annualfunddb'
};

