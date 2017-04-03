var myfunc = function() {
    var myobj = {};
   var mongojs = require('mongojs');
    var cheerio = require('cheerio');
    var request = require('request');
    var sentiment = require('sentiment');
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/expertdb';
   
    
    MongoClient.connect(url, function(err, db) {
        var db = mongojs(url);
        console.log(db);

        console.log("Connected correctly to server.");
        var scores = db.collection('scores')

      
        function callback() {
            return;
        }

        
        pot();
        function pot(callback) {
            var positivecount;
            var negativecount;
            positivecount = 0;
            negativecount = 0;
            console.log("potassium");
            request({
                method: 'GET',
                url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=61'
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
                    url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=61'
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
                    myobj["p_p1"] = positivecount;
                    myobj["p_n1"] = negativecount;
                    var res = { "drugname": "potassium", "disease": "bp", "positivecount": positivecount, "negativecount": negativecount };
                    scores.insert(res, function(err) {
                        if (err) console.log(err)
                        else console.log("data inserted successfully!")
                    });

                    // next function call
                    positivecount = 0;
                    negativecount = 0;

                    request({
                        method: 'GET',
                        url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=122'
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
                        myobj["p_p2"] = positivecount;
                        myobj["p_n2"] = negativecount;
                        var res = { "drugname": "potassium", "disease": "thyroid", "positivecount": positivecount, "negativecount": negativecount };
                        scores.insert(res, function(err) {
                            if (err) console.log(err)
                            else console.log("data inserted successfully!")
                        });

                        positivecount = 0;
                        negativecount = 0;

                        request({
                            method: 'GET',
                            url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=78'
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
                            myobj["p_p3"] = positivecount;
                            myobj["p_n3"] = negativecount;
                            var res = { "drugname": "potassium", "disease": "kidney", "positivecount": positivecount, "negativecount": negativecount };
                            scores.insert(res, function(err) {
                                if (err) console.log(err)
                                else console.log("data inserted successfully!")
                            });

                            positivecount = 0;
                            negativecount = 0;

                            request({
                                method: 'GET',
                                url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=65'
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
                                myobj["p_p4"] = positivecount;
                                myobj["p_n4"] = negativecount;
                                var res = { "drugname": "potassium", "disease": "pcos", "positivecount": positivecount, "negativecount": negativecount };
                                scores.insert(res, function(err) {
                                    if (err) console.log(err)
                                    else console.log("data inserted successfully!")
                                });

                                positivecount = 0;
                                negativecount = 0;

                                request({
                                    method: 'GET',
                                    url: 'http://www.healthboards.com/drugtalk/potassium/index.htm?drug=Potassium&fid=105'
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
                                    myobj["p_p5"] = positivecount;
                                    myobj["p_n5"] = negativecount;
                                    var res = { "drugname": "potassium", "disease": "pregnancy", "positivecount": positivecount, "negativecount": negativecount };
                                    scores.insert(res, function(err) {
                                        if (err) console.log(err)
                                        else console.log("data inserted successfully!")
                                        met();
                                    });
                                    // next function call

                                });

                            }); //ZOLOFT4
                        }); //ZOLOFT3
                    }); //ZOLOFT2
                }); //ZOLOFT1

            });
            callback();
        }

        function met(callback) {
            var positivecount;
            var negativecount;
            positivecount = 0;
            negativecount = 0;
            console.log("metformin");
            request({
                method: 'GET',
                url: 'http://www.healthboards.com/drugtalk/metformin/index.htm?drug=Metformin&fid=45'
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
                    url: 'http://www.healthboards.com/drugtalk/metformin/index.htm?drug=Metformin&fid=45'
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
                    myobj["m_p1"] = positivecount;
                    myobj["m_n1"] = negativecount;
                    var res = { "drugname": "metformin", "disease": "bp", "positivecount": positivecount, "negativecount": negativecount };
                    scores.insert(res, function(err) {
                        if (err) console.log(err)
                        else console.log("data inserted successfully!")
                    });

                    // next function call
                    positivecount = 0;
                    negativecount = 0;

                    request({
                        method: 'GET',
                        url: 'http://www.healthboards.com/drugtalk/metformin/index.htm?drug=Metformin&fid=122'
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
                        myobj["m_p2"] = positivecount;
                        myobj["m_n2"] = negativecount;
                        var res = { "drugname": "metformin", "disease": "thyroid", "positivecount": positivecount, "negativecount": negativecount };
                        scores.insert(res, function(err) {
                            if (err) console.log(err)
                            else console.log("data inserted successfully!")
                        });

                        positivecount = 0;
                        negativecount = 0;

                        request({
                            method: 'GET',
                            url: 'http://www.healthboards.com/drugtalk/metformin/index.htm?drug=Metformin&fid=78'
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
                            myobj["m_p3"] = positivecount;
                            myobj["m_n3"] = negativecount;
                            var res = { "drugname": "metformin", "disease": "kidney", "positivecount": positivecount, "negativecount": negativecount };
                            scores.insert(res, function(err) {
                                if (err) console.log(err)
                                else console.log("data inserted successfully!")
                            });

                            positivecount = 0;
                            negativecount = 0;

                            request({
                                method: 'GET',
                                url: 'http://www.healthboards.com/drugtalk/metformin/index.htm?drug=Metformin&fid=161'
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
                                myobj["m_p4"] = positivecount;
                                myobj["m_n4"] = negativecount;
                                var res = { "drugname": "metformin", "disease": "pcos", "positivecount": positivecount, "negativecount": negativecount };
                                scores.insert(res, function(err) {
                                    if (err) console.log(err)
                                    else console.log("data inserted successfully!")
                                });

                                positivecount = 0;
                                negativecount = 0;

                                request({
                                    method: 'GET',
                                    url: 'http://www.healthboards.com/drugtalk/metformin/index.htm?drug=Metformin&fid=105'
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
                                    myobj["m_p5"] = positivecount;
                                    myobj["m_n5"] = negativecount;
                                    var res = { "drugname": "metformin", "disease": "pregnancy", "positivecount": positivecount, "negativecount": negativecount };
                                    scores.insert(res, function(err) {
                                        if (err) console.log(err)
                                        else console.log("data inserted successfully!")
                                             glu();
                                    });

                                    // next function call

                                });

                            }); //ZOLOFT4
                        }); //ZOLOFT3
                    }); //ZOLOFT2
                }); //ZOLOFT1

            });
            callback();
        }

        function glu(callback) {
            var positivecount;
            var negativecount;
            positivecount = 0;
            negativecount = 0;
            console.log("glucophage");
            request({
                method: 'GET',
                url: 'http://www.healthboards.com/drugtalk/glucophage/index.htm?drug=Glucophage&fid=45'
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
                    url: 'http://www.healthboards.com/drugtalk/glucophage/index.htm?drug=Glucophage&fid=45'
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
                    myobj["g_p1"] = positivecount;
                    myobj["g_n1"] = negativecount;
                    var res = { "drugname": "glucophage", "disease": "bp", "positivecount": positivecount, "negativecount": negativecount };
                    scores.insert(res, function(err) {
                        if (err) console.log(err)
                        else console.log("data inserted successfully!")
                    });

                    // next function call
                    positivecount = 0;
                    negativecount = 0;

                    request({
                        method: 'GET',
                        url: 'http://www.healthboards.com/drugtalk/glucophage/index.htm?drug=Glucophage&fid=122'
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
                        myobj["g_p2"] = positivecount;
                        myobj["g_n2"] = negativecount;
                        var res = { "drugname": "glucophage", "disease": "thyroid", "positivecount": positivecount, "negativecount": negativecount };
                        scores.insert(res, function(err) {
                            if (err) console.log(err)
                            else console.log("data inserted successfully!")
                        });

                        positivecount = 0;
                        negativecount = 0;

                        request({
                            method: 'GET',
                            url: 'http://www.healthboards.com/drugtalk/glucophage/index.htm?drug=Glucophage&fid=78'
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
                            myobj["g_p3"] = positivecount;
                            myobj["g_n3"] = negativecount;
                            var res = { "drugname": "glucophage", "disease": "kidney", "positivecount": positivecount, "negativecount": negativecount };
                            scores.insert(res, function(err) {
                                if (err) console.log(err)
                                else console.log("data inserted successfully!")
                            });

                            positivecount = 0;
                            negativecount = 0;

                            request({
                                method: 'GET',
                                url: 'http://www.healthboards.com/drugtalk/glucophage/index.htm?drug=Glucophage&fid=161'
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
                                myobj["g_p4"] = positivecount;
                                myobj["g_n4"] = negativecount;
                                var res = { "drugname": "glucophage", "disease": "pcos", "positivecount": positivecount, "negativecount": negativecount };
                                scores.insert(res, function(err) {
                                    if (err) console.log(err)
                                    else console.log("data inserted successfully!")
                                });

                                positivecount = 0;
                                negativecount = 0;

                                request({
                                    method: 'GET',
                                    url: 'http://www.healthboards.com/drugtalk/glucophage/index.htm?drug=Glucophage&fid=105'
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
                                    myobj["g_p5"] = positivecount;
                                    myobj["g_n5"] = negativecount;
                                    var res = { "drugname": "glucophage", "disease": "pregnancy", "positivecount": positivecount, "negativecount": negativecount };
                                    scores.insert(res, function(err) {
                                        if (err) console.log(err)
                                        else console.log("data inserted successfully!")
                                             lan();
                                    });

                                    // next function call

                                });

                            }); //ZOLOFT4
                        }); //ZOLOFT3
                    }); //ZOLOFT2
                }); //ZOLOFT1

            });
            callback();
        }

        function lan(callback) {
            var positivecount;
            var negativecount;
            positivecount = 0;
            negativecount = 0;
            console.log("lantus");
            request({
                method: 'GET',
                url: 'http://www.healthboards.com/drugtalk/lantus/index.htm?drug=Lantus&fid=61'
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
                    url: 'http://www.healthboards.com/drugtalk/lantus/index.htm?drug=Lantus&fid=61'
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
                    myobj["l_p1"] = positivecount;
                    myobj["l_n1"] = negativecount;
                    var res = { "drugname": "lantus", "disease": "bp", "positivecount": positivecount, "negativecount": negativecount };
                    scores.insert(res, function(err) {
                        if (err) console.log(err)
                        else console.log("data inserted successfully!")
                    });

                    // next function call
                    positivecount = 0;
                    negativecount = 0;

                    request({
                        method: 'GET',
                        url: 'http://www.healthboards.com/drugtalk/lantus/index.htm?drug=Lantus&fid=122'
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
                        myobj["l_p2"] = positivecount;
                        myobj["l_n2"] = negativecount;
                        var res = { "drugname": "lantus", "disease": "thyroid", "positivecount": positivecount, "negativecount": negativecount };
                        scores.insert(res, function(err) {
                            if (err) console.log(err)
                            else console.log("data inserted successfully!")
                        });

                        positivecount = 0;
                        negativecount = 0;

                        request({
                            method: 'GET',
                            url: 'http://www.healthboards.com/drugtalk/lantus/index.htm?drug=Lantus&fid=45'
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
                            myobj["l_p3"] = positivecount;
                            myobj["l_n3"] = negativecount;
                            var res = { "drugname": "lantus", "disease": "kidney", "positivecount": positivecount, "negativecount": negativecount };
                            scores.insert(res, function(err) {
                                if (err) console.log(err)
                                else console.log("data inserted successfully!")
                            });

                            positivecount = 0;
                            negativecount = 0;

                            request({
                                method: 'GET',
                                url: 'http://www.healthboards.com/drugtalk/lantus/index.htm?drug=Lantus&fid=129'
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
                                myobj["l_p4"] = positivecount;
                                myobj["l_n4"] = negativecount;
                                var res = { "drugname": "lantus", "disease": "pcos", "positivecount": positivecount, "negativecount": negativecount };
                                scores.insert(res, function(err) {
                                    if (err) console.log(err)
                                    else console.log("data inserted successfully!")
                                });

                                positivecount = 0;
                                negativecount = 0;

                                request({
                                    method: 'GET',
                                    url: 'http://www.healthboards.com/drugtalk/lantus/index.htm?drug=Lantus&fid=105'
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
                                    myobj["l_p5"] = positivecount;
                                    myobj["l_n5"] = negativecount;
                                    var res = { "drugname": "lantus", "disease": "pregnancy", "positivecount": positivecount, "negativecount": negativecount };
                                    scores.insert(res, function(err) {
                                        if (err) console.log(err)
                                        else console.log("data inserted successfully!")
                                             ava();
                                    });

                                    // next function call

                                });

                            }); //ZOLOFT4
                        }); //ZOLOFT3
                    }); //ZOLOFT2
                }); //ZOLOFT1

            });
            callback();
        }

        function ava(callback) {
            var positivecount;
            var negativecount;
            positivecount = 0;
            negativecount = 0;
            console.log("avandia");
            request({
                method: 'GET',
                url: 'http://www.healthboards.com/drugtalk/avandia/index.htm?drug=Avandia&fid=61'
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
                    url: 'http://www.healthboards.com/drugtalk/avandia/index.htm?drug=Avandia&fid=61'
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
                    myobj["a_p1"] = positivecount;
                    myobj["a_n1"] = negativecount;
                    var res = { "drugname": "avandia", "disease": "bp", "positivecount": positivecount, "negativecount": negativecount };
                    scores.insert(res, function(err) {
                        if (err) console.log(err)
                        else console.log("data inserted successfully!")
                    });

                    // next function call
                    positivecount = 0;
                    negativecount = 0;

                    request({
                        method: 'GET',
                        url: 'http://www.healthboards.com/drugtalk/avandia/index.htm?drug=Avandia&fid=122'
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
                        myobj["a_p2"] = positivecount;
                        myobj["a_n2"] = negativecount;
                        var res = { "drugname": "avandia", "disease": "thyroid", "positivecount": positivecount, "negativecount": negativecount };
                        scores.insert(res, function(err) {
                            if (err) console.log(err)
                            else console.log("data inserted successfully!")
                        });

                        positivecount = 0;
                        negativecount = 0;

                        request({
                            method: 'GET',
                            url: 'http://www.healthboards.com/drugtalk/avandia/index.htm?drug=Avandia&fid=45'
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
                            myobj["a_p3"] = positivecount;
                            myobj["a_n3"] = negativecount;
                            var res = { "drugname": "avandia", "disease": "kidney", "positivecount": positivecount, "negativecount": negativecount };
                            scores.insert(res, function(err) {
                                if (err) console.log(err)
                                else console.log("data inserted successfully!")
                            });

                            positivecount = 0;
                            negativecount = 0;

                            request({
                                method: 'GET',
                                url: 'http://www.healthboards.com/drugtalk/avandia/index.htm?drug=Avandia&fid=161'
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
                                myobj["a_p4"] = positivecount;
                                myobj["a_n4"] = negativecount;
                                var res = { "drugname": "avandia", "disease": "pcos", "positivecount": positivecount, "negativecount": negativecount };
                                scores.insert(res, function(err) {
                                    if (err) console.log(err)
                                    else console.log("data inserted successfully!")
                                });

                                positivecount = 0;
                                negativecount = 0;

                                request({
                                    method: 'GET',
                                    url: 'http://www.healthboards.com/drugtalk/avandia/index.htm?drug=Avandia&fid=75'
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
                                    myobj["a_p5"] = positivecount;
                                    myobj["a_n5"] = negativecount;
                                    var res = { "drugname": "avandia", "disease": "pregnancy", "positivecount": positivecount, "negativecount": negativecount };
                                    scores.insert(res, function(err) {
                                        if (err) console.log(err)
                                        else console.log("data inserted successfully!")
                                        console.log(myobj["u_p1"] + " " + myobj["u_p2"] + " " + myobj["u_p3"] + " " + myobj["u_p4"] + " " + myobj["u_p5"] + "\n");
                                        console.log(myobj["u_n1"] + " " + myobj["u_n2"] + " " + myobj["u_n3"] + " " + myobj["u_n4"] + " " + myobj["u_n5"] + "\n");
                                        console.log(myobj["p_p1"] + " " + myobj["p_p2"] + " " + myobj["p_p3"] + " " + myobj["p_p4"] + " " + myobj["p_p5"] + "\n");
                                        console.log(myobj["p_n1"] + " " + myobj["p_n2"] + " " + myobj["p_n3"] + " " + myobj["p_n4"] + " " + myobj["p_n5"] + "\n");
                                        console.log(myobj["m_p1"] + " " + myobj["m_p2"] + " " + myobj["m_p3"] + " " + myobj["m_p4"] + " " + myobj["m_p5"] + "\n");
                                        console.log(myobj["m_n1"] + " " + myobj["m_n2"] + " " + myobj["m_n3"] + " " + myobj["m_n4"] + " " + myobj["m_n5"] + "\n");
                                        console.log(myobj["g_p1"] + " " + myobj["g_p2"] + " " + myobj["g_p3"] + " " + myobj["g_p4"] + " " + myobj["g_p5"] + "\n");
                                        console.log(myobj["g_n1"] + " " + myobj["g_n2"] + " " + myobj["g_n3"] + " " + myobj["g_n4"] + " " + myobj["g_n5"] + "\n");
                                        console.log(myobj["l_p1"] + " " + myobj["l_p2"] + " " + myobj["l_p3"] + " " + myobj["l_p4"] + " " + myobj["l_p5"] + "\n");
                                        console.log(myobj["l_n1"] + " " + myobj["l_n2"] + " " + myobj["l_n3"] + " " + myobj["l_n4"] + " " + myobj["l_n5"] + "\n");
                                        console.log(myobj["a_p1"] + " " + myobj["a_p2"] + " " + myobj["a_p3"] + " " + myobj["a_p4"] + " " + myobj["a_p5"] + "\n");
                                        console.log(myobj["a_n1"] + " " + myobj["a_n2"] + " " + myobj["a_n3"] + " " + myobj["a_n4"] + " " + myobj["a_n5"] + "\n");
                                        console.log("end1");

                                    });
                                    return myobj;
                                    // next function call

                                });

                            }); //ZOLOFT4
                        }); //ZOLOFT3
                    }); //ZOLOFT2
                }); //ZOLOFT1

            });
            // console.log("end2");
            callback();
        }

    });
    return myobj;
};
exports.myfunc = myfunc;