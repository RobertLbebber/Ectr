/**
 * UserAPIController
 *
 * @description :: Server-side logic for managing Userapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'signup': function (req, res) {

        res.view();
    },

    getMe: function (req, res) {
        // res.view('sb-admin-layout/admin/admin-users', { volunteers: volunteers });
        if (!req.session.User) {
            console.log(" req.session.User", req.session.User, " is not Defined")
        }
        res.json({ user: req.session.User });
    },

    create: function (req, res, next) {
        //Easy Way Of Creating Tuples 
        var fname = req.param("fname");
        var lname = req.param("lname");
        var email = req.param("email");
        var password = req.param("password");
        var confirmation = req.param("confirmation");
        User.create({
            fname: fname,
            lname: lname,
            email: { address: email },
            password: password,
            confirmation: confirmation,
            fname: fname,
        }, function userCreated(err, user) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Client-Error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log(req.session.flash.err);
                // req.flash('err',err.ValidationError);
                // return res.redirect('gen/signup');
            }
            // res.json(user);
            req.session.User = user;
            console.log(req.session);
            res.redirect('/');

            var oldDateObj = new Date();
            var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
            req.session.cookie.expires = newDateOdj;
            req.session.authenticated = true;

            // user.password = undefined;
            // user.confirmation = undefined;

        }
        );
    },

    login: function (req, res, next) {
        if (!req.param('email') || !req.param('password')) {
            var missInput = [{ name: 'usernamePasswordRequired', message: 'You need to provide the appropriate credentials' }];
            req.session.flash = {
                err: missInput
            }
            console.log("Error#0001", req.session.flash.err);

            res.redirect('gen/signup');
            return;
        }
        User.findOne({ "email.address": req.param("email") }).exec(function (err, user) {
            //General Error Detection
            if (err) { return next(err); }
            //No User Found With Email
            if (!user) {
                var missUser = [{ name: 'noUserFound', message: 'Incorrect Credentials' }];
                req.session.flash = {
                    err: missUser
                }
                console.log("Error#0002", req.session.flash.err);
                res.redirect('gen/signup');
                return;
            }
            var bcrypt = require('bcrypt');
            bcrypt.compare(req.param('password'), user.ePassword, function (err, valid) {
                //General Error Detection
                if (err) { return next(err); }
                //Password is Incorrect
                if (!valid) {
                    var missUser = [{ name: 'noUserFound', message: 'Incorrect Credentials' }];
                    req.session.flash = {
                        err: missUser
                    }
                    console.log("Error#0003", req.session.flash.err);
                    res.redirect('gen/signup');
                    return;
                }
                var oldDateObj = new Date();
                var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                req.session.cookie.expires = newDateOdj;
                req.session.authenticated = true;

                console.log(req.session);
                req.session.User = user;
                console.log(req.session.User);
                res.redirect('/');
            });
        });
    },

    destroySession: function (req, res) {
        req.session.destroy();
        res.redirect('gen/signup');
    },
    list: function (req, res) {
        User.find({}).exec(function (err, user) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('sb-admin-layout/pages/listUsers', { user: user });
        });
    },
    listToJSON: function (req, res) {
        User.find({}).exec(function (err, user) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('listUsers', { user: user });
        });
    },
    delete: function (req, res) {
        User.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0003' });
            }
            res.redirect('/User/list');
        });
        return false;
    },
    edit: function (req, res) {
        User.findOne({ id: req.params.id }).exec(function (err, edits) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0004' });
            }
            res.view('editUser', { edits: edits });
        });
    },
    update: function (req, res) {
        var body = req.body;
        var assets = [body.fname, body.lname, body.email, body.password];
        User.update({ id: req.params.id }, { fname: assets[0], lname: assets[1], email: assets[2], password: assets[3] }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0005' });
            }

            res.redirect('/User/list');
        });
        return false;
    }

};

