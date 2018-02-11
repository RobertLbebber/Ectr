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
    email: { type: 'email' },
    password: { type: 'string' },
    wphone: { type: 'number' },
    cphone: { type: 'number' },
    biotext: { type: 'clob' },
    commenthistory: { type: 'object' },
    imgloc: { type: 'string' }
  },

  // toJSON: function () {
  //   var obj = this.toObject();
  //   delete jstring.ePassword;
  //   return obj;
  // },

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

  connection: 'ectrdb'
};

