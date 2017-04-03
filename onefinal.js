var cheerio = require('cheerio');
var request = require('request');
var sentiment = require('sentiment');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongojs=require('mongojs');
const app = express();
var url = 'mongodb://localhost:27017/expertdb';
MongoClient.connect(url, function(err, db) {
            var db = mongojs(url);
            console.log(db);
            request({
                method: 'GET',
                url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=45'
            }, function(err, response, body) {
                if (err) return console.error(err);
                $ = cheerio.load(body);

                href = $('a.t').attr('href');

                console.log(href);
                request({
                    method: 'GET',
                    url: href
                }, function(err, response, body) {
                    if (err) return console.error(err);
                    $ = cheerio.load(body);

                    var post = $('.posttext').text();

                    console.log(post);
                    // console.log(sentiment(post));
                    db.collection('quotes').save(sentiment(post), (err, result) => {
                        if (err) return console.log(err);
                        console.log(result.score);

                        console.log('saved to database');

                    });

                });
            });
});