const express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongojs = require('mongojs')
var cheerio = require('cheerio');
var request = require('request');
var sentiment = require('sentiment');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var scrape2 = require('./static/res/js/userd');
var scrape = require('./static/res/js/alluser');

var app = express()
var port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('static'))



app.get('/', function(req, res) {
    res.send(index.html)
})

app.listen(port)
console.log('server started at port:' + port)

var url = 'mongodb://localhost:27017/expertdb';
MongoClient.connect(url, function(err, db) {
    var db = mongojs(url);
    console.log(db);
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    var registrations = db.collection('registrations')
    var scores = db.collection('scores')

    app.get('/checkregistered', function(req, res) {
        var email = req.query.email;
        var password = req.query.pass;
        console.log('Entered email:', email);
        console.log('entered password:', password);
        registrations.findOne({"email": email }, function(err, user) {
            console.log(user);
           // console.log(user.password);
            if (err)
              console.log(err);
    	    else if (!user){
              //  return done(null, false, { message: 'User not found.'} );
                console.log('User not found.');
                res.send('false');
                  
            }
            else if (user.password==password){
               // return done(null, false, { message: 'Incorrect password.'} );
               console.log('correct password');
                 res.send('true')
            }
            else
            {
            	res.send('false');
            }

           
            
        });
    });

    app.post('/register', function(req, res) {
        console.log(req.body)
        registrations.insert(req.body, function(err) {
            if (err) console.log(err)
            else console.log("Student data loaded successfully!")
        });
        res.send('thanks for registration.')
    });
    global.m;
    global.u;

    app.get('/scraping', function(req, res) {

        var udrug = req.query.drug;

        m = scrape.myfunc();
        u = scrape2.myuser(udrug);
        
      
    });

    app.get('/formatting', function(req, res) {

        var format = req.query.format;
        if (format == '1') {
            var dataset = [{
                    "Potassium": m.p_p1,
                    "metformin": m.m_p1,
                    "glucophage": m.g_p1,
                    "lantus": m.l_p1,
                    "avandia": m.a_p1,
                    "user_drug": u.u_p1,
                    "name": "BP_positive"
                },

                {
                    "Potassium": m.p_n1,
                    "metformin": m.m_n1,
                    "glucophage": m.g_n1,
                    "lantus": m.l_n1,
                    "avandia": m.a_n1,
                    "user_drug": u.u_n1,
                    "name": "BP_negative"
                }, {
                    "Potassium": m.p_p2,
                    "metformin": m.m_p2,
                    "glucophage": m.g_p2,
                    "lantus": m.l_p2,
                    "avandia": m.a_p2,
                    "user_drug": u.u_p2,
                    "name": "Thyroid_positive"
                }, {
                    "Potassium": m.p_n2,
                    "metformin": m.m_n2,
                    "glucophage": m.g_n2,
                    "lantus": m.l_n2,
                    "avandia": m.a_n2,
                    "user_drug": u.u_n2,
                    "name": "Thyroid_negative"
                }, {
                    "Potassium": m.p_p3,
                    "metformin": m.m_p3,
                    "glucophage": m.g_p3,
                    "lantus": m.l_p3,
                    "avandia": m.a_p3,
                    "user_drug": u.u_p3,
                    "name": "Kidney_positive"
                }, {
                    "Potassium": m.p_n3,
                    "metformin": m.m_n3,
                    "glucophage": m.g_n3,
                    "lantus": m.l_n3,
                    "avandia": m.a_n3,
                    "user_drug": u.u_n3,
                    "name": "Kidney_negative"
                }, {
                    "Potassium": m.p_p4,
                    "metformin": m.m_p4,
                    "glucophage": m.g_p4,
                    "lantus": m.l_p4,
                    "avandia": m.a_p4,
                    "user_drug": u.u_p4,
                    "name": "Infertility_positive"
                }, {
                    "Potassium": m.p_n4,
                    "metformin": m.m_n4,
                    "glucophage": m.g_n4,
                    "lantus": m.l_n4,
                    "avandia": m.a_n4,
                    "user_drug": u.u_n4,
                    "name": "Infertility_negative"
                }, {
                    "Potassium": m.p_p5,
                    "metformin": m.m_p5,
                    "glucophage": m.g_p5,
                    "lantus": m.l_p5,
                    "avandia": m.a_p5,
                    "user_drug": u.u_p5,
                    "name": "PCOS_positive"
                }, {
                    "Potassium": m.p_n5,
                    "metformin": m.m_n5,
                    "glucophage": m.g_n5,
                    "lantus": m.l_n5,
                    "avandia": m.a_n4,
                    "user_drug": u.u_n5,
                    "name": "PCOS_negative"
                }
            ];
            res.send(dataset);
        } else if (format == '2') {
            var flare = {
                "name": "Correlation with other diseases",
                "children": [{
                        "name": "High and Low BP",
                        "children": [{
                            "name": "user_drug positivecount:" + u.u_p1 + "negativecount:" + u.u_n1,
                            "size": 3938
                        }, {
                            "name": "potassium positivecount:" + m.p_p1 + "negativecount:" + m.p_n1,
                            "size": 3938
                        }, {
                            "name": "Metformin positivecount:" + m.m_p1 + "negativecount:" + m.m_n1,
                            "size": 3812
                        }, {
                            "name": "Glucophage positivecount:" + m.g_p1 + "negativecount:" + m.g_n1,
                            "size": 6714
                        }, {
                            "name": "Lantus positivecount:" + m.l_p1 + "negativecount:" + m.l_n1,
                            "size": 7432
                        }, {
                            "name": "avandia positivecount:" + m.a_p1 + "negativecount:" + m.a_n1,
                            "size": 743
                        }]
                    },

                    {
                        "name": "kidney disorder",
                        "children": [{
                            "name": "user_drug positivecount:" + u.u_p2 + "negativecount:" + u.u_n2,
                            "size": 3938
                        }, {
                            "name": "potassium positivecount:" + m.p_p2 + "negativecount:" + m.p_n2,
                            "size": 3938
                        }, {
                            "name": "Metformin positivecount:" + m.m_p2 + "negativecount:" + m.m_n2,
                            "size": 3812
                        }, {
                            "name": "Glucophage positivecount:" + m.g_p2 + "negativecount:" + m.g_n2,
                            "size": 6714
                        }, {
                            "name": "Lantus positivecount:" + m.l_p2 + "negativecount:" + m.l_n2,
                            "size": 7432
                        }, {
                            "name": "avandia positivecount:" + m.a_p2 + "negativecount:" + m.a_n2,
                            "size": 743
                        }]

                    },

                    {
                        "name": "thyroid disorder",
                        "children": [{
                                "name": "user_drug positivecount:" + u.u_p3 + "negativecount:" + u.u_n3,
                                "size": 3938
                            },

                            {
                                "name": "potassium positivecount:" + m.p_p3 + "negativecount:" + m.p_n3,
                                "size": 3938
                            }, {
                                "name": "Metformin positivecount:" + m.m_p3 + "negativecount:" + m.m_n3,
                                "size": 3812
                            }, {
                                "name": "Glucophage positivecount:" + m.g_p3 + "negativecount:" + m.g_n3,
                                "size": 6714
                            }, {
                                "name": "Lantus positivecount:" + m.l_p3 + "negativecount:" + m.l_n3,
                                "size": 7432
                            }, {
                                "name": "avandia positivecount:" + m.a_p3 + "negativecount:" + m.a_n3,
                                "size": 743
                            }
                        ]
                    },

                    {
                        "name": "Infertility",
                        "children": [{
                            "name": "user_drug positivecount:" + u.u_p4 + "negativecount:" + u.u_n4,
                            "size": 3938
                        }, {
                            "name": "potassium positivecount:" + m.p_p4 + "negativecount:" + m.p_n4,
                            "size": 3938
                        }, {
                            "name": "Metformin positivecount:" + m.m_p4 + "negativecount:" + m.m_n4,
                            "size": 3812
                        }, {
                            "name": "Glucophage positivecount:" + m.g_p4 + "negativecount:" + m.g_n4,
                            "size": 6714
                        }, {
                            "name": "Lantus positivecount:" + m.l_p4 + "negativecount:" + m.l_n4,
                            "size": 7435
                        }, {
                            "name": "avandia positivecount:" + m.a_p4 + "negativecount:" + m.a_n4,
                            "size": 743
                        }]
                    },

                    {
                        "name": "Poly cystic ovary syndrome (PCOS)",
                        "children": [{
                                "name": "user_drug positivecount:" + u.u_p5 + "negativecount:" + u.u_n5,
                                "size": 3938
                            },

                            {
                                "name": "potassium positivecount:" + m.p_p5 + "negativecount:" + m.p_n5,
                                "size": 3938
                            }, {
                                "name": "Metformin positivecount:" + m.m_p5 + "negativecount:" + m.m_n5,
                                "size": 3812
                            }, {
                                "name": "Glucophage positivecount:" + m.g_p5 + "negativecount:" + m.g_n5,
                                "size": 6714
                            }, {
                                "name": "Lantus positivecount:" + m.l_p5 + "negativecount:" + m.l_n5,
                                "size": 7432
                            }, {
                                "name": "avandia positivecount:" + m.a_p5 + "negativecount:" + m.a_n5,
                                "size": 743
                            }
                        ]
                    }
                ]
            }
            res.send(flare);
        } else if (format == '3') {
        	var freqData=[
{State:'Potassium',freq:{Blood_pressure:m.p_p1, Kidney_disorder:m.p_p3, thyroid_disorder:m.p_p2,Infertility:m.p_p4,PCOS:m.p_p5,}}
,{State:'Metformin',freq:{Blood_pressure:m.m_p1, Kidney_disorder:m.m_p3, thyroid_disorder:m.m_p2,Infertility:m.m_p4,PCOS:m.m_p5,}}
res.send(freqData);
        },{State:'Glucophage',freq:{Blood_pressure:m.g_p1, Kidney_disorder:m.g_p3, thyroid_disorder:m.g_p2,Infertility:m.g_p4,PCOS:m.g_p5,}}
,{State:'Lantus',freq:{Blood_pressure:m.l_p1, Kidney_disorder:m.l_p3, thyroid_disorder:m.l_p2,Infertility:m.l_p4,PCOS:m.l_p5,}}
,{State:'Avandia',freq:{Blood_pressure:m.a_p1, Kidney_disorder:m.a_p3, thyroid_disorder:m.a_p2,Infertility:m.a_p4,PCOS:m.a_p5,}}
,{State:'<<User Drug>>',freq:{Blood_pressure:u.u_p1, Kidney_disorder:u.u_p3, thyroid_disorder:u.u_p2,Infertility:u.u_p4,PCOS:u.u_p5}}
];

    });





     

});
