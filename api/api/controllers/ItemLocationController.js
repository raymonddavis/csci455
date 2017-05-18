/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res, next) {
    ItemLocation.find().populate('item').populate('location').exec(function(err, item) {
      return res.ok(item);
    });
  }
};
