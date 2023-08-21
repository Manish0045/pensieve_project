const mm = require('../Utilities/globalModule');
const { validationResult, body } = require('express-validator');
// const logger = require("../../utilities/logger");

// const applicationkey = process.env.APPLICATION_KEY;

var users = "users";
var viewUsers = "view_" + users;


function reqData(req) {
    var data = {
        id: req.body.ID,
        username: req.body.username,
        email: req.body.username,
        password: req.body.password,
    }
    return data;
}



exports.validate = function () {
    return [

        body('username', ' parameter missing').exists(), body('email', ' parameter missing').exists(), body('password', ' parameter missing').exists(), body('id').optional(),

    ]
}


exports.get = (req, res) => {

    var pageIndex = req.body.pageIndex ? req.body.pageIndex : '';

    var pageSize = req.body.pageSize ? req.body.pageSize : '';
    var start = 0;
    var end = 0;

    console.log(pageIndex + " " + pageSize)
    if (pageIndex != '' && pageSize != '') {
        start = (pageIndex - 1) * pageSize;
        end = pageSize;
        console.log(start + " " + end);
    }

    let sortKey = req.body.sortKey ? req.body.sortKey : 'ID';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';
    let filter = req.body.filter ? req.body.filter : '1';

    let criteria = '';

    if (pageIndex === '' && pageSize === '')
        criteria = filter + " order by " + sortKey + " " + sortValue;
    else
        criteria = filter + " order by " + sortKey + " " + sortValue + " LIMIT " + start + "," + end;

    let countCriteria = filter;
    //var supportKey = req.headers['supportkey'];
    try {
        mm.query('select count(*) as cnt from ' + viewUsers + ' where  ' + countCriteria, (error, results1) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to get user count.",
                });
            }
            else {
                console.log(results1);
                mm.query('select * from ' + viewUsers + ' where  ' + criteria, (error, results) => {
                    if (error) {
                        console.log(error);
                        res.send({
                            "code": 400,
                            "message": "Failed to get user information."
                        });
                    }
                    else {


                        res.send({
                            "code": 200,
                            "message": "success",
                            "count": results1[0].cnt,
                            "data": results
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
    }

}


exports.create = (req, res) => {

    var data = reqData(req);
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {

        console.log(errors);
        res.send({
            "code": 422,
            "message": errors.errors
        });
    }
    else {
        try {
            mm.query('INSERT INTO ' + users + ' SET ?', data, (error, results) => {
                if (error) {
                    console.log(error);
                    res.send({
                        "code": 400,
                        "message": "Failed to save user information..."
                    });
                }
                else {
                    console.log(results);
                    res.send({
                        "code": 200,
                        "message": "User information saved successfully...",
                    });
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}



exports.update = (req, res) => {
    const errors = validationResult(req);
    //console.log(req.body);
    var data = reqData(req);
    var criteria = {
        ID: req.body.ID,
    };
    var setData = "";
    var recordData = [];
    Object.keys(data).forEach(key => {
        data[key] ? setData += `${key}=?,` : true;
        data[key] ? recordData.push(data[key]) : true;
    });

    if (!errors.isEmpty()) {
        console.log(errors);
        res.send({
            "code": 422,
            "message": errors.errors
        });
    }
    else {
        try {
            mm.query(`UPDATE ` + users + ` SET ${setData} id='${criteria.ID}' where ID=${criteria.ID} `, recordData, (error, results) => {
                if (error) {
                    console.log(error);
                    res.send({
                        "code": 400,
                        "message": "Failed to update users information."
                    });
                }
                else {
                    console.log(results);
                    res.send({
                        "code": 200,
                        "message": "Users information updated successfully...",
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

exports.delete = (req, res) => {

    var criteria = {
        ID: req.body.ID,
    };
    try {
        connectDB.query("DELETE FROM" + users + "WHERE ID=" + criteria.ID, (error, results) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to update users information."
                });
            }
            else {
                console.log(results);
                res.send({
                    "code": 200,
                    "message": "Users information deleted successfully...",
                });
            }
        });
    } catch (error) {
        console.log(error)
    }


}

exports.login = (req, res) => {
    var data = reqData(req);

    console.log(req.body)
    // console.log(data);
    // console.log(req.body);
    // Query the database to check if the user exists
    mm.query(
        'SELECT * FROM ' + users + ' WHERE  email=' + `'${req.body.username}'` + '  AND password=' + `'${req.body.password}'`, (err, results) => {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    console.log("success");
                    res.status(200).json({ code: 200, message: 'Login successful', data: results });
                } else {
                    res.status(401).json({ code: 401, message: 'Invalid credentials' });
                }
            }
        }
    );
}