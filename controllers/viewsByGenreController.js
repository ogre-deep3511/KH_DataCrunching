const Kahanies = require('../models/kahaniesSchema'); 

const totalViewsByGenre = (req, res, next) => {
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
        {$group: {_id: "$genre", TotalViews: {$sum: "$views_count"}}}
    ], (err, data) => {
        if(err) {
            // console.log(err);
            res.json({
                error: err
            })
        }else {
            // console.log(data);
            res.json({
                message: data
            })
        }
    })
}

module.exports = {totalViewsByGenre};