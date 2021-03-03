const Kahanies = require('../models/kahaniesSchema');

const tamilUsersDetails = (req, res, next) => {
    Kahanies.aggregate([
        {
            $match: 
                    {
                            "language": "tamil"
                    }
        },
        {
                $project:
                        {
                                "author_id": 1
                        }
        },
        {
                $group: {_id: "$author_id", count: {"$sum": 1}}
        },
        {
                $lookup:
                        {
                                from: "users",
                                let: {"author_id": "$_id"},
                                pipeline:
                                        [
                                            {
                                                    $project:
                                                            {
                                                                    "_id": {"$toString": "$_id"},
                                                                    "full_name": 1,
                                                                    "phone": 1,
                                                                    "email": 1,
                                                                    "role_id": 1
                                                            }
                                            },
                                            {
                                                    $match:
                                                        {
                                                                $expr:
                                                                    {
                                                                            $eq: ["$_id", "$$author_id"]
                                                                    }
                                                        }
                                            }
                                        ],
                            as: "test"
                        }
        },
        {
                $unwind: "$test"
        },
        {
                $match: {"test.role_id": 0}
        },
        {
                $project:
                        {
                                "test.full_name": 1,
                                "test.phone": 1,
                                "test.email": 1,
                                "test.role_id": 1
                        }
        }
    ], (err, data) => {
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

module.exports = {tamilUsersDetails}