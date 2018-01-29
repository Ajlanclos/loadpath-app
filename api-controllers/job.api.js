var mongoose = require('mongoose');
var Job = require('../models/job.model');


/**
 * POST JOB /api/v1/job/create
 * Create a new match and store in MongoDB
 */
exports.postJob = function(req, res, next) {

    let id = req.body.id;

    Job.findById({_id: id}, function(err, job) {

        if(job) {
            return res.status(400).send("Err: Job already created, please try again.");
        }

        job = new Job({
            company: req.body.company,
            start_location: req.body.start_location,
            end_location: req.body.end_location,
            // distance: req.body.distance,
            pickup_date: req.body.pickup_date,
            pickup_time: req.body.pickup_time,
            delivery_date: req.body.delivery_date,
            delivery_time: req.body.delivery_time,
            payment_amt: req.body.payment_amt,
            weight: req.body.weight,
            length: req.body.length,
            equipment_type: req.body.equipment_type,
            hazmat: req.body.hazmat,
            driver_assigned: req.body.driver_assigned,
            reporter: req.body.reporter,
            status: req.body.status
        });

        job.save(function(err) {
            if(err) {
                console.log("Err: ", err);
            }
            
            res.send({job:job});
            console.log("Success for " + job._id);
        })

    })
            
}


/**
 * GET JOBS /api/v1/jobs
 * Get a list of jobs
*/
exports.getJobs = function(req, res, next) {

    Job.find({}, function(err, jobs) {
            if(err) {
                console.log('Err: ', err);
            }

            res.send({jobs});
        })
}

/**
 * GET JOB /api/v1/job/:job_id/details
 * Get a single job
*/
exports.getJobDetails = function(req, res, next) {
    
    let id = req.params.job_id;

    Job.findById({_id:id}, function(err, job) {
        if(err) {
            console.log('Err: ', err);
        }

        res.send({job:job});
    })
}

/**
 * PUT JOB /api/v1/job/:job_id/edit
 * Edit a single job
 */
exports.editJob = function(req, res, next) {

    let id = req.params.job_id;

    let job = {
        company: req.body.company,
        start_location: req.body.start_location,
        end_location: req.body.end_location,
        // distance: req.body.distance,
        pickup_date: req.body.pickup_date,
        pickup_time: req.body.pickup_time,
        delivery_date: req.body.delivery_date,
        delivery_time: req.body.delivery_time,
        payment_amt: req.body.payment_amt,
        weight: req.body.weight,
        length: req.body.length,
        equipment_type: req.body.equipment_type,
        hazmat: req.body.hazmat,
        driver_assigned: req.body.driver_assigned,
        reporter: req.body.reporter,
        status: req.body.status
    }

    Job.findByIdAndUpdate(id, job, function(err, job) {
    
            if(err) {
                console.log('Err: ', err);
            }

            res.send({job});
    });
}

/**
* DELETE JOB /api/v1/job/:job_id/delete
* Delete a single job
*/
exports.deleteJob = function(req, res, next) {

    let id = req.params.job_id;

    Job.findByIdAndRemove(id, function(err, match) {
        if(err) {
            console.log('Err: ', err);
        }

         res.send('Job removed...');
    });
}