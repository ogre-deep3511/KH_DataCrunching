const Subscribers = require("../models/kahaniSubscribersSchema")

const subscribersDetails = (req, res, next) => {
    Subscribers.aggregate([
        {
            $group: {_id: "$kahani_id", count: {"$sum": 1}}
        },
        {
                $lookup:
                        {
                                from: "kahanies",
                                let: {"kahani_id": "$_id", "subscribers": "$count"},
                                pipeline:
                                        [
                                            {
                                                    $project:
                                                            {
                                                                "_id": {"$toString": "$_id"},
                                                                "author_id": 1
                                                            }
                                            },
                                            {
                                                    $addFields: {"subscribers": "$$subscribers"}
                                            },
                                            {
                                                    $match: {$expr: {$eq: ["$_id", "$$kahani_id"]}}
                                            }
                                        ],
                                as: "authors"
                        }
        },
        {
                $unwind: "$authors"
        },
        {
                $project:
                        {
                                "authors.author_id": 1,
                                "authors.subscribers": 1,
                                "_id": 0
                        }
        },
        {
            $group: {_id: "$authors.author_id", subscribers: {"$sum": "$authors.subscribers"}}
        },
        {
                $lookup:
                        {
                                from: "users",
                                let: {"author_id": "$_id", "subscribers": "$subscribers"},
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
                                                    $addFields: {"subscribers": "$$subscribers"}
                                            },
                                            {
                                                    $match: {$expr: {$eq: ["$_id", "$$author_id"]}}
                                            }
                                        ],
                            as: "subscribers"
                        }
        },
        {
                $unwind: "$subscribers"
        },
        {
                $project:
                        {
                                "subscribers.full_name": 1,
                                "subscribers.phone": 1,
                                "subscribers.email": 1,
                                "subscribers.subscribers": 1
                        }
        },
        {
                $sort: {"subscribers.subscribers": -1}
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

module.exports = { subscribersDetails }