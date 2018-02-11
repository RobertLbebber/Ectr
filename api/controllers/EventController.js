/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        var page = req.params('page');

        Event.findOne({ id: page }).exec(function (err, event) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0004' });
            }
            res.view('media/index', { event: event });
        });
    },

    create: function (req, res) {
        const mongo = require('mongodb');
        var eventId = new mongo.ObjectID();
        req.params.eId = eventId;
        console.log(req.params.all());
        Event.create(req.params.all()).exec(function (err, event) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#c0005' });
            }
            res.location('media/index', { event: event });
            res.view('media/index', { event: event, layout: '/media/layout' });
        });
    },

    // createComment: function (req, res) {
    //     console.log(req.params.all());
    //     console.log("hit");
    //     const mongo = require('mongodb');
    //     var commentId = new mongo.ObjectID();
    //     var comments = {};
    //     comments.id = commentId;
    //     comments.timeStamp = req.param('timeStamp');
    //     comments.text = req.param('text');
    //     console.log(comments);



    //     Event.create({
    //         comments: comments
    //     }).exec(function (err, event) {
    //         if (err) {
    //             res.send(500, { error: 'Database Error ERR#c0005' });
    //         }

    //         var eid = event.id;
    //         console.log(eid);
    //         Event.findOne({ id: eid }).exec(function (err, page) {
    //             if (err) {
    //                 res.send(500, { error: 'Database Error ERR#0004' });
    //             }
    //             res.get('media/i/' + id);
    //         });

    //         // res.view('media/index', { event: event, layout: 'media/layout' });
    //     });
    // },

    show: function (req, res) {
        var page = req.param('page');

        res.view('media/' + page);
    },

};

