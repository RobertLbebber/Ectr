/**
 * AdminAPIController
 *
 * @description :: Server-side logic for managing Adminapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    show: function (req, res) {
        var page = req.param('page');
        // if (page == null) {
        //     page = "admin";
        // }
        AdminAPI.find({}).exec(function (err, admin) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('sb-admin-layout/admin/' + page, { admin: admin });
        });
    },

    ListUsers: function (req, res) {
        console.log("In ListUsers");
        VolunteerAPI.find({}).exec(function (err, volunteers) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('sb-admin-layout/admin/admin-users', { volunteers: volunteers });
        });
    },

};

