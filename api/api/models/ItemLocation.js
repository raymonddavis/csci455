/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {
        item: {
            model: 'item'
        },

        location: {
            model: 'location'
        },

        toJSON() {
            return this.toObject();
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => {
      ItemLocation.findOne({ item: values.item, location: values.location }).exec(function(err, data) {
        if (data) return next(sails.config.additionals.DUPLICATE);
  			return next()
  		})
    },
    beforeValidate: (values, next) => next(),
};
