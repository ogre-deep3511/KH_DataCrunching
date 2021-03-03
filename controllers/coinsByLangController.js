const Transactions = require('../models/transactionsSchema');

const totalCoinsByLang = (req, res, next) => {
    Transactions.aggregate([
        // {
        //     $match: {"transaction_type": "earn"}
        // },
        // {
        //         $group: {_id: "$kahani_id", totalCoins: {"$sum": "$coins"}}
        // },
        // {
        //         $lookup: 
        //                 {
        //                         from: "kahanies",
        //                         localField: "_id",
        //                         foreignField: "_id.str",
        //                         as: "test"
        //                 }
        // },
        // {
        //         $unwind: "$test"
        // },
        // {
        //         $group: {_id: "$test.language", totalCoins: {"$sum": "$totalCoins"}, count: {"$sum": 1}}
        // }
        {
            $match: 
                   {
                        "transaction_type": "earn", 
                        "product_type": "kahanies",
                        "created_at": 
                                    {
                                            $lt: new Date(new Date().setHours(00,00,00)),

                                            $gte: new Date(new Date().setDate(new Date(new Date().setHours(00,00,00)).getDate() - 730))
                                    }
                   }
        },
        {
                $group: {_id: "$kahani_id", coins_sum: {"$sum": "$coins"}}
        },
        {
                $lookup: 
                        {
                                from: "kahanies",
                                let: {"kahani_id": "$_id", "coins_sum": "$coins_sum"},
                                pipeline:
                                        [
                                            {
                                                    $project: 
                                                            {
                                                                    "_id": {"$toString": "$_id"},
                                                                    "language": 1
                                                            }
                                            },
                                            {
                                                    $addFields: 
                                                            {
                                                                    "total_coins": "$$coins_sum"
                                                            }
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
            $group: {_id: "$test.language", total_coins: {"$sum": "$test.total_coins"}} 
        }
    ], (err, data) => {
        if(err) {
            // console.log(err);
            res.json({
                error: err
            })
        }else {
            
            // for(let i = 0; i < data.length; i++) {
            //     data[i].earnedCoins = data[i].totalCoins / data[i].count;
            //     delete data[i].totalCoins;
            //     delete data[i].count;
            // }

            res.json({
                data: data
            })
        }
    })
}

module.exports = {totalCoinsByLang};

