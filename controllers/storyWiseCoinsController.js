const Transactions = require('../models/transactionsSchema');

const storyWiseCoins = (req, res, next) => {
    Transactions.aggregate([
        {
            $match: 
                   {
                        "transaction_type": "earn", 
                        "product_type": "story",
                        "created_at":
                                    {
                                        $lt: new Date(new Date().setHours(00,00,00)),
                                        $gte: new Date(new Date().setDate(new Date(new Date().setHours(00,00,00)).getDate() - 90))
                                    }
                   }
        },
        {
            $group: {_id: "$story_id", total_coins: {"$sum": "$coins"}, count: {"$sum": 1}} 
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

module.exports = {storyWiseCoins};