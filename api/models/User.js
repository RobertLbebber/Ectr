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
  },

  connection: 'ectrdb'
};

