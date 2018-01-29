angular.module('MyApp')
    .factory('Job', function($http) {
        return {
            // Create new job
            createJob: function(data) {
                return $http.post('api/v1/job/create', data);
            },
            // Get all jobs
            getJobs: function(data) {
                return $http.get('api/v1/jobs', data);
            },
            // Get single job
            getJob: function(id) {
                return $http.get('api/v1/job/' + id + '/details');
            },
            // Edit single job
            editJob: function(id, data) {
                return $http.put('api/v1/job/' + id + '/edit', data);
            },
            // Delete single job
            deleteJob: function(id) {
                return $http.delete('api/v1/job/' + id + '/delete');
            }
        };
    });