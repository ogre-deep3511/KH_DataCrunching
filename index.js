require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');

const TotalViewsByLang = require('./routes/route');
const TotalViewsByGenre = require('./routes/route');
const TotalCoinsByLang = require('./routes/route');
const TotalCoinsByGenre = require('./routes/route');
const AuthorWiseViews = require('./routes/route');
const AuthorWiseCoins = require('./routes/route');
const StoryWiseViews = require('./routes/route');
const SeriesWiseViews = require('./routes/route');
const StoryWiseCoins = require('./routes/route');
const SeriesWiseCoins = require('./routes/route');
const PaidSeriesDetails = require('./routes/route')

const TeluguUsersDetails = require('./routes/route');
const TamilUsersDetails = require('./routes/route');
const BengaliUsersDetails = require('./routes/route');
const HindiUsersDetails = require('./routes/route');
const MarathiUsersDetails = require('./routes/route');
const GujaratiUsersDetails = require('./routes/route');
const MalayalamUsersDetails = require('./routes/route');
const EnglishUsersDetails = require('./routes/route');
const PunjabiUsersDetails = require('./routes/route');
const KannadaUsersDetails = require('./routes/route');
const OriyaUsersDetails = require('./routes/route');

const SeriesSubscription = require('./routes/route');

const SubscriberDetails = require('./routes/route');

const Asha = require('./routes/route');

const contestDetails = require('./routes/route');

const AuthorWiseTotalViews = require('./routes/route');

// Setting environment variable
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Database Connected Successfully!!!");
});

app.use('/api', TotalViewsByLang);
app.use('/api', TotalViewsByGenre);
app.use('/api', TotalCoinsByLang);
app.use('/api', TotalCoinsByGenre);
app.use('/api', AuthorWiseViews);
app.use('/api', AuthorWiseCoins);
app.use('/api', StoryWiseViews);
app.use('/api', SeriesWiseViews);
app.use('/api', StoryWiseCoins);
app.use('/api', SeriesWiseCoins);
app.use('/api', PaidSeriesDetails);

app.use('/api', TeluguUsersDetails);
app.use('/api', TamilUsersDetails);
app.use('/api', BengaliUsersDetails);
app.use('/api', HindiUsersDetails);
app.use('/api', MarathiUsersDetails);
app.use('/api', GujaratiUsersDetails);
app.use('/api', MalayalamUsersDetails);
app.use('/api', EnglishUsersDetails);
app.use('/api', PunjabiUsersDetails);
app.use('/api', KannadaUsersDetails);
app.use('/api', OriyaUsersDetails);

app.use('/api', SeriesSubscription);
app.use('/api', SubscriberDetails);
app.use('/api', Asha);
app.use('/api', contestDetails);
app.use('/api', AuthorWiseTotalViews);

app.listen(port, () => {
    console.log("Server started on port: " + port + "!!!");
})
