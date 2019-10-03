angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('chefsNearyby', {
    url: '/chefs-nearby',
        templateUrl: 'templates/chefsNearyby.html',
        controller: 'chefsNearybyCtrl',
        params:{'sessionId':null}
  })


  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.ordersAndStatus'
      2) Using $state.go programatically:
        $state.go('tabsController.ordersAndStatus');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page3
      /page1/tab3/page3
      /page1/tab2/page3
  */
  .state('details', {
    url: '/details/:itemId/:sessionID',
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl'
  })

  .state('requestANewMeal', {
    url: '/request-meal',
    views: {
      'requestMealTab': {
        templateUrl: 'templates/requestANewMeal.html',
        controller: 'requestANewMealCtrl'
      }
    }
  })

  // .state('tabsController', {
  //   url: '',
  //   templateUrl: 'templates/tabsController.html',
  //   abstract:true
  // })

  .state('mapsExample', {
    url: '/maps-example',
    templateUrl: 'templates/mapsExample.html',
    controller: 'mapsExampleCtrl'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('orderMeal', {
    url: '/order-meal/{mealId}',
    views: {
      'chefsNearbyTab': {
        templateUrl: 'templates/orderMeal.html',
        controller: 'orderMealCtrl'
      }
    }
  })

  .state('orderMeal.editPickingUpTime', {
    url: '/order-meal/{mealId}/picking-up-time',
    views: {
      'chefsNearbyTab@editPickingUpTime': {
        templateUrl: 'templates/editPickingUpTime.html',
        controller: 'orderMealCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })



    .state('usersNearby', {
      url: '/customers-nearby',
      views: {
        'customersNearbyTab': {
          templateUrl: 'templates/usersNearby.html',
          controller: 'usersNearbyCtrl'
        }
      }
    })

    .state('usersNearby2', {
      url: '/customers-nearby-map',
      views: {
        'customersNearbyTab': {
          templateUrl: 'templates/usersNearby2.html',
          controller: 'usersNearby2Ctrl'
        }
      }
    })

    // .state('usersNearby2', {
    //   url: '/page7',
    //   templateUrl: 'templates/usersNearby2.html',
    //   controller: 'usersNearby2Ctrl'
    // })

    /*
      The IonicUIRouter.js UI-Router Modification is being used for this route.
      To navigate to this route, do NOT use a URL. Instead use one of the following:
        1) Using the ui-sref HTML attribute:
          ui-sref='tabsController.orderCart'
        2) Using $state.go programatically:
          $state.go('tabsController.orderCart');
      This allows your app to figure out which Tab to open this page in on the fly.
      If you're setting a Tabs default page or modifying the .otherwise for your app and
      must use a URL, use one of the following:
        /page1/tab1/page3
        /page1/tab3/page3
        /page1/tab2/page3
    */
    .state('orderCart', {
      url: '/order-cart',
      views: {
        'chefOrdersTab': {
          templateUrl: 'templates/orderCart.html',
          controller: 'orderCartCtrl'
        }
      }
    })

    .state('createYourMeal', {
      url: '/create-your-meal',
      views: {
        'createMealTab': {
          templateUrl: 'templates/createYourMeal.html',
          controller: 'createYourMealCtrl'
        }
      }
    })

$urlRouterProvider.otherwise('/login')

});
