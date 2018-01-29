var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  };

  var jobSchema = new mongoose.Schema({
    company: String,
    start_location: String,
    end_location: String,
    pickup_date: String,
    pickup_time: String,
    delivery_date: String,
    delivery_time: String,
    payment_amt: Number,
    weight: Number,
    distance: Number,
    equipment_type: String,
    length: String,
    hazmat: String,
    driver_assigned: String,
    reporter: String,
    status: String
  }, schemaOptions);

  jobSchema.pre('save', function(next) {
      next();
  });

  var Job = mongoose.model('Job', jobSchema);

  module.exports = Job;