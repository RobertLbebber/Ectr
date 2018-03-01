/**
 * UserAPIController
 *
 * @description :: Server-side logic for managing Userapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// const OBJECT_ID = require("bson-objectid");

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

                req.session.User = user;
                res.redirect('/');
            });
        });
    },

    getEmails: function (req, res) {

        var emailCategory = req.param("email_category");
        var things = [];
        var shortname = req.session.User.email.category;

        for (var key in shortname) {
            if (shortname[key].name === emailCategory) {
                for (var x in shortname[key].mail) {
                    things.push(shortname[key].mail[x].id);
                }
            }
        }

        Email.find({ id: { $in: things } }).exec(function (err, emailDetail) {
            res.json({ emailDetail: emailDetail });
        });
    },

    sendEmail: function (req, res) {

        var toArray = req.param("to").replace(",", " ").split(" ").filter(function (e) { return e !== '' });
        var ccArray = req.param("cc").replace(",", " ").split(" ").filter(function (e) { return e !== '' });
        var bccArray = req.param("bcc").replace(",", " ").split(" ").filter(function (e) { return e !== '' });

        Email.create({
            to: toArray,
            cc: ccArray,
            bcc: bccArray,
            subject: req.param("subject"),
            message: req.param("message"),
            from: req.session.User.email.address
        }, function emailCreated(err, email) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Client-Error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log(req.session.flash.err);
            }
            sails.log(email);
            var newEmail = { id: email.id, "was-read": false };
            var emailId = email.id;
            var addressToAdd = [];

            var rsUec = req.session.User.email.category;
            var filteredObj = rsUec.find(function (item, i) {
                if (item.name === "sent") {
                    rsUec[i].mail.push(email);
                    return i;
                }
            });

            toArray.forEach(element => {
                addressToAdd.push(element);
            });
            ccArray.forEach(element => {
                addressToAdd.push(element);
            });
            bccArray.forEach(element => {
                addressToAdd.push(element);
            });

            User.update({ "email.address": addressToAdd },
                { $addToSet: { "email.category": newEmail } }
            ).exec(function (err, results) {
                console.log("Look At This", results);
            });


            // console.log("a", req.session.User.email.category[0].mail);
            // console.log("b", req.session.User);
            // console.log("c", req.session.User.id);
            User.update({ "email.address": req.session.User.email.address },
                { email: req.session.User.email }).exec(function (err, results) {
                    console.log("Inside Update Lets see whats up", results);
                });
            res.redirect('/build/email.html');
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

