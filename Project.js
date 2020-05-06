const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  project: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    default: new Date()
  },

  endDate: {
      type: Date,
      default: new Date()
  },

  taskName: {
      type: String,
      default: ''
  }
});
module.exports = mongoose.model('Projects', ProjectSchema);