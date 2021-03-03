const express = require('express');
const viewsByLang = require('../controllers/viewsByLanguageController');
const viewsByGenre = require('../controllers/viewsByGenreController');
const coinsByLang = require('../controllers/coinsByLangController');
const coinsByGenre = require('../controllers/coinsByGenreController');
const authorWiseViews = require('../controllers/authorWiseViewsController');
const authorWiseCoins = require('../controllers/authorWiseCoinsController');
const storyWiseViews = require('../controllers/storyWiseViewsController');
const seriesWiseViews = require('../controllers/seriesWiseViewsController');
const storyWiseCoins = require('../controllers/storyWiseCoinsController');
const seriesWiseCoins = require('../controllers/seriesWiseCoinsController');
const languageWisePaidSeries = require('../controllers/paidSeriesByLangController');
const subscribersDetails = require('../controllers/subscribersController');
const ashaMamSeries = require('../controllers/ashaMamSeriesController');
const contestDetails = require('../controllers/contestDetailsController');

/* ---------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------For User's Details--------------------------------------------- */
const teluguUsersDetails = require('../controllers/teluguUsersDetailsController');
const tamilUsersDetails = require('../controllers/tamilUsersDetailsController');
const bengaliUsersDetails = require('../controllers/bengaliUsersDetailsController');
const hindiUsersDetails = require('../controllers/hindiUsersDetailsController');
const marathiUsersDetails = require('../controllers/marathiUsersDetailsController');
const gujaratiUsersDetails = require('../controllers/gujaratiUsersDetailsController');
const malayalamUsersDetails = require('../controllers/malayalamUsersDetailsController');
const englishUsersDetails = require('../controllers/englishUsersDetailsController');
const punjabiUsersDetails = require('../controllers/punjabiUsersDetailsController');
const kannadaUsersDetails = require('../controllers/kannadaUsersDetailsController');
const oriyaUsersDetails = require('../controllers/oriyaUsersDetailsController');
/* ---------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------------------- */
/* -----------------------------------------------For Popularity--------------------------------------------- */
// const seriesSubscription = require('../controllers/popularityController');

const router = express.Router();

router.get('/totalviewsbylang', viewsByLang.totalViewsByLang);
router.get('/totalviewsbygenre', viewsByGenre.totalViewsByGenre);
router.get('/totalcoinsbylang', coinsByLang.totalCoinsByLang);
router.get('/totalcoinsbygenre', coinsByGenre.totalCoinsByGenre);
router.get('/authorwiseviews', authorWiseViews.authorWiseViews);
router.get('/authorwisecoins', authorWiseCoins.authorWiseCoins);
router.get('/storywiseviews', storyWiseViews.storyWiseViews);
router.get('/serieswiseviews', seriesWiseViews.seriesWiseViews);
router.get('/storywisecoins', storyWiseCoins.storyWiseCoins);
router.get('/serieswisecoins', seriesWiseCoins.seriesWiseCoins);

/* ------------------------------------------------------------------------------------------------------------ */
router.get('/languagewisepaidseries', languageWisePaidSeries.languageWisePaidSeries);
router.get('/teluguusersdetails', teluguUsersDetails.teluguUsersDetails);
router.get('/tamilusersdetails', tamilUsersDetails.tamilUsersDetails);
router.get('/bengaliusersdetails', bengaliUsersDetails.bengaliUsersDetails);
router.get('/hindiusersdetails', hindiUsersDetails.hindiUsersDetails);
router.get('/marathiusersdetails', marathiUsersDetails.marathiUsersDetails);
router.get('/gujaratiusersdetails', gujaratiUsersDetails.gujaratiUsersDetails);
router.get('/malayalamusersdetails', malayalamUsersDetails.malayalamUsersDetails);
router.get('/englishusersdetails', englishUsersDetails.englishUsersDetails);
router.get('/punjabiusersdetails', punjabiUsersDetails.punjabiUsersDetails);
router.get('/kannadausersdetails', kannadaUsersDetails.kannadaUsersDetails);
router.get('/oriyausersdetails', oriyaUsersDetails.oriyaUsersDetails);
/* ------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------ */

// router.get('/seriessubscriptions', seriesSubscription.seriesSubscription);
router.get('/author-subscribers', subscribersDetails.subscribersDetails);
router.get('/asha-mam', ashaMamSeries.ashaMamSeries);
router.get('/contest-details', contestDetails.contestDetails);

/* ------------------------------------------------------------------------------------------------------------ */

module.exports = router;