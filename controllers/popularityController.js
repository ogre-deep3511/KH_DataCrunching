const KahaniSubcribers = require('../models/kahaniSubscribersSchema');
const StoryViews = require('../models/storyViewsSchema');
const StoryReads = require('../models/storyReadsSchema');
const Transactions = require('../models/transactionsSchema');
const Ratings = require('../models/ratingsSchema');

const seriesSubscription = () => {
    return new Promise((resolve, reject) => {
        KahaniSubcribers.aggregate([
            {
                $group: {_id: "$kahani_id", subscriptions: {"$sum": 1}}
            },
            {
                $addFields: {"kahani_id": "$_id"}
            },
            {
                $project: {"_id": 0, "kahani_id": 1, "subscriptions": 1}
            },
            {
                $sort: {subscriptions: -1}
            }
        ], (err, data) => {
            if(err) {
                reject(err);
            }else {
                for(let i = 0; i < 10; i++) {
                    // if(data[i].subscriptions >= 100) {
                        popularity.push(data[i]);
                    // }
                }
                resolve(popularity)
            }
        })
    })
}

const storyViews = () => {
    return new Promise((resolve, reject) => {
        StoryViews.aggregate([
                {
                    $group: {_id: "$story_id", views: {"$sum": 1}}
                },
                {
                        $addFields: {"story_id": "$_id"}
                },
                {
                        $project: {"_id": 0, "story_id": 1, "views": 1}
                },
                {
                        $sort: {views: -1}
                },
                {
                    $lookup:
                            {
                                from: "stories",
                                let: {"story_id": "$story_id", "views": "$views"},
                                pipeline:
                                         [
                                             {
                                                 $project: {"_id": {"$toString": "$_id"}, "kahani_id": 1}
                                             },
                                             {
                                                 $addFields: {"views": "$$views"}
                                             },
                                             {
                                                 $match: {$expr: {$eq: ["$_id", "$$story_id"]}}
                                             }
                                         ],
                                as: "test"
                            }
                },
                {
                    $unwind: "$test"
                },
                {
                    $project: {"test.kahani_id": 1, "test.views": 1}
                }
            ], (err, data) => {
                if(err) {
                    reject(err);
                }else {
                    for(let i = 0; i < 10; i++) {
                        // if(data[i].test.views >= 10) {
                            popularity.push(data[i].test);
                        // }
                    }
                    resolve(popularity);
                }
            })
    })
}

const storyReads = () => {
    return new Promise((resolve, reject) => {
        StoryReads.aggregate([
            {
                $group: {_id: "$story_id", reads: {"$sum": 1}}
            },
            {
                    $addFields: {"story_id": "$_id"}
            },
            {
                    $project: {"_id": 0, "story_id": 1, "reads": 1}
            },
            {
                    $sort: {reads: -1}
            },
            {
                $lookup:
                        {
                            from: "stories",
                            let: {"story_id": "$story_id", "reads": "$reads"},
                            pipeline:
                                     [
                                         {
                                             $project: {"_id": {"$toString": "$_id"}, "kahani_id": 1}
                                         },
                                         {
                                             $addFields: {"reads": "$$reads"}
                                         },
                                         {
                                             $match: {$expr: {$eq: ["$_id", "$$story_id"]}}
                                         }
                                     ],
                            as: "test"
                        }
            },
            {
                $unwind: "$test"
            },
            {
                $project: {"test.kahani_id": 1, "test.reads": 1}
            }
            ], (err, data) => {
                if(err) {
                    reject(err);
                }else {
                    for(let i = 0; i < 10; i++) {
                        // if(data[i].test.reads >= 10) {
                            popularity.push(data[i].test);
                        // }
                    }
                    resolve(popularity);
                }
            })
    })
}

const seriesPurchases = () => {
    return new Promise((resolve, reject) => {
        Transactions.aggregate([
                {
                    $project: {"kahani_id": 1, "story_id": 1, "transaction_type": 1, "coins": 1, "product_type": 1}
                },
                {
                        $match: {"transaction_type": "earn", "product_type": "kahanies"}
                },
                {
                        $group: {_id: "$kahani_id", purchases: {"$sum": 1}}
                },
                {
                        $addFields: {"kahani_id": "$_id"}
                },
                {
                        $project: {"_id": 0, "kahani_id": 1, "purchases": 1}
                },
                {
                        $sort: {"purchases": -1}
                }
            ], (err, data) => {
                if(err) {
                    reject(err);
                }else {
                    for(let i = 0; i < 10; i++) {
                        // if(data[i].purchases >= 3) {
                            popularity.push(data[i]);
                        // }
                    }
                    resolve(popularity);
                }
            })
    })
}

const storyPurchases = () => {
    return new Promise((resolve, reject) => {
        Transactions.aggregate([
                {
                    $project: {"kahani_id": 1, "story_id": 1, "transaction_type": 1, "coins": 1, "product_type": 1}
                },
                {
                        $match: {"transaction_type": "earn", "product_type": "story"}
                },
                {
                        $group: {_id: "$story_id", purchases: {"$sum": 1}}
                },
                {
                        $addFields: {"story_id": "$_id"}
                },
                {
                        $project: {"_id": 0, "story_id": 1, "purchases": 1}
                },
                {
                        $sort: {"purchases": -1}
                },
                {
                        $lookup:
                                {
                                        from: "stories",
                                        let: {"story_id": "$story_id", "purchases": "$purchases"},
                                        pipeline:
                                                [
                                                    {
                                                            $project: {"_id": {"$toString": "$_id"}, "kahani_id": 1}
                                                    },
                                                    {
                                                            $addFields: {"purchases": "$$purchases"}
                                                    },
                                                    {
                                                            $match:
                                                                {
                                                                        $expr: {$eq: ["$_id", "$$story_id"]}
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
                        $project:
                                {
                                        "test.kahani_id": 1,
                                        "test.purchases": 1
                                }
                }
            ], (err, data) => {
                if(err) {
                    reject(err);
                }else {
                    for(let i = 0; i < 10; i++) {
                        // if(data[i].test.purchases >= 300) {
                            popularity.push(data[i].test);
                        // }
                    }
                    resolve(popularity);
                }
            })
    })
}

const ratings = () => {
    return new Promise((resolve, reject) => {
        // console.log("Started")
        Ratings.aggregate([
                {
                    $project: {"story_id": 1, "rating": 1}
                },
                {
                        $group: {_id: "$story_id", total_rating: {"$sum": "$rating"}}
                },
                {
                        $sort: {"total_rating": -1}
                },
                {
                        $lookup:
                                {
                                        from: "stories",
                                        let: {"story_id": "$_id", "total_rating": "$total_rating"},
                                        pipeline:
                                                [
                                                    {
                                                            $project: {"_id": {"$toString": "$_id"}, "kahani_id": 1}
                                                    },
                                                    {
                                                            $addFields: {"total_rating": "$$total_rating"}
                                                    },
                                                    {
                                                            $match: {$expr: {$eq: ["$_id", "$$story_id"]}}
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
                                    "_id": 0,
                                    "test.kahani_id": 1,
                                    "test.total_rating": 1
                                }
                }
        ], (err, data) => {
            if(err) {
                reject(err);
            }else {
                for(let i = 0; i < 10; i++) {
                    // if(data[i].test.total_rating >= 100) {
                        popularity.push(data[i].test);
                    // }
                }
                resolve(popularity);
            }
        })
    })
}

module.exports = {seriesSubscription, storyViews, storyReads, seriesPurchases, storyPurchases, ratings}