const Kahanies = require('../models/kahaniesSchema');

const storyWiseViews = (req, res, next) => {
    Kahanies.aggregate([
        {
            $match: 
                   {
                        "type": "story",
                        "created_at":
                                    {
                                        $lt: new Date(new Date().setHours(00,00,00)),
                                        $gte: new Date(new Date().setDate(new Date(new Date().setHours(00,00,00)).getDate() - 30))
                                    }
                   }
        },
        {
            $group: {_id: "$_id", totalViews: {"$sum": "$views_count"}}
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

module.exports = {storyWiseViews}