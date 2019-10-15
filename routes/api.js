/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      var books = req.params.books;
      // //response will be array of book objects
      // //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if (err){
         res.send(err);
        } else {
           db.collection('books').find().toArray(function(err,results){
            for (var i in results){
              if (results[i].comments.length == 0){
                results[i].commentcount = 0;
                delete results[i].comments;
              } else {
                  results[i].commentcount = results[i].comments.length;
                  delete results[i].comments;
                }
              }
            res.json(results);
           })
        }
      });
      // res.json(books)
    })
    
    .post(function (req, res){
      var title = req.body.title;
      if(!title){
        res.send('please add a title');
      } else {
      var book = {title, comments: []}
      //response will contain new book object including atleast _id and title
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if (err) {
         res.send(err);
        } else {
            db.collection('books').insert(book, function(err,doc){
              if(err){
               res.send(err)
              } else {
                 res.send(book)
              }
            })
        }
      })
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){
         res.send(err);
        } else {
            db.collection('books').remove();
            res.send('complete delete successful');
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      var newId = new ObjectId(bookid);
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if (err) {
         res.send(err);
        } else {
            db.collection('books').find({_id: newId}).toArray(function(err,result){
              if(err){
               res.send(err)
              } else {
                 res.json(result)
              }
            })
          }
      })
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var newId = new ObjectId(bookid);
      var book_title = req.body.book_title;
      var comment = req.body.comment;
      if(!bookid) {
       res.send('no id sent');
      } else {
        MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
          if(err){
           res.send(err);
          } else {
             db.collection('books').findAndModify(
               {_id: newId},
               {},
               {$push: {comments: comment}},
               {new: true}
             
             , function(err,doc){
               res.send(doc.value);
             });
          }
        });
        //json res format same as .get
      }
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      console.log(req.params.id);
      //if successful response will be 'delete successful'
      var newId = new ObjectId(bookid);
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
       db.collection('books').findOneAndDelete({_id: newId}, function(err,doc){
         if(err){
           res.send(err)
         } else {
            res.send("delete successful");
         }
       })
      })
    });
  
};
