const ProductPricings = require('../models/productPricingsSchema');

const languageWisePaidSeries = (req, res, next) => {
    ProductPricings.aggregate([
        // {

        //     "$match": { "type": "kahanies" }
    
        // },
    
        // {
    
        //     "$lookup":
    
        //     {
    
        //         from: "kahanies",
    
        //         let: { "kahani_id": "$kahani_id" },
    
        //         pipeline:
    
        //         [
    
        //             {
    
        //                 $project:
    
        //                 {
    
        //                     "_id": { "$toString": "$_id" },
    
        //                     "language": 1,

        //                     "author_id": 1,

        //                     "title": 1,

        //                     "updated_at": 1
    
        //                 }
    
        //             },
    
        //             {
    
        //                 $match:
    
        //                 {
    
        //                     $expr:
    
        //                     {
    
        //                         $eq: ["$_id", "$$kahani_id"]
    
        //                     }
    
        //                 }
    
        //             }
    
                    
    
        //         ],
    
        //         as: "test"
    
        //     }
    
        // },
    
        // {
    
        //     "$group":
    
        //     {
    
        //         "_id": "$test.language",
    
        //         "count": {"$sum": 1}
    
        //     }
    
        // }
        {
            "$match": { "type": "kahanies" }
        },
        {
            "$lookup":
            {
                from: "kahanies",
                let: { "kahani_id": "$kahani_id" },
                pipeline:
                [
                    {
                        $project:
                        {
                            "_id": { "$toString": "$_id" },
                            "language": 1,
                            "author_id": 1,
                            "title": 1,
                            "updated_at": 1
                        }
                    },
                    {
                        $addFields: {"kahani_id": "$_id"}
                    },
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq: ["$_id", "$$kahani_id"]
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
                $project:
                         {
                                "_id": 0,
                                "test.author_id": 1,
                                "test.title": 1,
                                "test.language": 1,
                                "test.updated_at": 1,
                                "test.kahani_id": 1
                         }
        },
        {
                $lookup:
                        {
                                from: "users",
                                let: {"author_id": "$test.author_id"},
                                pipeline:
                                         [
                                            {
                                                    $project:
                                                             {
                                                                    "_id": { "$toString": "$_id" },
                                                                    "full_name": 1
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
                                as: "test1"
                        }
        },
        {
                $unwind: "$test1"
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

module.exports = {languageWisePaidSeries}