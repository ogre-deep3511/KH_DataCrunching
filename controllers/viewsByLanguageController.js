const Kahanies = require('../models/kahaniesSchema'); 

const totalViewsByLang = (req, res, next) => {
    Kahanies.aggregate([
        // {
        //     $project: 
        //                {
        //                    "type": 1,
        //                    "genre": 1,
        //                    "language": 1,
        //                    "created_at": 1,
        //                    "views_count": 1,
        //                    "created_year": {$year: "$created_at"},
        //                    "minutes": {$add: [{$multiply: [{$hour: "$created_at"}, 60]}, {$minute: "$created_at"}]}
        //                }
        // },
        // {
        //         $match:
        //                 {
        //                         "minutes": {$gte: 12 * 60, $lt: 16 * 60},
        //                         "created_year": {$gte: 2021} 
        //                 }
        // },
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
        {
                $group: {_id: "$language", TotalViews: {$sum: "$views_count"}}
        }
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

module.exports = {totalViewsByLang};