const Kahanies = require('../models/kahaniesSchema');

const authorWiseTotalViews = (req, res, next) => {
    let user_id = req.body.user_id;
    Kahanies.aggregate([
        {
            $group: {_id: `${user_id}`, total_views: {"$sum": "$views_count"}}
        },
        {
            $lookup: 
                    {
                        from: "users",
                        let: {user_id: "$_id", total_views: "$total_views"},
                        pipeline:
                                    [
                                    {
                                            $project:
                                                        {
                                                            "_id": {"$toString": "$_id"},
                                                            "full_name": 1,
                                                            "phone": 1,
                                                            "email": 1,
                                                            "user_name": 1,
                                                            "followings_count": 1,
                                                            "followers_count": 1,
                                                            "writing_count": 1
                                                        }
                                    },
                                    {
                                            $addFields: {"total_views": "$$total_views"}
                                    },
                                    {
                                            $match: {$expr: {$eq: ["$_id", "$$user_id"]}}
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
                        "_id": 0,
                        "authors.full_name": 1,
                        "authors.user_name": 1,
                        "authors.email": 1,
                        "authors.followings_count": 1,
                        "authors.followers_count": 1,
                        "authors.total_views": 1,
                        "authors.writing_count": 1
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

module.exports = { authorWiseTotalViews }