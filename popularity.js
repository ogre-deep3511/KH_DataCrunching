require('dotenv').config();

const {seriesSubscription, storyViews, storyReads, seriesPurchases, storyPurchases, ratings} = require('./controllers/popularityController');

const mongoose = require('mongoose');

// Database Connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Database Connected Successfully!!!");
});

global.popularity = [];

async function driver() {
    try {
        const result = await seriesSubscription();
        const result1 = await storyViews();
        const result2 = await storyReads();
        const result3 = await seriesPurchases();
        const result4 = await storyPurchases();
        const result5 = await ratings();
        
        let popularSchema = mongoose.Schema(
            {
                "kahani_id": String
            },
            {timestamps: true}
        );

        let popular = mongoose.model('populars', popularSchema);

        popular.insertMany(result5).then(() => {
            console.log("Data inserted!!!!");
        }).catch((err) => {
            console.log(err);
        })
    }catch(error) {
        console.log(error);
    }
}

driver();