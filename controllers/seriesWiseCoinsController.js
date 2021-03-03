const Transactions = require('../models/transactionsSchema');

const seriesWiseCoins = (req, res, next) => {
    Transactions.aggregate([
        {
            $match: 
                   {
                        "transaction_type": "earn", 
                        "product_type": "series",
                        "created_at":
                                    {
                                        $lt: new Date(new Date().setHours(00,00,00)),
                                        $gte: new Date(new Date().setDate(new Date(new Date().setHours(00,00,00)).getDate() - 720))
                                    }
                   }
        },
        {
            $group: {_id: "$kahani_id", total_coins: {"$sum": "$coins"}, count: {"$sum": 1}} 
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

module.exports = {seriesWiseCoins};