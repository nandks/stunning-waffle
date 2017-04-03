var mongojs = require('mongojs');
const MongoClient = require('mongodb').MongoClient;
var myfunc = function() {
    var myobj = {};
    // myobj["u_p1"]=, myobj["u_p2"]=20, myobj["u_p3"]=20, myobj["u_p4"]=20, myobj["u_p5"]=20, myobj["u_n1"]=-10, myobj["u_n2"]=-10, myobj["u_n3"]=-10, myobj["u_n4"]=-10, myobj["u_n5"]=-10;
    myobj["p_p1"] = 30, myobj["p_p2"] = 46, myobj["p_p3"] = 32, myobj["p_p4"] = 21, myobj["p_p5"] = 10, myobj["p_n1"] = -30, myobj["p_n2"] = -13, myobj["p_n3"] = -13, myobj["p_n4"] = -27, myobj["p_n5"] = -17;
    myobj["m_p1"] = 25, myobj["m_p2"] = 21, myobj["m_p3"] = 43, myobj["m_p4"] = 24, myobj["m_p5"] = 24, myobj["m_n1"] = -11, myobj["m_n2"] = -23, myobj["m_n3"] = -16, myobj["m_n4"] = -11, myobj["m_n5"] = -9;
    myobj["g_p1"] = 39, myobj["g_p2"] = 25, myobj["g_p3"] = 21, myobj["g_p4"] = 30, myobj["g_p5"] = 32, myobj["g_n1"] = -19, myobj["g_n2"] = -9, myobj["g_n3"] = -25, myobj["g_n4"] = -3, myobj["g_n5"] = -11;
    myobj["l_p1"] = 12, myobj["l_p2"] = 8, myobj["l_p3"] = 23, myobj["l_p4"] = 18, myobj["l_p5"] = 21, myobj["l_n1"] = -21, myobj["l_n2"] = -17, myobj["l_n3"] = -3, myobj["l_n4"] = -17, myobj["l_n5"] = -13;
    myobj["a_p1"] = 10, myobj["a_p2"] = 13, myobj["a_p3"] = 24, myobj["a_p4"] = 11, myobj["a_p5"] = 25, myobj["a_n1"] = -23, myobj["a_n2"] = -19, myobj["a_n3"] = -4, myobj["a_n4"] = -12, myobj["a_n5"] = -21;

    var url = 'mongodb://localhost:27017/expertdb';
    MongoClient.connect(url, function(err, db) {
        var db = mongojs(url);
        var scores = db.collection('scores');
        scores.insert(myobj, function(err) {
            if (err) console.log(err)
            else console.log("data loaded successfully!")
        });
    });
    return myobj;
};
exports.myfunc = myfunc;
