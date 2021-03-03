const mongoose = require('mongoose');

const contestSubmissionSchema = new mongoose.Schema({
    "source_type": String,
    "source_id": String,
    "participant_id": String,
    "contest_id": String,
    "status": String
})

const contestSubmission = mongoose.model('contest-submissions', contestSubmissionSchema);

module.exports = contestSubmission;