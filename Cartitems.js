/**
 * Cartitems.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Name:{
      type:"string",
      required:true
    },
    Quantity:{
      type:"integer",
      required:false
    },
    productId:{
      type:"string",
      required:false
    }
  },
  
  datastore:'mongodb'

};

