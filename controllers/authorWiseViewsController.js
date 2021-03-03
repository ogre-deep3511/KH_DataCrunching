const Kahanies = require('../models/kahaniesSchema');

const authorWiseViews = (req, res, next) => {
    Kahanies.aggregate([
        {
            $match:
                    {
                        "created_at":
                                    {
                                        $lt: new Date(new Date().setHours(00,00,00)),
                                        $gte: new Date(new Date().setDate(new Date(new Date().setHours(00,00,00)).getDate() - 90))
                                    }
                    }
        },
        {$group: {_id: "$author_id", TotalViews: {$sum: "$views_count"}}}
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

module.exports = {authorWiseViews};