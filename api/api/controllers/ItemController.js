/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res, next) {
		Item.find().populate('type').exec(function(err, item) {
			return res.ok(item);
		});
	}
};
