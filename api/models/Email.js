/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,



  attributes: {

  },

  getPublic: function () {
    console.log("First Attempt in getPublic");
    return {
      id: this.id,
      to: this.to,
      cc: this.cc,
      from: this.from,
      "sent-date": this["sent-date"],
      subject: this.subject,
      message: this.message
    };
  },
};

