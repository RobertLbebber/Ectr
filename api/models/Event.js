/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: "string", unique: true },
    header: String,
    title: String,
    timeStamp: Date,
    body: String,
    comments: [{ text: String, author: String, response: [{ text: String, author: String, timeStamp: Date }], timeStamp: Date, id: String }],
  },

  connection: 'ectrdb'
};

