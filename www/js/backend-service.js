angular.module('app.services')

.service('backend', function(mockBackend, httpBackend){
    // This service adds all the methods from
    // the mock backend and the real http backend.
    // Any methods defined in the real http backend will get called
    // instead of the mock version.
    // Any methods not defined in the real http backend will use the
    // mock backend as a fallback instead.

    // The http backend service is not integrated yet
    // so setting this to false until we're ready to try using it.
    var isUsingHttpBackend = true;

    // Add all methods from the mock backend to the backend service
    // for (k in mockBackend) {
    //     this[k] = mockBackend[k];
    // }

    // Add all methods from the real http backend to the backend service
    if (isUsingHttpBackend) {
        for (k in httpBackend) {
            this[k] = httpBackend[k];
        }
    }
});
