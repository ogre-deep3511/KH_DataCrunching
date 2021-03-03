const Transactions = require('../models/transactionsSchema');

const authorWiseCoins = (req, res, next) => {
    Transactions.aggregate([
        {
            $match: 
                   {
                        "transaction_type": "earn",
                        "created_at":
                                    {
                                        $lt: new Date(new Date().setHours(00,00,00)),
                                        $gte: new Date(new Date().setDate(new Date(new Date().setHours(00,00,00)).getDate() - 90))
                                    }
                   }
        },
        {
                $group: {_id: "$user_id", TotalCoins: {"$sum": "$coins"}, count: {"$sum": 1}}
        },
        {
                $lookup: 
                        {
                                from: "kahanies",
                                localField: "_id",
                                foreignField: "author_id",
                                as: "test"
                        }
        },
        {
                $unwind: "$test"
        },
        {
                $group: {_id: "$test.author_id", totalCoins: {"$sum": "$TotalCoins"}, count: {"$sum": 1}}
        }
    ], (err, data) => {
        if(err) {
            // console.log(err);
            res.json({
                error: err
            })
        }else {
            
            for(let i = 0; i < data.length; i++) {
                data[i].earnedCoins = data[i].totalCoins / data[i].count;
                delete data[i].totalCoins;
                delete data[i].count;
            }

            res.json({
                data: data
            })
        }
    })
}

module.exports = {authorWiseCoins};