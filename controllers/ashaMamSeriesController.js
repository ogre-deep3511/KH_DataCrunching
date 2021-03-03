const Stories = require('../models/storiesSchema');

const ashaMamSeries = (req, res, next) => {
    Stories.aggregate([
        {
            $match: {"kahani_id": "5e54a57eddc6c40c74994fcb"}
        },
        {
                $project: {"main_content": 1, "title": 1, "_id": 0}
        }
    ], (err, data) => {
        console.log(data);
        if(err) {
            res.json({
                error: err
            })
        }else {
            res.json({
                data: data
            })
        }
    })
}

module.exports = { ashaMamSeries }