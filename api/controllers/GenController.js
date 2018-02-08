/**
 * GenController
 *
 * @description :: Server-side logic for managing gens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `GenController.view()`
   */
  show: function (req, res) {
    var page=req.param('page');
    // console.log(new Date());
    // console.log(req.session.authenticated);
    res.view('gen.ng/pages/'+page);
  }
};

