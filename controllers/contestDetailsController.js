const Contest = require('../models/contestSchema');

const contestDetails = (req, res, next) => {
    Contest.aggregate([
        {
            $match: {"start_date": {$gte: new Date("2021-02-28 18:30:00.000Z")}}
        },
        {
                $project:
                        {
                                "_id": {"$toString": "$_id"},
                                "language": 1
                        }
        },
        {
                $lookup:
                        {
                                from: "contest-submissions",
                                let: {"contest_id": "$_id", "language": "$language"},
                                pipeline:
                                        [
                                            {
                                                    $project:
                                                            {
                                                                    "contest_id": 1,
                                                                    "source_id": 1,
                                                                    "participant_id": 1
                                                            }
                                            },
                                            {
                                                    $addFields: {"language": "$$language"}
                                            },
                                            {
                                                    $match: {$expr: {$eq: ["$contest_id", "$$contest_id"]}}
                                            }
                                        ],
                            as: "test"
                        }
        },
        {
                $unwind: "$test"
        },
        {
                $project:
                        {
                                "test.participant_id": 1,
                                "test.source_id": 1,
                                "test.language": 1
                        }
        },
        {
                $lookup:
                        {
                                from: "kahanies",
                                let: {"user_id": "$test.participant_id", "kahani_id": "$test.source_id", "language": "$test.language"},
                                pipeline:
                                        [
                                            {
                                                    $project:
                                                            {
                                                                "_id": {"$toString": "$_id"},
                                                                "title": 1,
                                                                "views_count": 1,
                                                            }
                                            },
                                            {
                                                    $addFields: {"user_id": "$$user_id", "language": "$$language"}
                                            },
                                            {
                                                    $match: {$expr: {$eq: ["$_id", "$$kahani_id"]}}
                                            }
                                        ],
                            as: "test1"
                        }
        },
        {
                $unwind: "$test1"
        },
        {
                $project:
                        {
                                "_id": 0,
                                "test1.title": 1,
                                "test1.views_count": 1,
                                "test1.user_id": 1,
                                "test1.language": 1
                        }
        },
        {
                $lookup: 
                        {
                                from: "users",
                                let: {"title": "$test1.title", "views": "$test1.views_count", "user_id": "$test1.user_id", "language": "$test1.language"},
                                pipeline:
                                        [
                                            {
                                                    $project:
                                                            {
                                                                    "_id": {"$toString": "$_id"},
                                                                    "full_name": 1,
                                                                    "phone": 1,
                                                                    "email": 1
                                                            }
                                            },
                                            {
                                                    $addFields:
                                                            {
                                                                "title": "$$title",
                                                                "views": "$$views",
                                                                "language": "$$language"
                                                            }
                                            },
                                            {
                                                    $match: {$expr: {$eq: ["$_id", "$$user_id"]}}
                                            }
                                        ],
                            as: "users"
                        }
        },
        {
                $unwind: "$users"
        },
        {
                $project: 
                        {
                                "users.full_name": 1,
                                "users.email": 1,
                                "users.phone": 1,
                                "users.title": 1,
                                "users.views": 1,
                                "users.language": 1
                        }
        },
        {
                $group: {_id: "$users.full_name", total_views: {"$sum": "$users.views"}, entries: {"$sum": 1}, language: {"$push": {lang: "$users.language"}}}
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

module.exports = { contestDetails }