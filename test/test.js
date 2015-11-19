"use strict";
var assert = require("assert")
var request = require('supertest')
var chai = require('chai')
var expect = chai.expect;
var should = chai.should();
var mongoose = require('mongoose')
var express = require('express')
var app = require('../app.js')
var router = require('../routes/content.js')


describe('getRandom test', function(){

	it('should return true', function() {
		var r = router.getRandom(1);
		assert.deepEqual([1,1],r);
	});

	it('return different, bound of 2', function() {
		var r = router.getRandom(2); 
		assert.notDeepEqual(r[0], r[1]);
	});

	it('return different, bound of -5', function() {
		var r = router.getRandom(-5); 
		assert.notDeepEqual(r[0], r[1]);
	});	

	it('return different, bound of 100', function() {
		var r = router.getRandom(100); 
		assert.notDeepEqual(r[0], r[1]);
	});	

	it('return different, bound of -100', function() {
		var r = router.getRandom(-100); 
		assert.notDeepEqual(r[0], r[1]);
	});	

	it('return different, bound of 1000000', function() {
		var r = router.getRandom(1000000); 
		assert.notDeepEqual(r[0], r[1]);
	});	

	it('return different, bound of -1000000', function() {
		var r = router.getRandom(-1000000); 
		assert.notDeepEqual(r[0], r[1]);
	});	

});

describe('testing all endpoints', function() {
	var user = {
		username: 'Wish',
		password: 'Full',
		email: 'thinking@gmail.com'
	}

	var winner = {
		 title: 'Rudimentary',
 		 rank: 1200,
 		 type: 'image',
 		 tags: ['Portraits'],
 		 artist: 'Leon',
 		 comments:[],
 		 flags: [],
 		 location: 'someawslink'
	}

	var loser = {
		 title: 'Loser',
 		 rank: 1200,
 		 type: 'image',
 		 tags: ['Portraits'],
 		 artist: 'Loo',
 		 comments:[],
 		 flags: [],
 		 location: 'someotherawslink'
	}

	var winnerLoser = [winner, loser];

	it('get homepage', function(done) {
		request(app)
			.get('/')
			//.set('Accept', 'application/json')
			//.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
				//should.not.exist(err);
			});
	});

	it('get content/matchup/image', function(done) {
		request(app)
			.get('/content/matchup/image')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it('get matchup/type/ should return 404 since route not yet created', function(done) {
		request(app)
			.get('/matchup/:type')
			.expect(404)
			.end(function(err, res) {
				res.status.should.equal(404);
				done();
			});
	});

	it('get matchup/type/tags should return route not yet created', function(done) {
		request(app)
			.get('/matchup/:type/:tags')
			.expect(404)
			.end(function(err, res) {
				res.status.should.equal(404);
				done();
			});
	});

	it('get faq', function(done) {
		request(app)
			.get('/faq')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it('get upload', function(done) {
		request(app)
			.get('/upload')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it('get sign-up', function(done) {
		request(app)
			.get('/sign-up')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
	});

it('get login', function(done) {
		request(app)
			.get('/login')
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
	});

	it('should return 500 for post image since only saves image locally', function(done) {
		request(app)
			.post('/img-upload')
			.send(user)
			.end(function(err, res) {
				res.status.should.equal(404);
				done();
			});
	});

	it('should return 404 since vote-results route not created yet', function(done) {
		request(app)
			.post('/vote-results')
			.send(winnerLoser)
			.end(function(err, res) {
				res.status.should.equal(404);
				done();
			});
	});
});//closing

/*describe('Art', function() {

	describe('art.js tests', function(){
			beforeEach(module('artBoard'));
		it('should return correct length of imgArt, txtArt, and audioArt', inject(function($controller) {
			var ctrl = $controller('artCtrl', ['Art', function(Art){
				this.imgArt = getImgArt();
				this.txtArt = getTxtArt();
				this.audioArt = getAudioArt();
			}]);

			expect(ctrl.imgArt.length).to.equal(11);
			expect(ctrl.txtArt.length).to.equal(3);
			expect(ctrl.audioArt.length).to.equal(3);
		}));*/
	/*	describe('art.js tests', function(){
			beforeEach(module('artBoard'));
			it('should return the correct fields of imgArt, txtArt, and audioArt', inject(function($controller) {
			var ctrl = $controller('artCtrl', ['Art', function(Art){
				this.imgArt = getImgArt();
				this.txtArt = getTxtArt();
				this.audioArt = getAudioArt();
			}]);

			var img = [
			{artist: 'Place Holder', title: 'Washington', img: '/media/600x600.gif'},
			{artist: 'Place Holder', title: 'Washi', img: '/media/300.gif'},
			{artist: 'Place Holder', title: 'Wngton', img: '/media/1000x500.gif'},
			{artist: 'Place Holder', title: 'Music', img: '/media/music.jpg'},
			{artist: 'Place Holder', title: 'Tree', img: '/media/tree.jpg'},
			{artist: 'Place Holder', title: 'Animals', img: '/media/animals.jpg'},
			{artist: 'Place Holder', title: 'Up There', img: '/media/way-up-there.jpg'},
			{artist: 'Place Holder', title: 'Bricks', img: '/media/brick-wallpaper.jpg'},
			{artist: 'Place Holder', title: 'Bricks', img: '/media/yosemite-stream.jpg'},
			{artist: 'Place Holder', title: 'Bricks', img: '/media/horse.jpg'},	
			{artist: 'Place Holder', title: 'Bricks', img: '/media/bonsai.jpg'}];

			var txt = [
			{artist: 'Place Holdeer', title: 'Abstract Art', txt: '/media/O captain.txt'},
    		{artist: 'Place Holdeer', title: 'Abstract Art', txt: '/media/odetoanightengale.txt'},
    		{artist: 'Place Holdeer', title: 'Abstract Art', txt: '/media/ch1ofbravenewworld.txt'}];
            
			var audio = [
			{artist: 'Place Holder', title: 'Washington', audio: '/media/preview.mp3'},
			{artist: 'Place Holder', title: 'Washi', audio: '/media/preview (1).mp3'},
			{artist: 'Place Holder', title: 'Wngton', audio: '/media/preview (2).mp3'}];

			for(var i = 0; i < ctrl.imgArt.length; i++){ 
				expect(ctrl.imgArt[i].artist).to.equal(img[i].artist);
				expect(ctrl.imgArt[i].title).to.equal(img[i].title);
				expect(ctrl.imgArt[i].img).to.equal(img[i].img);
			}
			for(var i = 0; i < ctrl.txtArt.length; i++){
				expect(ctrl.txtArt[i].artist).to.equal(txt[i].artist);
				expect(ctrl.txtArt[i].title).to.equal(txt[i].title);
				expect(ctrl.txtArt[i].txt).to.equal(txt[i].txt);
                }
            for(var i =0; i < ctrl.audioArt.length; i++){
				expect(ctrl.audioArt[i].artist).to.equal(audio[i].artist);
				expect(ctrl.audioArt[i].title).to.equal(audio[i].title);
				expect(ctrl.audioArt[i].audio).to.equal(audio[i].audio);
			}
		}));
});*/
//}); //closing 
	