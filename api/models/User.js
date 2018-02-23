/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fname: { type: 'string' },
    lname: { type: 'string' },
    email: { type: 'json' },
    userType: {
      type: 'string',
      enum: ['admin', 'patron', 'electr', 'dev'],
      defaultsTo: 'patron'
    },
    ePassword: { type: 'string' },
  },

  beforeCreate: function (values, next) {
    console.log("BeforeCreate", values.password, values.confirmation);
    if (!values.password || values.password != values.confirmation) {
      return next({ err: ["Password doesn't match password Confirmation ERR#0006"] });
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypter(err, ePassword) {
      if (err) { return next(err); }
      values.ePassword = ePassword;

      delete values.password;
      delete values.confirmation;
      values.online = true;
      next();
    });
  },

  connection: 'ectrdb'
};

