const mm = require('../Utilities/globalModule');
const { validationResult, body } = require('express-validator');
// const logger = require("../../utilities/logger");

// const applicationkey = process.env.APPLICATION_KEY;

var gps = "gps";
var viewGPS = "view_" + gps;


function reqData(req) {

    var data = {
        id: req.body.ID,
        device_id: req.body.DEVICE_ID,
        device_type: req.body.DEVICE_TYPE,
        timestamp: req.body.TIMESTAMP,
        location: req.body.LOCATION,
    }
    return data;
}



exports.validate = function () {
    return [

        body('device_id', ' parameter missing').exists(), body('device_type', ' parameter missing').exists(), body('timestamp', ' parameter missing').exists(), body('location', ' parameter missing').exists(), body('ID').optional(),


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

    try {
        mm.query('select count(*) as cnt from ' + viewGPS + ' where  ' + countCriteria, (error, results1) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to get gpss count.",
                });
            }
            else {
                console.log(results1);
                mm.query('select * from ' + viewGPS + ' where  ' + criteria, (error, results) => {
                    if (error) {
                        console.log(error);
                        res.send({
                            "code": 400,
                            "message": "Failed to get gps information."
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

    if (!errors.isEmpty()) {

        console.log(errors);
        res.send({
            "code": 422,
            "message": errors.errors
        });
    }
    else {
        try {
            mm.query('INSERT INTO ' + gps + ' SET ?', data, (error, results) => {
                if (error) {
                    console.log(error);
                    res.send({
                        "code": 400,
                        "message": "Failed to save gps information..."
                    });
                }
                else {
                    console.log(results);
                    res.send({
                        "code": 200,
                        "message": "gps information saved successfully...",
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
        data[key] ? setData += `${key}= ? , ` : true;
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
            mm.query(`UPDATE ` + gps + ` SET ${setData}  where ID = ${criteria.ID} `, recordData, (error, results) => {
                if (error) {
                    console.log(error);
                    res.send({
                        "code": 400,
                        "message": "Failed to update gps information."
                    });
                }
                else {
                    console.log(results);
                    res.send({
                        "code": 200,
                        "message": "gps information updated successfully...",
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
        connectDB.query("DELETE FROM" + gps + "WHERE ID=" + criteria.ID, (error, results) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to update gps information."
                });
            }
            else {
                console.log(results);
                res.send({
                    "code": 200,
                    "message": "gps information deleted successfully...",
                });
            }
        });
    } catch (error) {
        console.log(error)
    }


};

exports.getByDeviceID = (req, res) => {
    let id = req.params.id;
    console.log(id);
    // console.log(viewGPS);
    try {
        mm.query(`select count(*) as cnt from ${viewGPS} where device_id ="${id}" `, (error, results1) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to get gpss count.",
                });
            }
            else {
                console.log(results1);
                mm.query(`select * from ${viewGPS} where device_id="${id}"`, (error, results) => {
                    if (error) {
                        console.log(error);
                        res.send({
                            "code": 400,
                            "message": "Failed to get gps information."
                        });
                    }
                    else {
                        console.log(`select count(*) as cnt from ${viewGPS} where device_id ="${id}" `)
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