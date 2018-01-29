angular.module('MyApp')
  .controller('JobCtrl', function($scope, $routeParams, $location, $window, $auth, Job) {
    
    // Initializing
    $scope.jobs = [];
    $scope.detailPanel = false;
    $scope.editPanel = false;
    $scope.tab = 1;

    // Create new job
    $scope.createJob = function() {
        Job.createJob($scope.job)
            .then(function(response) {

                $scope.job = response.data

                $scope.messages = {
                    success: [response.data]
                };
                $location.path('/jobs');
            })
            .catch(function(response) {
                $scope.messages = {
                    error: Array.isArray(response.data) ? response.data : [response.data]
                };
            });
    };

     // Get all jobs
     Job.getJobs()  
     .then(function(response) {
        
        $scope.jobs = response.data;

         $scope.messages = {
             success: [response.data]
         };
        
     })
     .catch(function(response) {
         $scope.messages = {
             error: Array.isArray(response.data) ? response.data : [response.data]
         };
     });

     
     // Get single job
     $scope.getJobDetails = function(job) {
         $scope.selectedJob = job;
         $scope.detailPanel = true;
         console.log($scope.selectedJob);
     }


    // Edit single job
    $scope.editJob = function(id) {
        Job.editJob($scope.selectedJob.id, $scope.selectedJob)
            .then(function(response) {
                $scope.selectedJob = job;

                $scope.messages = {
                    success: [response.data]
                };

                $scope.editPanel = false;
            })
            .catch(function(response) {
                $scope.messages = {
                    error: Array.isArray(response.data) ? response.data : [response.data]
                }
            });
    }

     
     // Delete single job
     $scope.deleteJob = function(id) {
        Job.deleteJob($scope.selectedJob.id)
            .then(function(response) {
                $scope.jobs
                $scope.messages = {
                    success: [response.data]
                };
                $scope.detailPanel = false;

                // Get remanding jobs after deletion
                Job.getJobs()  
                .then(function(response) {
                   
                   $scope.jobs = response.data;
           
                    $scope.messages = {
                        success: [response.data]
                    };
                   
                })
                .catch(function(response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });

            })
            .catch(function(response) {
                error: Array.isArray(response.data) ? response.data : [response.data]
            });
     }

     // Close the details panel
     $scope.closeDetailsPanel = function() {
         $scope.detailPanel = false;
     }

     // Open/Close the edit panel
     $scope.openEditPanel = function() {
         $scope.editPanel = true;
     }

     // Convert UTC to Local datetime
     $scope.convertDateToLocal = function() {

     }

});
