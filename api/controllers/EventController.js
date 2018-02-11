/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    show: function (req, res) {
        res.view('/media/index');
    },

    index: function (req, res) {

        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(
            '<form action="http://localhost:1337/Event/create" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="avatar" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
        )
    },

    index2: function (req, res) {
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
        var pictureId = new mongo.ObjectID();
        req.params.eId = eventId;
        req.params.pId = pictureId;

        // var http = require('http');
        // var formidable = require('formidable');

        // var form = new formidable.IncomingForm();
        // form.parse(req, function (err, fields, files) {
        //     res.write('File uploaded');
        //     console.log("In");
        //     res.end();
        // });
        // console.log("out");

        Event.create(req.params.all()).exec(function (err, event) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#c0005' });
            }
            // res.get('/media/index');
            res.view('media/show', { event: event, layout: 'media/layout.ejs' });
        });
    },

    createComment: function (req, res) {
        console.log(req.params.all());
        // console.log("hit");
        const mongo = require('mongodb');
        var commentId = new mongo.ObjectID();
        // var comments = {};
        var cid = commentId;
        // comments.timeStamp = req.param('timeStamp');
        var commentstext = req.param('text');
        var id = req.param('id');
        // console.log(comments);
        console.log(commentstext);
        console.log(id);
        // var eeve = Event.findOne({ id: id });
        // console.log(eeve);
        Event.create({
            commentId: cid, ctext: commentstext
        });
        Event.findOne({ id: id }).exec(function (err, event) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#c0005' });
                console.log("error");
                return;
            }

            res.view('media/show', { event: event });
        });
    },

    show: function (req, res) {
        var page = req.param('page');

        res.view('media/' + page);
    },

};

