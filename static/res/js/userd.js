function callfunc() {
    return;
}
var myuser = function(udrug) {
        var objuser = {};
        const MongoClient = require('mongodb').MongoClient;
        
        var mongojs = require('mongojs')
        var cheerio = require('cheerio');
        var request = require('request');
        var sentiment = require('sentiment');
        var site = "http://www.healthboards.com/drugtalk/"

        if (udrug == "humalog") {
            var url1 = 'http://www.healthboards.com/drugtalk/humalog/index.htm?drug=Humalog&fid=45';
            var url2 = 'http://www.healthboards.com/drugtalk/humalog/index.htm?drug=Humalog&fid=122';
            var url3 = 'http://www.healthboards.com/drugtalk/humalog/index.htm?drug=Humalog&fid=61';
            var url4 = 'http://www.healthboards.com/drugtalk/humalog/index.htm?drug=Humalog&fid=24';
            var url5 = 'http://www.healthboards.com/drugtalk/humalog/index.htm?drug=Humalog&fid=58';

        } else if (udrug == "actos") {
            var url1 = 'http://www.healthboards.com/drugtalk/actos/index.htm?drug=Actos&fid=45'
            var url2 = 'http://www.healthboards.com/drugtalk/actos/index.htm?drug=Actos&fid=122'
            var url3 = 'http://www.healthboards.com/drugtalk/actos/index.htm?drug=Actos&fid=78'
            var url4 = 'http://www.healthboards.com/drugtalk/actos/index.htm?drug=Actos&fid=161'
            var url5 = 'http://www.healthboards.com/drugtalk/actos/index.htm?drug=Actos&fid=75'
        } else if (udrug == "novolog") {
            var url1 = 'http://www.healthboards.com/drugtalk/novolog/index.htm?drug=Novolog&fid=45'
            var url2 = 'http://www.healthboards.com/drugtalk/novolog/index.htm?drug=Novolog&fid=54'
            var url3 = 'http://www.healthboards.com/drugtalk/novolog/index.htm?drug=Novolog&fid=130'
            var url4 = 'http://www.healthboards.com/drugtalk/novolog/index.htm?drug=Novolog&fid=100'
            var url5 = 'http://www.healthboards.com/drugtalk/novolog/index.htm?drug=Novolog&fid=75'
        } else if (udrug == "amaryl") {
            var url1 = 'http://www.healthboards.com/drugtalk/amaryl/index.htm?drug=Amaryl&fid=45'
            var url2 = 'http://www.healthboards.com/drugtalk/amaryl/index.htm?drug=Amaryl&fid=61'
            var url3 = 'http://www.healthboards.com/drugtalk/amaryl/index.htm?drug=Amaryl&fid=12'
            var url4 = 'http://www.healthboards.com/drugtalk/amaryl/index.htm?drug=Amaryl&fid=118'
            var url5 = 'http://www.healthboards.com/drugtalk/amaryl/index.htm?drug=Amaryl&fid=130'
        } else if (udrug == "glipzide") {
            var url1 = 'http://www.healthboards.com/drugtalk/glipizide/index.htm?drug=Glipizide&fid=45'
            var url2 = 'http://www.healthboards.com/drugtalk/glipizide/index.htm?drug=Glipizide&fid=122'
            var url3 = 'http://www.healthboards.com/drugtalk/glipizide/index.htm?drug=Glipizide&fid=78'
            var url4 = 'http://www.healthboards.com/drugtalk/glipizide/index.htm?drug=Glipizide&fid=130'
            var url5 = 'http://www.healthboards.com/drugtalk/glipizide/index.htm?drug=Glipizide&fid=129'
        } else {
            var url1 = site + udrug + "/" + "index.htm?drug=" + udrug + "&fid=45"
            var url2 = site + udrug + "/" + "index.htm?drug=" + udrug + "&fid=122"
            var url3 = site + udrug + "/" + "index.htm?drug=" + udrug + "&fid=78"
            var url4 = site + udrug + "/" + "index.htm?drug=" + udrug + "&fid=161"
            var url5 = site + udrug + "/" + "index.htm?drug=" + udrug + "&fid=105"
        }

        var positivecount;
        var negativecount;
        positivecount = 0;
        negativecount = 0;
        console.log(udrug);
        var url = 'mongodb://localhost:27017/expertdb';
        MongoClient.connect(url, function(err, db) {
                    var db = mongojs(url);

                    var scores = db.collection('scores');
                    request({
                        method: 'GET',
                        url: url1
                    }, function(err, response, body) {
                        if (err) return console.error(err);
                        $ = cheerio.load(body);
                        $('a.t').each(function() {
                            var href = $(this).attr('href');
                            request({
                                method: 'GET',
                                url: href
                            }, function(err, response, body) {
                                if (err) return console.error(err);
                                $ = cheerio.load(body);
                                var post = $('.posttext').text();
                                sentiment(post, function(err, result) {
                                    var res = 'sentiment(' + post + ') === ' + result.score;
                                    if (result.score > 0)
                                        positivecount++;
                                    else
                                        negativecount++;
                                });

                            });
                        });
                        positivecount = 0;
                        negativecount = 0;

                        request({
                            method: 'GET',
                            url: url1
                        }, function(err, response, body) {
                            if (err) return console.error(err);
                            $ = cheerio.load(body);
                            $('a.t').each(function() {
                                var href = $(this).attr('href');
                                request({
                                    method: 'GET',
                                    url: href
                                }, function(err, response, body) {
                                    if (err) return console.error(err);
                                    $ = cheerio.load(body);
                                    var post = $('.posttext').text();
                                    sentiment(post, function(err, result) {
                                        var res = 'sentiment(' + post + ') === ' + result.score;
                                        if (result.score > 0)
                                            positivecount++;
                                        else
                                            negativecount++;
                                    });

                                });

                            });
                            objuser["u_p1"] = positivecount;
                            objuser["u_n1"] = -negativecount;
                            var res = { "drugname": "userdrug", "disease": "bp", "positivecount": positivecount, "negativecount": negativecount };
                            scores.insert(res, function(err) {
                                if (err) console.log(err)
                                else console.log("data inserted successfully!")
                            });

                            // next function call
                            positivecount = 0;
                            negativecount = 0;

                            request({
                                method: 'GET',
                                url: url2
                            }, function(err, response, body) {
                                if (err) return console.error(err);
                                $ = cheerio.load(body);
                                $('a.t').each(function() {
                                    var href = $(this).attr('href');
                                    request({
                                        method: 'GET',
                                        url: href
                                    }, function(err, response, body) {
                                        if (err) return console.error(err);
                                        $ = cheerio.load(body);
                                        var post = $('.posttext').text();
                                        sentiment(post, function(err, result) {
                                            var res = 'sentiment(' + post + ') === ' + result.score;
                                            if (result.score > 0)
                                                positivecount++;
                                            else
                                                negativecount++;
                                        });
                                    });
                                });
                                objuser["u_p2"] = positivecount;
                                objuser["u_n2"] = -negativecount;
                                var res = { "drugname": "userdrug", "disease": "thyroid", "positivecount": positivecount, "negativecount": negativecount };
                                scores.insert(res, function(err) {
                                    if (err) console.log(err)
                                    else console.log("data inserted successfully!")
                                });
                                callfunc();
                                positivecount = 0;
                                negativecount = 0;

                                request({
                                    method: 'GET',
                                    url: url3
                                }, function(err, response, body) {
                                    if (err) return console.error(err);
                                    $ = cheerio.load(body);
                                    $('a.t').each(function() {
                                        var href = $(this).attr('href');
                                        request({
                                            method: 'GET',
                                            url: href
                                        }, function(err, response, body) {
                                            if (err) return console.error(err);
                                            $ = cheerio.load(body);
                                            var post = $('.posttext').text();
                                            sentiment(post, function(err, result) {
                                                var res = 'sentiment(' + post + ') === ' + result.score;
                                                if (result.score > 0)
                                                    positivecount++;
                                                else
                                                    negativecount++;
                                            });
                                        });
                                    });
                                    objuser["u_p3"] = positivecount;
                                    objuser["u_n3"] = -negativecount;
                                    var res = { "drugname": "userdrug", "disease": "kidney", "positivecount": positivecount, "negativecount": negativecount };
                                    scores.insert(res, function(err) {
                                        if (err) console.log(err)
                                        else console.log("data inserted successfully!")
                                    });
                                    callfunc();

                                    positivecount = 0;
                                    negativecount = 0;

                                    request({
                                        method: 'GET',
                                        url: url4
                                    }, function(err, response, body) {
                                        if (err) return console.error(err);
                                        $ = cheerio.load(body);
                                        $('a.t').each(function() {
                                            var href = $(this).attr('href');
                                            request({
                                                method: 'GET',
                                                url: href
                                            }, function(err, response, body) {
                                                if (err) return console.error(err);
                                                $ = cheerio.load(body);
                                                var post = $('.posttext').text();
                                                sentiment(post, function(err, result) {
                                                    var res = 'sentiment(' + post + ') === ' + result.score;
                                                    if (result.score > 0)
                                                        positivecount++;
                                                    else
                                                        negativecount++;
                                                });
                                            });
                                        });
                                        objuser["u_p5"] = positivecount;
                                        objuser["u_n5"] = -negativecount;
                                        var res = { "drugname": "userdrug", "disease": "pcos", "positivecount": positivecount, "negativecount": negativecount };
                                        scores.insert(res, function(err) {
                                            if (err) console.log(err)
                                            else console.log("data inserted successfully!")
                                        });
                                        callfunc();

                                        positivecount = 0;
                                        negativecount = 0;

                                        request({
                                            method: 'GET',
                                            url: url5
                                        }, function(err, response, body) {
                                            if (err) return console.error(err);
                                            $ = cheerio.load(body);
                                            $('a.t').each(function() {
                                                var href = $(this).attr('href');
                                                request({
                                                    method: 'GET',
                                                    url: href
                                                }, function(err, response, body) {
                                                    if (err) return console.error(err);
                                                    $ = cheerio.load(body);
                                                    var post = $('.posttext').text();
                                                    sentiment(post, function(err, result) {
                                                        var res = 'sentiment(' + post + ') === ' + result.score;
                                                        if (result.score > 0)
                                                            positivecount++;
                                                        else
                                                            negativecount++;
                                                    });
                                                });
                                            });
                                            objuser["u_p4"] = positivecount;
                                            objuser["u_n4"] = -negativecount;
                                            var res = { "drugname": "userdrug", "disease": "pregnancy", "positivecount": positivecount, "negativecount": negativecount };
                                            scores.insert(res, function(err) {
                                                if (err) console.log(err)
                                                else console.log("data inserted successfully!")
                                                    // pot();
                                                console.log(objuser["u_p1"] + " " + objuser["u_p2"] + " " + objuser["u_p3"] + " " + objuser["u_p4"] + " " + objuser["u_p5"] + "\n");
                                                console.log(objuser["u_n1"] + " " + objuser["u_n2"] + " " + objuser["u_n3"] + " " + objuser["u_n4"] + " " + objuser["u_n5"] + "\n");
                                               // callfunc();
                                            });
                                            // next function call

                                        });

                                    }); //ZOLOFT4

                                }); //ZOLOFT3

                            }); //ZOLOFT2
                        }); //ZOLOFT1

                    });
                });
                    return objuser;
                }; exports.myuser = myuser;
