/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {
        barcode: {
            type: 'string',
            required: true,
            unique: true
        },

        name: {
          type: 'string',
          unique: true,
          required: true
        },

        description: {
            type: 'text'
        },

        quantity: {
            type: 'integer',
            defaultsTo: 0
        },

        price: {
            type: 'float',
            defaultsTo: 0.00
        },

        type: {
            model: 'itemtype'
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    beforeValidate: (values, next) => next(),
    afterDestroy: (values, next) => {
      values.forEach(item => {
        ItemLocation.destroy({item: item.id}).exec((err, data) => next())
      })
    },
};
