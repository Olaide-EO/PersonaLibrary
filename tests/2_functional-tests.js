/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var ObjectID = require('mongodb')
chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
         chai.request(server)
          .post('/api/books')
          .send({title: 'Title'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.isObject(res, 'response is an object');
            done();
          });
        });
      
      test('Test POST /api/books with no title given', function(done) { 
        chai.request(server)
          .post('/api/books')
          .send({comments: ['cool']})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, 'please add a title');
            done();
        });
      });
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
     chai.request(server)
      .get('/api/books/5bb3ff5f4c5c9a1d97d2d04p')
      .end(function(err, res){
       //console.log(res)
        assert.equal(res.status, 500);
        done();
      });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
     chai.request(server)
       
      .get('/api/books/5bb3ffbf4c5c9a1d97d2d04c')
      .end(function(err, res){
       //console.log(res)
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'title', 'book should have a title');
        assert.property(res.body[0], 'comments', 'book should have comments');
        done();
      });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/5bb3ffbf4c5c9a1d97d2d04c')
          .send({comment: 'cool'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.include(res.body.comments, 'cool');
            //console.log(res)
            done();
        });
      
      });
      
    });

  });

});
